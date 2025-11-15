-- SISO Partnership Tier System Database Schema
-- Migrated from PDR-cookbook technical specifications
-- Date: September 13, 2025

-- Create enum for tier levels
CREATE TYPE tier_enum AS ENUM ('starter', 'active', 'performer', 'elite');

-- 1. Partner Tiers Management
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

-- Indexes for performance
CREATE INDEX idx_partner_tiers_partner_id ON partner_tiers(partner_id);
CREATE INDEX idx_partner_tiers_current_tier ON partner_tiers(current_tier);
CREATE INDEX idx_partner_tiers_deals_completed ON partner_tiers(deals_completed);

-- 2. Tier Requirements & Benefits
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

-- Sample tier definitions with SISO commission structure (20% base + 10% override)
INSERT INTO tier_definitions (tier_name, min_deals_required, max_deals_limit, commission_rate, team_override_rate, benefits, requirements, unlock_features, display_order) VALUES
('starter', 0, 2, 20.00, 0.00, 
  '{"description": "Welcome to SISO Partners", "support": "Standard support", "materials": "Basic marketing kit"}',
  '{"deals_needed": 0, "training_required": false}',
  ARRAY['basic_training', 'commission_tracking', 'referral_links'],
  1
),
('active', 3, 9, 20.00, 5.00,
  '{"description": "Active Partner Benefits", "support": "Priority email support", "materials": "Advanced marketing materials"}',
  '{"deals_needed": 3, "training_required": true}',
  ARRAY['advanced_materials', 'lead_management', 'priority_support', 'referral_bonuses'],
  2
),
('performer', 10, 24, 20.00, 7.50,
  '{"description": "Top Performer Benefits", "support": "Dedicated account manager", "materials": "Premium marketing suite"}',
  '{"deals_needed": 10, "training_required": true, "team_lead_required": false}',
  ARRAY['premium_materials', 'team_management', 'custom_resources', 'monthly_review'],
  3
),
('elite', 25, NULL, 20.00, 10.00,
  '{"description": "Elite Partner Program", "support": "VIP support channel", "materials": "Exclusive co-marketing opportunities"}',
  '{"deals_needed": 25, "training_required": true, "team_lead_required": true}',
  ARRAY['elite_materials', 'co_marketing', 'strategic_planning', 'executive_access'],
  4
);

-- 3. Achievement System
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

-- 4. Progress Tracking
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

-- 5. Feature Access Control
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

-- Materialized view for tier calculations
CREATE MATERIALIZED VIEW partner_tier_summary AS
SELECT 
  pt.partner_id,
  pt.current_tier,
  pt.deals_completed,
  pt.total_revenue,
  td.commission_rate,
  td.team_override_rate,
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

-- Sample achievement definitions
INSERT INTO achievement_definitions (achievement_key, title, description, icon, points, criteria) VALUES
('first_sale', 'First Sale', 'Complete your first successful referral', '🎯', 100, '{"deals_completed": 1}'),
('quick_starter', 'Quick Starter', 'Complete first sale within 30 days', '⚡', 200, '{"deals_completed": 1, "days_since_join": 30}'),
('team_builder', 'Team Builder', 'Build your first partner team', '👥', 300, '{"team_size": 1}'),
('consistent_performer', 'Consistent Performer', 'Complete 5 deals in 3 months', '📈', 500, '{"deals_completed": 5, "timeframe_months": 3}'),
('revenue_milestone', 'Revenue Milestone', 'Generate $50,000 in total revenue', '💰', 1000, '{"total_revenue": 50000}');