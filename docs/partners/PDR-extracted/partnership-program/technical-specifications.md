# SISO Progressive Partner Portal - Technical Specifications

**Date:** January 16, 2025  
**Purpose:** Detailed technical requirements for progressive partner portal  
**Scope:** Partnership program gamification and tier system

---

## 🏗️ **Architecture Overview**

### **System Design Philosophy**
- **Progressive Enhancement:** Build on existing 70% complete foundation
- **Modular Components:** Tier-based feature unlocking
- **Real-time Updates:** Immediate tier progression feedback
- **Mobile-first:** Responsive gamification across devices

### **Technology Stack**
```typescript
Frontend: React 18 + TypeScript + Tailwind CSS
Backend: Supabase (PostgreSQL + Real-time + Auth)
State Management: React Query + Zustand
Animations: Framer Motion + Lottie
Components: Existing SISO component library
Testing: Jest + React Testing Library + Playwright
```

---

## 🗄️ **Database Schema Design**

### **Core Tables**

#### **1. Partner Tiers Management**
```sql
CREATE TABLE partner_tiers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partner_profiles(id) ON DELETE CASCADE,
  current_tier tier_enum NOT NULL DEFAULT 'starter',
  deals_completed INTEGER DEFAULT 0,
  deals_in_progress INTEGER DEFAULT 0,
  total_revenue DECIMAL(12,2) DEFAULT 0,
  tier_qualified_at TIMESTAMP WITH TIME ZONE,
  tier_expires_at TIMESTAMP WITH TIME ZONE,
  next_tier_progress INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TYPE tier_enum AS ENUM ('starter', 'active', 'performer', 'elite');

-- Indexes for performance
CREATE INDEX idx_partner_tiers_partner_id ON partner_tiers(partner_id);
CREATE INDEX idx_partner_tiers_current_tier ON partner_tiers(current_tier);
CREATE INDEX idx_partner_tiers_deals_completed ON partner_tiers(deals_completed);
```

#### **2. Tier Requirements & Benefits**
```sql
CREATE TABLE tier_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tier_name tier_enum NOT NULL UNIQUE,
  min_deals_required INTEGER NOT NULL,
  max_deals_limit INTEGER,
  commission_rate DECIMAL(4,2) NOT NULL,
  team_override_rate DECIMAL(4,2) DEFAULT 0,
  benefits JSONB NOT NULL,
  requirements JSONB NOT NULL,
  unlock_features TEXT[] DEFAULT '{}',
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample tier definitions
INSERT INTO tier_definitions (tier_name, min_deals_required, max_deals_limit, commission_rate, benefits, requirements, unlock_features) VALUES
('starter', 0, 2, 20.00, 
  '{"description": "Welcome to SISO Partners", "support": "Standard support", "materials": "Basic marketing kit"}',
  '{"deals_needed": 0, "training_required": false}',
  '{"basic_training", "commission_tracking", "referral_links"}'
),
('active', 3, 9, 22.00,
  '{"description": "Active Partner Benefits", "support": "Priority email support", "materials": "Advanced marketing materials"}',
  '{"deals_needed": 3, "training_required": true}',
  '{"advanced_materials", "lead_management", "priority_support", "referral_bonuses"}'
);
```

#### **3. Achievement System**
```sql
CREATE TABLE achievement_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  achievement_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  points INTEGER DEFAULT 0,
  tier_required tier_enum DEFAULT 'starter',
  criteria JSONB NOT NULL,
  reward_type TEXT DEFAULT 'badge',
  reward_value JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE partner_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partner_profiles(id) ON DELETE CASCADE,
  achievement_key TEXT REFERENCES achievement_definitions(achievement_key),
  achieved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_data JSONB,
  notified BOOLEAN DEFAULT false,
  UNIQUE(partner_id, achievement_key)
);

-- Indexes
CREATE INDEX idx_partner_achievements_partner_id ON partner_achievements(partner_id);
CREATE INDEX idx_partner_achievements_achieved_at ON partner_achievements(achieved_at);
```

#### **4. Progress Tracking**
```sql
CREATE TABLE tier_progress_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partner_profiles(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'deal_completed', 'tier_advanced', 'achievement_unlocked'
  event_data JSONB NOT NULL,
  previous_tier tier_enum,
  new_tier tier_enum,
  deals_before INTEGER,
  deals_after INTEGER,
  commission_earned DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_tier_progress_partner_id ON tier_progress_events(partner_id);
CREATE INDEX idx_tier_progress_event_type ON tier_progress_events(event_type);
CREATE INDEX idx_tier_progress_created_at ON tier_progress_events(created_at);
```

#### **5. Feature Access Control**
```sql
CREATE TABLE feature_access (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES partner_profiles(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  access_granted BOOLEAN DEFAULT false,
  granted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  granted_by_tier tier_enum,
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(partner_id, feature_key)
);

CREATE INDEX idx_feature_access_partner_id ON feature_access(partner_id);
CREATE INDEX idx_feature_access_feature_key ON feature_access(feature_key);
```

---

## 🔧 **Core Components Architecture**

### **Tier Management System**

#### **TierProvider.tsx**
```typescript
interface TierContextType {
  currentTier: TierEnum;
  progress: TierProgress;
  benefits: TierBenefits;
  nextTierRequirements: TierRequirements;
  canAccessFeature: (feature: string) => boolean;
  advanceToNextTier: () => Promise<void>;
  calculateProgress: () => TierProgress;
}

export const TierProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tierData, setTierData] = useState<TierData | null>(null);
  const { partner } = usePartner();

  // Real-time tier updates
  useEffect(() => {
    const subscription = supabase
      .channel('tier_updates')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'partner_tiers',
        filter: `partner_id=eq.${partner?.id}`
      }, handleTierUpdate)
      .subscribe();

    return () => subscription.unsubscribe();
  }, [partner?.id]);

  return (
    <TierContext.Provider value={contextValue}>
      {children}
    </TierContext.Provider>
  );
};
```

#### **usePartnerTier.ts**
```typescript
export const usePartnerTier = () => {
  const { data: tierData, isLoading } = useQuery({
    queryKey: ['partner-tier', partnerId],
    queryFn: async () => {
      const { data } = await supabase
        .from('partner_tiers')
        .select(`
          *,
          tier_definitions(*)
        `)
        .eq('partner_id', partnerId)
        .single();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const advanceToNextTier = useMutation({
    mutationFn: async () => {
      // Check if partner qualifies for next tier
      const nextTier = calculateNextTier(tierData);
      if (nextTier) {
        await supabase
          .from('partner_tiers')
          .update({ 
            current_tier: nextTier,
            tier_qualified_at: new Date().toISOString()
          })
          .eq('partner_id', partnerId);
        
        // Trigger achievement and notifications
        await triggerTierAdvancement(partnerId, nextTier);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['partner-tier']);
      showTierAdvancementCelebration();
    }
  });

  return {
    currentTier: tierData?.current_tier,
    progress: calculateProgress(tierData),
    benefits: tierData?.tier_definitions?.benefits,
    advanceToNextTier: advanceToNextTier.mutate,
    isAdvancing: advanceToNextTier.isPending
  };
};
```

### **Gamification Components**

#### **ProgressTracker.tsx**
```typescript
interface ProgressTrackerProps {
  currentProgress: number;
  targetValue: number;
  label: string;
  showMilestones?: boolean;
  animateOnChange?: boolean;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentProgress,
  targetValue,
  label,
  showMilestones = true,
  animateOnChange = true
}) => {
  const progressPercentage = Math.min((currentProgress / targetValue) * 100, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">
          {currentProgress} / {targetValue}
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: animateOnChange ? 1.5 : 0, ease: "easeOut" }}
          />
        </div>
        
        {showMilestones && (
          <div className="absolute top-0 w-full flex justify-between">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full border-2 border-gray-700",
                  progressPercentage >= (index * 25) 
                    ? "bg-orange-500" 
                    : "bg-gray-600"
                )}
                style={{ left: `${index * 25}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
```

#### **AchievementUnlock.tsx**
```typescript
interface AchievementUnlockProps {
  achievement: Achievement;
  isVisible: boolean;
  onComplete: () => void;
}

export const AchievementUnlock: React.FC<AchievementUnlockProps> = ({
  achievement,
  isVisible,
  onComplete
}) => {
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowCelebration(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false);
        onComplete();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg shadow-2xl border border-yellow-400/30">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div>
                <h3 className="text-white font-bold">Achievement Unlocked!</h3>
                <p className="text-yellow-100 text-sm">{achievement.title}</p>
                <p className="text-yellow-200 text-xs">{achievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

### **Feature Gating System**

#### **FeatureGate.tsx**
```typescript
interface FeatureGateProps {
  feature: string;
  requiredTier?: TierEnum;
  children: ReactNode;
  fallback?: ReactNode;
  showPreview?: boolean;
}

export const FeatureGate: React.FC<FeatureGateProps> = ({
  feature,
  requiredTier,
  children,
  fallback,
  showPreview = true
}) => {
  const { currentTier, canAccessFeature } = usePartnerTier();
  const hasAccess = canAccessFeature(feature);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showPreview) {
    return (
      <div className="relative">
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="text-white font-bold mb-1">Feature Locked</h3>
            <p className="text-gray-300 text-sm">
              Upgrade to {requiredTier} tier to unlock
            </p>
            <Button size="sm" className="mt-2">
              View Requirements
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
```

---

## ⚡ **Real-time Systems**

### **Tier Progression Engine**
```typescript
// Automated tier progression check
export const TierProgressionEngine = {
  async checkProgression(partnerId: string) {
    const tierData = await getTierData(partnerId);
    const nextTier = calculateNextTier(tierData);
    
    if (nextTier && tierData.deals_completed >= getRequiredDeals(nextTier)) {
      await this.advancePartner(partnerId, nextTier);
      await this.triggerCelebration(partnerId, nextTier);
      await this.unlockFeatures(partnerId, nextTier);
    }
  },

  async advancePartner(partnerId: string, newTier: TierEnum) {
    // Update tier
    await supabase
      .from('partner_tiers')
      .update({
        current_tier: newTier,
        tier_qualified_at: new Date().toISOString(),
        next_tier_progress: 0
      })
      .eq('partner_id', partnerId);

    // Log progression event
    await supabase
      .from('tier_progress_events')
      .insert({
        partner_id: partnerId,
        event_type: 'tier_advanced',
        event_data: { new_tier: newTier },
        new_tier: newTier
      });
  },

  async triggerCelebration(partnerId: string, newTier: TierEnum) {
    // Send real-time notification
    await supabase
      .channel('tier_celebrations')
      .send({
        type: 'broadcast',
        event: 'tier_advanced',
        payload: {
          partner_id: partnerId,
          new_tier: newTier,
          timestamp: new Date().toISOString()
        }
      });
  }
};
```

### **Achievement System**
```typescript
export const AchievementEngine = {
  async checkAchievements(partnerId: string, eventType: string, eventData: any) {
    const achievements = await getUnlockedAchievements(eventType);
    
    for (const achievement of achievements) {
      if (await this.evaluateCriteria(partnerId, achievement, eventData)) {
        await this.grantAchievement(partnerId, achievement);
      }
    }
  },

  async evaluateCriteria(partnerId: string, achievement: Achievement, eventData: any): Promise<boolean> {
    const { criteria } = achievement;
    
    // Example criteria evaluation
    switch (achievement.achievement_key) {
      case 'first_sale':
        return eventData.deals_completed >= 1;
      
      case 'quick_starter':
        const daysSinceJoin = calculateDaysSinceJoin(partnerId);
        return eventData.deals_completed >= 1 && daysSinceJoin <= 30;
      
      case 'team_builder':
        const teamSize = await getTeamSize(partnerId);
        return teamSize >= 1;
      
      default:
        return false;
    }
  },

  async grantAchievement(partnerId: string, achievement: Achievement) {
    // Check if already granted
    const existing = await supabase
      .from('partner_achievements')
      .select('id')
      .eq('partner_id', partnerId)
      .eq('achievement_key', achievement.achievement_key)
      .single();

    if (existing.data) return;

    // Grant achievement
    await supabase
      .from('partner_achievements')
      .insert({
        partner_id: partnerId,
        achievement_key: achievement.achievement_key,
        achieved_at: new Date().toISOString()
      });

    // Trigger notification
    await this.notifyAchievement(partnerId, achievement);
  }
};
```

---

## 📊 **Performance Optimization**

### **Database Optimization**
```sql
-- Materialized view for tier calculations
CREATE MATERIALIZED VIEW partner_tier_summary AS
SELECT 
  pt.partner_id,
  pt.current_tier,
  pt.deals_completed,
  pt.total_revenue,
  td.commission_rate,
  td.benefits,
  CASE 
    WHEN pt.deals_completed >= next_tier.min_deals_required 
    THEN next_tier.tier_name 
    ELSE NULL 
  END as eligible_for_tier
FROM partner_tiers pt
JOIN tier_definitions td ON pt.current_tier = td.tier_name
LEFT JOIN tier_definitions next_tier ON td.display_order + 1 = next_tier.display_order;

-- Refresh materialized view on data changes
CREATE OR REPLACE FUNCTION refresh_partner_tier_summary()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY partner_tier_summary;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_refresh_tier_summary
  AFTER INSERT OR UPDATE OR DELETE ON partner_tiers
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_partner_tier_summary();
```

### **Caching Strategy**
```typescript
// React Query configuration
export const tierQueryConfig = {
  staleTime: 1000 * 60 * 5, // 5 minutes
  cacheTime: 1000 * 60 * 30, // 30 minutes
  refetchOnWindowFocus: false,
  retry: 3
};

// Service worker for offline access
export const registerTierServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/tier-sw.js');
  }
};
```

This technical specification provides the complete foundation for building the progressive partner portal with gamification, tier management, and real-time features!

---

*Next: Research gamification and notification systems for optimal engagement*