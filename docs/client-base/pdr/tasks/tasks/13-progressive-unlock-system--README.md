# Progressive Unlock System (Core Infrastructure)

## 🎯 **ULTRA CONTEXT TASK OVERVIEW**

**Priority**: FOUNDATIONAL - Required for entire 6-page architecture
**Impact**: Enable progressive feature discovery without overwhelming users
**Timeline**: 4-5 days (Week 1-2, Runs parallel with other tasks)
**Status**: 🔴 NEW - Build from scratch but integrate with existing auth
**Breaking Risk**: 🟢 ZERO - Pure additive system, existing routes unchanged

## 📝 **BUSINESS CONTEXT & ULTRA THINK REASONING**

### **Problem Statement**
- Traditional navigation = cognitive overload (choice paralysis)
- Users don't know what to do next (decision fatigue)
- Features launched all at once = poor adoption
- No guided journey = users get lost
- Complex features introduced too early = abandonment

### **PDR Vision: Progressive Discovery**
Instead of showing all 6 pages immediately:
1. **Start Simple**: Project Hub + Quick Setup (2 pages)
2. **Earn Access**: Complete setup → unlock Work in Progress
3. **Natural Flow**: Approve deliverables → unlock Project Roadmap
4. **Build Excitement**: Development starts → unlock Live Build
5. **Celebration**: Project complete → unlock Go Live

### **Psychology Behind Progressive Unlock**
- **Completion Bias**: Humans love finishing things
- **Achievement Unlock**: Gaming psychology in B2B
- **Reduced Overwhelm**: Only see what's relevant now
- **Clear Next Steps**: Always know what to do next
- **Momentum Building**: Each unlock feels like progress

## 🏗️ **EXISTING INFRASTRUCTURE ANALYSIS**

### **AUTH SYSTEM TO LEVERAGE**
```typescript
// EXISTING: useIsClient, useClientDetails hooks
const { isClient, loading } = useIsClient();
const { clientData } = useClientDetails();

// EXISTING: Client authentication RPC
const { data: clientIdData } = await supabase.rpc('get_client_by_user_id', { 
  user_uuid: user.id 
});

// EXISTING: Database structure
client_onboarding {
  id: UUID,
  user_id: UUID,
  current_step: INTEGER,
  total_steps: INTEGER,
  // ... existing fields
}
```

### **ROUTE SYSTEM TO PRESERVE**
```typescript
// EXISTING: Route structure in App.tsx (must preserve)
<Route path="/client-dashboard" element={<AuthGuard><ClientDashboard /></AuthGuard>} />
<Route path="/client-dashboard/tasks" element={<AuthGuard><ClientTasksPage /></AuthGuard>} />
<Route path="/client-dashboard/status" element={<AuthGuard><ClientStatusPage /></AuthGuard>} />
// ... existing routes

// CHALLENGE: Add progressive protection without breaking existing routes
// SOLUTION: Wrapper component that redirects vs blocks
```

### **NAVIGATION SYSTEM TO ENHANCE**
```typescript
// EXISTING: clientMenuSections.ts
export const clientMenuSections = [
  {
    type: 'main',
    href: '/client-dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    type: 'section',
    title: 'Projects & Tasks',
    items: [
      { href: '/client-dashboard/tasks', icon: ListTodo, label: 'Active Tasks' },
      // ... existing items
    ]
  }
];

// ENHANCEMENT: Add unlock levels without breaking existing structure
```

## ✨ **PROGRESSIVE UNLOCK SYSTEM ARCHITECTURE**

### **1. Unlock Level Definition**
```typescript
// NEW: types/progressiveUnlock.types.ts
export interface UnlockLevel {
  id: string;
  name: string;
  description: string;
  requiredStep: number;
  requiredConditions: UnlockCondition[];
  icon: LucideIcon;
  order: number;
}

export interface UnlockCondition {
  type: 'step_completion' | 'action_completion' | 'time_based' | 'approval_received';
  value: string | number;
  description: string;
}

export const UNLOCK_LEVELS: UnlockLevel[] = [
  {
    id: 'project-hub',
    name: 'Project Hub',
    description: 'Your command center',
    requiredStep: 0,
    requiredConditions: [],
    icon: Home,
    order: 1
  },
  {
    id: 'quick-setup',
    name: 'Quick Setup',
    description: '2-minute voice chat + mood board',
    requiredStep: 0,
    requiredConditions: [],
    icon: Zap,
    order: 2
  },
  {
    id: 'work-in-progress',
    name: 'Work in Progress',
    description: 'Active tasks & collaboration',
    requiredStep: 2,
    requiredConditions: [
      { type: 'action_completion', value: 'voice_onboarding', description: 'Complete voice onboarding' },
      { type: 'action_completion', value: 'design_preferences', description: 'Complete mood board' }
    ],
    icon: Clock,
    order: 3
  },
  {
    id: 'project-roadmap',
    name: 'Project Roadmap',
    description: '46-step PDR tracking',
    requiredStep: 2,
    requiredConditions: [
      { type: 'action_completion', value: 'first_deliverable_approved', description: 'Approve first deliverable' }
    ],
    icon: Map,
    order: 4
  },
  {
    id: 'live-build',
    name: 'Live Build',
    description: 'Watch AI agents code',
    requiredStep: 5,
    requiredConditions: [
      { type: 'step_completion', value: 5, description: 'Development phase started' }
    ],
    icon: Code,
    order: 5
  },
  {
    id: 'go-live',
    name: 'Go Live',
    description: 'Launch preparation',
    requiredStep: 8,
    requiredConditions: [
      { type: 'step_completion', value: 8, description: 'Project 90% complete' }
    ],
    icon: Rocket,
    order: 6
  }
];
```

### **2. Progressive Unlock Hook**
```typescript
// NEW: hooks/useProgressiveUnlock.ts
export function useProgressiveUnlock() {
  const { clientData } = useClientDetails();
  const [unlockedPages, setUnlockedPages] = useState<string[]>([]);
  const [nextUnlock, setNextUnlock] = useState<UnlockLevel | null>(null);

  useEffect(() => {
    if (!clientData) return;

    const calculateUnlockedPages = () => {
      const unlocked = UNLOCK_LEVELS.filter(level => {
        // Check step requirements
        if (level.requiredStep > (clientData.current_step || 0)) {
          return false;
        }

        // Check condition requirements
        return level.requiredConditions.every(condition => {
          switch (condition.type) {
            case 'action_completion':
              return clientData[condition.value] === true;
            case 'step_completion':
              return (clientData.current_step || 0) >= condition.value;
            case 'approval_received':
              return clientData.approvals?.[condition.value] === 'approved';
            default:
              return false;
          }
        });
      }).map(level => level.id);

      setUnlockedPages(unlocked);

      // Find next unlock
      const nextToUnlock = UNLOCK_LEVELS
        .filter(level => !unlocked.includes(level.id))
        .sort((a, b) => a.order - b.order)[0];
      
      setNextUnlock(nextToUnlock);
    };

    calculateUnlockedPages();
  }, [clientData]);

  const isPageUnlocked = (pageId: string): boolean => {
    return unlockedPages.includes(pageId);
  };

  const getUnlockProgress = (pageId: string): number => {
    const level = UNLOCK_LEVELS.find(l => l.id === pageId);
    if (!level || !clientData) return 0;

    const completedConditions = level.requiredConditions.filter(condition => {
      switch (condition.type) {
        case 'action_completion':
          return clientData[condition.value] === true;
        case 'step_completion':
          return (clientData.current_step || 0) >= condition.value;
        default:
          return false;
      }
    }).length;

    const stepProgress = Math.min(
      (clientData.current_step || 0) / level.requiredStep,
      1
    );

    const conditionProgress = level.requiredConditions.length > 0 
      ? completedConditions / level.requiredConditions.length 
      : 1;

    return Math.min(stepProgress * conditionProgress, 1) * 100;
  };

  return {
    unlockedPages,
    nextUnlock,
    isPageUnlocked,
    getUnlockProgress,
    totalPages: UNLOCK_LEVELS.length,
    unlockedCount: unlockedPages.length
  };
}
```

### **3. Progressive Route Guard**
```typescript
// NEW: components/auth/ProgressiveRouteGuard.tsx
interface ProgressiveRouteGuardProps {
  children: React.ReactNode;
  pageId: string;
  redirectTo?: string;
  showUnlockHint?: boolean;
}

export function ProgressiveRouteGuard({ 
  children, 
  pageId, 
  redirectTo = '/client-dashboard',
  showUnlockHint = true 
}: ProgressiveRouteGuardProps) {
  const { isPageUnlocked, getUnlockProgress, nextUnlock } = useProgressiveUnlock();
  const navigate = useNavigate();

  // Always allow access to basic pages
  if (['project-hub', 'quick-setup'].includes(pageId)) {
    return <>{children}</>;
  }

  // Check if page is unlocked
  if (!isPageUnlocked(pageId)) {
    if (showUnlockHint) {
      return (
        <ClientDashboardLayout>
          <PageUnlockHint 
            pageId={pageId}
            progress={getUnlockProgress(pageId)}
            onContinue={() => navigate(redirectTo)}
          />
        </ClientDashboardLayout>
      );
    } else {
      // Silent redirect
      navigate(redirectTo);
      return null;
    }
  }

  return <>{children}</>;
}

// NEW: components/unlock/PageUnlockHint.tsx
interface PageUnlockHintProps {
  pageId: string;
  progress: number;
  onContinue: () => void;
}

function PageUnlockHint({ pageId, progress, onContinue }: PageUnlockHintProps) {
  const level = UNLOCK_LEVELS.find(l => l.id === pageId);
  
  return (
    <div className="flex items-center justify-center min-h-96">
      <Card className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-slate-700 rounded-full w-fit">
            <Lock className="h-8 w-8 text-slate-400" />
          </div>
          <CardTitle className="flex items-center justify-center gap-2">
            <level.icon className="h-5 w-5" />
            {level.name}
          </CardTitle>
          <CardDescription>{level.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to unlock</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Required:</h4>
            {level.requiredConditions.map((condition, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-400" />
                {condition.description}
              </div>
            ))}
          </div>

          <Button onClick={onContinue} className="w-full">
            Continue Setup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### **4. Enhanced Navigation Menu**
```typescript
// ENHANCE: clientMenuSections.ts
import { useProgressiveUnlock } from '@/hooks/useProgressiveUnlock';

export function useClientMenuSections() {
  const { isPageUnlocked, getUnlockProgress } = useProgressiveUnlock();

  return useMemo(() => {
    const sections = [
      {
        type: 'main',
        href: '/client-dashboard',
        icon: Home,
        label: 'Project Hub', // RENAMED
        unlocked: true
      },
      {
        type: 'section',
        title: 'Setup & Design',
        items: [
          {
            href: '/client-dashboard/quick-setup',
            icon: Zap,
            label: 'Quick Setup',
            unlocked: true,
            badge: !isPageUnlocked('work-in-progress') ? 'Required' : undefined
          },
          {
            href: '/client-dashboard/work-in-progress',
            icon: Clock,
            label: 'Work in Progress',
            unlocked: isPageUnlocked('work-in-progress'),
            progress: !isPageUnlocked('work-in-progress') ? getUnlockProgress('work-in-progress') : undefined
          }
        ]
      },
      {
        type: 'section',
        title: 'Project Management',
        items: [
          {
            href: '/client-dashboard/project-roadmap',
            icon: Map,
            label: 'Project Roadmap',
            unlocked: isPageUnlocked('project-roadmap'),
            progress: !isPageUnlocked('project-roadmap') ? getUnlockProgress('project-roadmap') : undefined
          },
          {
            href: '/client-dashboard/live-build',
            icon: Code,
            label: 'Live Build',
            unlocked: isPageUnlocked('live-build'),
            progress: !isPageUnlocked('live-build') ? getUnlockProgress('live-build') : undefined
          }
        ]
      },
      {
        type: 'section',
        title: 'Launch',
        items: [
          {
            href: '/client-dashboard/go-live',
            icon: Rocket,
            label: 'Go Live',
            unlocked: isPageUnlocked('go-live'),
            progress: !isPageUnlocked('go-live') ? getUnlockProgress('go-live') : undefined
          }
        ]
      }
    ];

    // Filter out locked sections if they have no unlocked items
    return sections.filter(section => {
      if (section.type === 'main') return true;
      return section.items.some(item => item.unlocked);
    });
  }, [isPageUnlocked, getUnlockProgress]);
}

// ENHANCE: ClientDashboardSidebar.tsx to show unlock status
function NavigationItem({ item, isActive }) {
  return (
    <Link
      to={item.unlocked ? item.href : '#'}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive && item.unlocked
          ? "bg-primary text-primary-foreground"
          : item.unlocked
          ? "hover:bg-muted"
          : "text-muted-foreground cursor-not-allowed"
      )}
      onClick={!item.unlocked ? (e) => e.preventDefault() : undefined}
    >
      <item.icon className={cn(
        "h-4 w-4",
        !item.unlocked && "text-muted-foreground"
      )} />
      <span className="flex-1">{item.label}</span>
      
      {item.badge && (
        <Badge variant="secondary" className="text-xs">
          {item.badge}
        </Badge>
      )}
      
      {!item.unlocked && item.progress !== undefined && (
        <div className="w-8">
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary rounded-full h-1 transition-all"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        </div>
      )}
      
      {!item.unlocked && (
        <Lock className="h-3 w-3 text-muted-foreground" />
      )}
    </Link>
  );
}
```

## 🗄️ **DATABASE SCHEMA EXTENSIONS**

### **Extend client_onboarding Table**
```sql
-- ADDITIVE SCHEMA CHANGES (No breaking changes)
ALTER TABLE client_onboarding 
ADD COLUMN IF NOT EXISTS voice_onboarding_complete BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS design_preferences_complete BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS first_deliverable_approved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS development_started BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS project_launched BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS unlocked_pages TEXT[] DEFAULT ARRAY['project-hub', 'quick-setup'];

-- NEW TABLE: Action tracking for unlock conditions
CREATE TABLE IF NOT EXISTS client_unlock_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id),
  action_type VARCHAR(100),
  action_value TEXT,
  completed_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW TABLE: Page access analytics
CREATE TABLE IF NOT EXISTS client_page_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id),
  page_id VARCHAR(100),
  access_granted BOOLEAN,
  unlock_progress INTEGER,
  accessed_at TIMESTAMP DEFAULT NOW()
);

-- FUNCTION: Update unlock status
CREATE OR REPLACE FUNCTION update_client_unlock_status(
  client_uuid UUID,
  action_name VARCHAR(100),
  action_value TEXT DEFAULT 'true'
)
RETURNS BOOLEAN AS $$
DECLARE
  updated_rows INTEGER;
BEGIN
  -- Update the action completion status
  UPDATE client_onboarding 
  SET 
    voice_onboarding_complete = CASE 
      WHEN action_name = 'voice_onboarding' THEN TRUE 
      ELSE voice_onboarding_complete 
    END,
    design_preferences_complete = CASE 
      WHEN action_name = 'design_preferences' THEN TRUE 
      ELSE design_preferences_complete 
    END,
    first_deliverable_approved = CASE 
      WHEN action_name = 'first_deliverable_approved' THEN TRUE 
      ELSE first_deliverable_approved 
    END,
    development_started = CASE 
      WHEN action_name = 'development_started' THEN TRUE 
      ELSE development_started 
    END,
    updated_at = NOW()
  WHERE id = client_uuid;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;

  -- Log the action
  INSERT INTO client_unlock_actions (client_id, action_type, action_value)
  VALUES (client_uuid, action_name, action_value);

  RETURN updated_rows > 0;
END;
$$ LANGUAGE plpgsql;
```

## 🔧 **IMPLEMENTATION PHASES**

### **Phase 1: Core Infrastructure (Day 1-2)**
```typescript
// 1. Create unlock types and constants
// 2. Build useProgressiveUnlock hook
// 3. Create ProgressiveRouteGuard component
// 4. Database schema extensions

// Key files to create:
// - types/progressiveUnlock.types.ts
// - hooks/useProgressiveUnlock.ts
// - components/auth/ProgressiveRouteGuard.tsx
// - utils/unlockLevels.ts
```

### **Phase 2: Route Integration (Day 3)**
```typescript
// 1. Wrap existing routes with ProgressiveRouteGuard
// 2. Update App.tsx route definitions
// 3. Test backwards compatibility

// App.tsx changes:
<Route 
  path="/client-dashboard/work-in-progress" 
  element={
    <AuthGuard>
      <ProgressiveRouteGuard pageId="work-in-progress">
        <WorkInProgressPage />
      </ProgressiveRouteGuard>
    </AuthGuard>
  } 
/>
```

### **Phase 3: Navigation Enhancement (Day 4)**
```typescript
// 1. Update clientMenuSections to use unlock status
// 2. Enhance sidebar to show progress bars
// 3. Add unlock hints and badges

// Navigation integration:
const menuSections = useClientMenuSections(); // Dynamic based on unlock status
```

### **Phase 4: Testing & Analytics (Day 5)**
```typescript
// 1. Comprehensive testing of unlock logic
// 2. Analytics integration for unlock tracking
// 3. Performance optimization
// 4. Error handling for edge cases
```

## 🎯 **SUCCESS METRICS**

### **Functional Success**
- [ ] All existing routes continue to work
- [ ] Progressive unlock logic functions correctly
- [ ] Navigation shows appropriate lock/unlock states
- [ ] Database updates unlock status properly
- [ ] Route guards redirect appropriately

### **User Experience Success**
- [ ] Users understand what to do next
- [ ] Lock states are clear and helpful
- [ ] Progress indicators motivate completion
- [ ] Unlock moments feel rewarding
- [ ] No confusion about inaccessible features

### **Technical Success**
- [ ] Zero performance impact on existing pages
- [ ] Database queries remain efficient
- [ ] Hook doesn't cause excessive re-renders
- [ ] Route guards work on all devices
- [ ] Analytics track unlock patterns

## 📋 **ACCEPTANCE CRITERIA**

### **Must Have**
- [ ] Progressive unlock system fully functional
- [ ] All existing functionality preserved
- [ ] Clean, intuitive lock/unlock UI
- [ ] Database tracking of unlock actions
- [ ] Mobile-responsive unlock hints

### **Should Have**
- [ ] Smooth animations for unlock states
- [ ] Analytics for unlock optimization
- [ ] Admin override for unlock testing
- [ ] Performance monitoring

### **Could Have**
- [ ] Celebration animations on unlock
- [ ] Custom unlock conditions per client
- [ ] A/B testing for unlock thresholds
- [ ] Advanced analytics dashboard

## 🚨 **RISK MITIGATION**

### **Breaking Change Prevention**
1. **Route Preservation**: All existing URLs continue to work
2. **Graceful Degradation**: If unlock system fails, show all pages
3. **Database Safety**: Only additive schema changes
4. **Feature Flags**: Ability to disable progressive unlock
5. **Testing Coverage**: Comprehensive backwards compatibility tests

### **Edge Case Handling**
```typescript
// Handle cases where unlock data is missing or corrupted
function safeGetUnlockStatus(clientData: ClientData): string[] {
  try {
    // Use existing unlock data if available
    if (clientData?.unlocked_pages?.length) {
      return clientData.unlocked_pages;
    }

    // Fallback: Calculate from current_step
    const estimatedUnlocks = ['project-hub', 'quick-setup'];
    if (clientData?.current_step >= 2) {
      estimatedUnlocks.push('work-in-progress', 'project-roadmap');
    }
    if (clientData?.current_step >= 5) {
      estimatedUnlocks.push('live-build');
    }
    if (clientData?.current_step >= 8) {
      estimatedUnlocks.push('go-live');
    }

    return estimatedUnlocks;
  } catch (error) {
    // Ultimate fallback: Show all pages
    console.warn('Failed to determine unlock status, showing all pages:', error);
    return ['project-hub', 'quick-setup', 'work-in-progress', 'project-roadmap', 'live-build', 'go-live'];
  }
}
```

This progressive unlock system provides the infrastructure for the entire 6-page architecture while maintaining complete backwards compatibility and zero breaking changes.