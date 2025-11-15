-- =====================================================
-- SISO-CLIENT-BASE Database Schema Initialization
-- =====================================================
-- Project: SISO Client Portal
-- Instance: https://yeqosbhihojkrgexenzj.supabase.co
-- Created: 2025-10-05
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================

CREATE TYPE client_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE user_role AS ENUM ('admin', 'user', 'viewer');
CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'completed', 'on_hold');
CREATE TYPE communication_type AS ENUM ('message', 'notification', 'email', 'sms');
CREATE TYPE communication_status AS ENUM ('sent', 'delivered', 'read', 'failed');

-- =====================================================
-- CLIENTS TABLE
-- =====================================================

CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    status client_status DEFAULT 'pending',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes for clients
CREATE INDEX idx_clients_user_id ON clients(user_id);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_status ON clients(status);
CREATE INDEX idx_clients_deleted_at ON clients(deleted_at) WHERE deleted_at IS NULL;

-- =====================================================
-- CLIENT USERS TABLE
-- =====================================================

CREATE TABLE client_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    role user_role DEFAULT 'user',
    status client_status DEFAULT 'invited',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(client_id, email)
);

-- Indexes for client_users
CREATE INDEX idx_client_users_client_id ON client_users(client_id);
CREATE INDEX idx_client_users_email ON client_users(email);
CREATE INDEX idx_client_users_status ON client_users(status);

-- =====================================================
-- CLIENT PROJECTS TABLE
-- =====================================================

CREATE TABLE client_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    status project_status DEFAULT 'planning',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Indexes for client_projects
CREATE INDEX idx_client_projects_client_id ON client_projects(client_id);
CREATE INDEX idx_client_projects_status ON client_projects(status);
CREATE INDEX idx_client_projects_deleted_at ON client_projects(deleted_at) WHERE deleted_at IS NULL;

-- =====================================================
-- CLIENT FILES TABLE
-- =====================================================

CREATE TABLE client_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES client_projects(id) ON DELETE SET NULL,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for client_files
CREATE INDEX idx_client_files_client_id ON client_files(client_id);
CREATE INDEX idx_client_files_project_id ON client_files(project_id);

-- =====================================================
-- CLIENT COMMUNICATIONS TABLE
-- =====================================================

CREATE TABLE client_communications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    type communication_type NOT NULL,
    content TEXT NOT NULL,
    status communication_status DEFAULT 'sent',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for client_communications
CREATE INDEX idx_client_communications_client_id ON client_communications(client_id);
CREATE INDEX idx_client_communications_type ON client_communications(type);
CREATE INDEX idx_client_communications_status ON client_communications(status);
CREATE INDEX idx_client_communications_created_at ON client_communications(created_at DESC);

-- =====================================================
-- UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_users_updated_at BEFORE UPDATE ON client_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_projects_updated_at BEFORE UPDATE ON client_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_files_updated_at BEFORE UPDATE ON client_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_communications_updated_at BEFORE UPDATE ON client_communications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all client tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_communications ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES - CLIENTS
-- =====================================================

-- Clients can read their own data
CREATE POLICY "Clients can read own data"
    ON clients FOR SELECT
    USING (auth.uid() = user_id);

-- Clients can update their own data
CREATE POLICY "Clients can update own data"
    ON clients FOR UPDATE
    USING (auth.uid() = user_id);

-- =====================================================
-- RLS POLICIES - CLIENT USERS
-- =====================================================

-- Client admins can manage client users
CREATE POLICY "Client admins can manage users"
    ON client_users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM clients
            WHERE clients.id = client_users.client_id
            AND clients.user_id = auth.uid()
        )
    );

-- Client users can read other users in their organization
CREATE POLICY "Client users can read organization users"
    ON client_users FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM client_users cu
            WHERE cu.client_id = client_users.client_id
            AND cu.email = auth.email()
        )
    );

-- =====================================================
-- RLS POLICIES - CLIENT PROJECTS
-- =====================================================

-- Clients can manage their own projects
CREATE POLICY "Clients can manage own projects"
    ON client_projects FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM clients
            WHERE clients.id = client_projects.client_id
            AND clients.user_id = auth.uid()
        )
    );

-- =====================================================
-- RLS POLICIES - CLIENT FILES
-- =====================================================

-- Clients can manage their own files
CREATE POLICY "Clients can manage own files"
    ON client_files FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM clients
            WHERE clients.id = client_files.client_id
            AND clients.user_id = auth.uid()
        )
    );

-- =====================================================
-- RLS POLICIES - CLIENT COMMUNICATIONS
-- =====================================================

-- Clients can read their own communications
CREATE POLICY "Clients can read own communications"
    ON client_communications FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM clients
            WHERE clients.id = client_communications.client_id
            AND clients.user_id = auth.uid()
        )
    );

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get client by user_id
CREATE OR REPLACE FUNCTION get_client_by_user_id(user_uuid UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    email TEXT,
    status client_status,
    settings JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.id,
        c.name,
        c.email,
        c.status,
        c.settings,
        c.created_at,
        c.updated_at
    FROM clients c
    WHERE c.user_id = user_uuid
    AND c.deleted_at IS NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get client projects
CREATE OR REPLACE FUNCTION get_client_projects(client_uuid UUID)
RETURNS TABLE (
    id UUID,
    name TEXT,
    status project_status,
    metadata JSONB,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        cp.id,
        cp.name,
        cp.status,
        cp.metadata,
        cp.created_at,
        cp.updated_at
    FROM client_projects cp
    WHERE cp.client_id = client_uuid
    AND cp.deleted_at IS NULL
    ORDER BY cp.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- SAMPLE DATA (Optional - for development)
-- =====================================================

-- Uncomment below to insert sample data for development/testing

/*
INSERT INTO clients (name, email, status) VALUES
    ('Acme Corporation', 'admin@acme.com', 'active'),
    ('TechStart Inc', 'admin@techstart.com', 'active'),
    ('Creative Agency', 'admin@creative.com', 'pending');

-- Note: Uncomment and modify with actual UUIDs after clients are created
-- INSERT INTO client_projects (client_id, name, status) VALUES
--     ('client-uuid-here', 'Website Redesign', 'in_progress'),
--     ('client-uuid-here', 'Mobile App Development', 'planning');
*/

-- =====================================================
-- GRANTS
-- =====================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- =====================================================
-- COMPLETION
-- =====================================================

-- Add a comment to track migration
COMMENT ON SCHEMA public IS 'SISO-CLIENT-BASE Schema - Initialized on 2025-10-05';
