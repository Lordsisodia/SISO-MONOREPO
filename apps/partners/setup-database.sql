-- ====================================
-- SISO PARTNERSHIPS DATABASE SETUP
-- Run this in Supabase SQL Editor
-- ====================================

-- Step 1: Create Partners Table
CREATE TABLE IF NOT EXISTS partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company_name TEXT,
    phone TEXT,
    website TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'suspended', 'rejected')),
    tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
    commission_rate DECIMAL DEFAULT 0.20 CHECK (commission_rate >= 0 AND commission_rate <= 1),
    override_commission DECIMAL DEFAULT 0.10 CHECK (override_commission >= 0 AND override_commission <= 1),
    referral_code TEXT UNIQUE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    approved_at TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create Partner Referrals Table
CREATE TABLE IF NOT EXISTS partner_referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    client_email TEXT NOT NULL,
    client_name TEXT,
    client_phone TEXT,
    company_name TEXT,
    referral_source TEXT DEFAULT 'direct',
    status TEXT DEFAULT 'lead' CHECK (status IN ('lead', 'qualified', 'proposal', 'won', 'lost')),
    estimated_value DECIMAL DEFAULT 0,
    actual_value DECIMAL DEFAULT 0,
    commission_amount DECIMAL DEFAULT 0,
    commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'approved', 'paid')),
    notes TEXT,
    referred_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    converted_at TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 3: Create Partner Commissions Table
CREATE TABLE IF NOT EXISTS partner_commissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    referral_id UUID REFERENCES partner_referrals(id) ON DELETE CASCADE,
    commission_type TEXT DEFAULT 'referral' CHECK (commission_type IN ('referral', 'override', 'bonus')),
    base_amount DECIMAL NOT NULL DEFAULT 0,
    commission_rate DECIMAL NOT NULL DEFAULT 0,
    commission_amount DECIMAL NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
    payment_method TEXT DEFAULT 'bank_transfer',
    transaction_id TEXT,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Create Partner Training Table
CREATE TABLE IF NOT EXISTS partner_training (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    module_name TEXT NOT NULL,
    module_type TEXT DEFAULT 'course' CHECK (module_type IN ('course', 'webinar', 'certification')),
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    completion_date TIMESTAMP WITH TIME ZONE,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Create Partner Resources Table
CREATE TABLE IF NOT EXISTS partner_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES partners(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('brochure', 'case_study', 'video', 'presentation', 'logo')),
    resource_name TEXT NOT NULL,
    resource_url TEXT NOT NULL,
    download_count INTEGER DEFAULT 0,
    last_downloaded TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 6: Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_tier ON partners(tier);
CREATE INDEX IF NOT EXISTS idx_partners_referral_code ON partners(referral_code);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_partner_id ON partner_referrals(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_referrals_status ON partner_referrals(status);
CREATE INDEX IF NOT EXISTS idx_partner_commissions_partner_id ON partner_commissions(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_commissions_status ON partner_commissions(status);
CREATE INDEX IF NOT EXISTS idx_partner_training_partner_id ON partner_training(partner_id);

-- Step 7: Create Updated_At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 8: Add Updated_At Triggers
DROP TRIGGER IF EXISTS update_partners_updated_at ON partners;
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_referrals_updated_at ON partner_referrals;
CREATE TRIGGER update_partner_referrals_updated_at BEFORE UPDATE ON partner_referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_commissions_updated_at ON partner_commissions;
CREATE TRIGGER update_partner_commissions_updated_at BEFORE UPDATE ON partner_commissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_training_updated_at ON partner_training;
CREATE TRIGGER update_partner_training_updated_at BEFORE UPDATE ON partner_training
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_resources_updated_at ON partner_resources;
CREATE TRIGGER update_partner_resources_updated_at BEFORE UPDATE ON partner_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Step 9: Insert Sample Partners
INSERT INTO partners (email, full_name, company_name, status, tier, commission_rate, referral_code)
VALUES
('john@example.com', 'John Smith', 'Tech Solutions Inc', 'active', 'gold', 0.25, 'TECH001'),
('sarah@example.com', 'Sarah Johnson', 'Digital Marketing Pro', 'active', 'silver', 0.20, 'DIGI002'),
('mike@example.com', 'Mike Brown', 'Consulting Group LLC', 'approved', 'bronze', 0.20, 'CONS003')
ON CONFLICT (email) DO NOTHING;

-- Step 10: Insert Sample Referrals
INSERT INTO partner_referrals (partner_id, client_email, client_name, company_name, status, estimated_value, actual_value, commission_amount, commission_status)
SELECT
    p.id,
    'client1@example.com',
    'Client One',
    'Example Corp',
    'won',
    50000,
    45000,
    9000,
    'paid'
FROM partners p WHERE p.email = 'john@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO partner_referrals (partner_id, client_email, client_name, company_name, status, estimated_value)
SELECT
    p.id,
    'client2@example.com',
    'Client Two',
    'Another Corp',
    'proposal',
    75000
FROM partners p WHERE p.email = 'sarah@example.com'
ON CONFLICT DO NOTHING;

-- Done! You should now have all partnership tables set up.
