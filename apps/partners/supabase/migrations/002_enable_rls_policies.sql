-- Enable Row Level Security on all partnership tables
-- CRITICAL: Without RLS, Partner A can see Partner B's data!

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_resources ENABLE ROW LEVEL SECURITY;

-- Partners table policies
-- Partners can only view and edit their own profile
CREATE POLICY "partners_select_own" ON partners
FOR SELECT
USING (auth.uid()::text = id::text);

CREATE POLICY "partners_update_own" ON partners
FOR UPDATE
USING (auth.uid()::text = id::text);

-- Referrals (Leads) policies
-- Partners can see their own referrals + team members' referrals (if team leader)
CREATE POLICY "referrals_select_own_and_team" ON partner_referrals
FOR SELECT
USING (
  partner_id::text = auth.uid()::text
  -- TODO: Add team member check when partner_teams table exists
);

CREATE POLICY "referrals_insert_own" ON partner_referrals
FOR INSERT
WITH CHECK (partner_id::text = auth.uid()::text);

CREATE POLICY "referrals_update_own" ON partner_referrals
FOR UPDATE
USING (partner_id::text = auth.uid()::text);

CREATE POLICY "referrals_delete_own" ON partner_referrals
FOR DELETE
USING (partner_id::text = auth.uid()::text);

-- Commissions policies
-- Partners can only view their own commissions
CREATE POLICY "commissions_select_own" ON partner_commissions
FOR SELECT
USING (partner_id::text = auth.uid()::text);

-- Commissions are created by system only (no INSERT policy for partners)

-- Training policies
-- Partners can view and update their own training progress
CREATE POLICY "training_select_own" ON partner_training
FOR SELECT
USING (partner_id::text = auth.uid()::text);

CREATE POLICY "training_update_own" ON partner_training
FOR UPDATE
USING (partner_id::text = auth.uid()::text);

-- Resources policies
-- Partners can view and track their own resource usage
CREATE POLICY "resources_select_own" ON partner_resources
FOR SELECT
USING (partner_id::text = auth.uid()::text);

CREATE POLICY "resources_insert_own" ON partner_resources
FOR INSERT
WITH CHECK (partner_id::text = auth.uid()::text);

-- Create admin bypass policies (for admin dashboard)
-- Admins can view all data (check for admin role in auth.users metadata)
CREATE POLICY "partners_admin_all" ON partners
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "referrals_admin_all" ON partner_referrals
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

CREATE POLICY "commissions_admin_all" ON partner_commissions
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
