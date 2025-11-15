-- ====================================
-- SISO PARTNERSHIPS ROW LEVEL SECURITY
-- Run this in Supabase SQL Editor AFTER setup-database.sql
-- ====================================

-- Step 1: Enable RLS on All Tables
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_training ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_resources ENABLE ROW LEVEL SECURITY;

-- Step 2: Partners Table Policies
-- Partners can only view and edit their own profile
DROP POLICY IF EXISTS "partners_select_own" ON partners;
CREATE POLICY "partners_select_own" ON partners
FOR SELECT
USING (auth.uid()::text = id::text);

DROP POLICY IF EXISTS "partners_update_own" ON partners;
CREATE POLICY "partners_update_own" ON partners
FOR UPDATE
USING (auth.uid()::text = id::text);

-- Step 3: Referrals (Leads) Policies
-- Partners can see their own referrals
DROP POLICY IF EXISTS "referrals_select_own_and_team" ON partner_referrals;
CREATE POLICY "referrals_select_own_and_team" ON partner_referrals
FOR SELECT
USING (partner_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "referrals_insert_own" ON partner_referrals;
CREATE POLICY "referrals_insert_own" ON partner_referrals
FOR INSERT
WITH CHECK (partner_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "referrals_update_own" ON partner_referrals;
CREATE POLICY "referrals_update_own" ON partner_referrals
FOR UPDATE
USING (partner_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "referrals_delete_own" ON partner_referrals;
CREATE POLICY "referrals_delete_own" ON partner_referrals
FOR DELETE
USING (partner_id::text = auth.uid()::text);

-- Step 4: Commissions Policies
-- Partners can only view their own commissions
DROP POLICY IF EXISTS "commissions_select_own" ON partner_commissions;
CREATE POLICY "commissions_select_own" ON partner_commissions
FOR SELECT
USING (partner_id::text = auth.uid()::text);

-- Step 5: Training Policies
-- Partners can view and update their own training progress
DROP POLICY IF EXISTS "training_select_own" ON partner_training;
CREATE POLICY "training_select_own" ON partner_training
FOR SELECT
USING (partner_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "training_update_own" ON partner_training;
CREATE POLICY "training_update_own" ON partner_training
FOR UPDATE
USING (partner_id::text = auth.uid()::text);

-- Step 6: Resources Policies
-- Partners can view and track their own resource usage
DROP POLICY IF EXISTS "resources_select_own" ON partner_resources;
CREATE POLICY "resources_select_own" ON partner_resources
FOR SELECT
USING (partner_id::text = auth.uid()::text);

DROP POLICY IF EXISTS "resources_insert_own" ON partner_resources;
CREATE POLICY "resources_insert_own" ON partner_resources
FOR INSERT
WITH CHECK (partner_id::text = auth.uid()::text);

-- Step 7: Admin Bypass Policies
-- Admins can view all data
DROP POLICY IF EXISTS "partners_admin_all" ON partners;
CREATE POLICY "partners_admin_all" ON partners
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

DROP POLICY IF EXISTS "referrals_admin_all" ON partner_referrals;
CREATE POLICY "referrals_admin_all" ON partner_referrals
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

DROP POLICY IF EXISTS "commissions_admin_all" ON partner_commissions;
CREATE POLICY "commissions_admin_all" ON partner_commissions
FOR ALL
USING (
  (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- Step 8: Grant Permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Done! Your database is now secure with RLS policies.
