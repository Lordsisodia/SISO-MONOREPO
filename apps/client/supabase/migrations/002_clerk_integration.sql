-- =====================================================
-- Clerk Integration for SISO-CLIENT-BASE
-- =====================================================
-- Purpose: Sync Clerk users to Supabase
-- Created: 2025-10-05
-- =====================================================

-- =====================================================
-- USERS TABLE (Clerk Sync)
-- =====================================================

CREATE TABLE users (
    id TEXT PRIMARY KEY, -- Clerk user ID
    email TEXT NOT NULL UNIQUE,
    first_name TEXT,
    last_name TEXT,
    image_url TEXT,
    clerk_data JSONB DEFAULT '{}', -- Store full Clerk user object
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Updated at trigger for users
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data"
    ON users FOR SELECT
    USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Users can update their own data
CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    USING (id = current_setting('request.jwt.claims', true)::json->>'sub');

-- =====================================================
-- UPDATE CLIENTS TABLE
-- =====================================================

-- Add clerk_user_id column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS clerk_user_id TEXT REFERENCES users(id) ON DELETE CASCADE;

-- Create index on clerk_user_id
CREATE INDEX IF NOT EXISTS idx_clients_clerk_user_id ON clients(clerk_user_id);

-- Update RLS policies for clients to work with Clerk users
DROP POLICY IF EXISTS "Clients can read own data" ON clients;
DROP POLICY IF EXISTS "Clients can update own data" ON clients;

CREATE POLICY "Clients can read own data via Clerk"
    ON clients FOR SELECT
    USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Clients can update own data via Clerk"
    ON clients FOR UPDATE
    USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- =====================================================
-- WEBHOOK FUNCTION FOR CLERK SYNC
-- =====================================================

-- Function to upsert user from Clerk webhook
CREATE OR REPLACE FUNCTION sync_clerk_user(
    clerk_id TEXT,
    user_email TEXT,
    user_first_name TEXT DEFAULT NULL,
    user_last_name TEXT DEFAULT NULL,
    user_image_url TEXT DEFAULT NULL,
    user_clerk_data JSONB DEFAULT '{}'
)
RETURNS users AS $$
DECLARE
    result users;
BEGIN
    INSERT INTO users (id, email, first_name, last_name, image_url, clerk_data)
    VALUES (clerk_id, user_email, user_first_name, user_last_name, user_image_url, user_clerk_data)
    ON CONFLICT (id)
    DO UPDATE SET
        email = EXCLUDED.email,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        image_url = EXCLUDED.image_url,
        clerk_data = EXCLUDED.clerk_data,
        updated_at = NOW()
    RETURNING * INTO result;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to delete user from Clerk webhook
CREATE OR REPLACE FUNCTION delete_clerk_user(clerk_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    DELETE FROM users WHERE id = clerk_id;
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- GRANTS
-- =====================================================

GRANT ALL ON users TO anon, authenticated;

-- =====================================================
-- COMPLETION
-- =====================================================

COMMENT ON TABLE users IS 'Clerk users synced via webhook';
