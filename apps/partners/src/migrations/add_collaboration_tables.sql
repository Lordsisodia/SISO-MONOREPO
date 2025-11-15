-- EXTEND existing client_onboarding (no breaking changes)
ALTER TABLE client_onboarding 
ADD COLUMN IF NOT EXISTS first_deliverable_approved BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS team_collaboration_enabled BOOLEAN DEFAULT TRUE;

-- NEW: Team activity tracking
CREATE TABLE IF NOT EXISTS team_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id) ON DELETE CASCADE,
  actor_type VARCHAR(50), -- 'ai_agent', 'designer', 'developer', 'pm'
  actor_name VARCHAR(255),
  action VARCHAR(255),
  description TEXT,
  task_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_team_activities_client_id ON team_activities(client_id);
CREATE INDEX IF NOT EXISTS idx_team_activities_created_at ON team_activities(created_at DESC);

-- NEW: Client deliverables
CREATE TABLE IF NOT EXISTS client_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  deliverable_type VARCHAR(100), -- 'wireframe', 'mockup', 'prototype', 'document'
  preview_url TEXT,
  file_urls TEXT[],
  approval_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'needs_changes'
  approved_at TIMESTAMP,
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_client_deliverables_client_id ON client_deliverables(client_id);
CREATE INDEX IF NOT EXISTS idx_client_deliverables_status ON client_deliverables(approval_status);
CREATE INDEX IF NOT EXISTS idx_client_deliverables_created_at ON client_deliverables(created_at DESC);

-- NEW: Team chat messages
CREATE TABLE IF NOT EXISTS team_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id) ON DELETE CASCADE,
  sender_type VARCHAR(50), -- 'client', 'team_member', 'ai_agent'
  sender_name VARCHAR(255),
  message TEXT,
  message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'file'
  attachments JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_team_chat_messages_client_id ON team_chat_messages(client_id);
CREATE INDEX IF NOT EXISTS idx_team_chat_messages_created_at ON team_chat_messages(created_at);

-- FUNCTION: Log team activity
CREATE OR REPLACE FUNCTION log_team_activity(
  client_uuid UUID,
  actor_type_param VARCHAR(50),
  actor_name_param VARCHAR(255),
  action_param VARCHAR(255),
  description_param TEXT
)
RETURNS UUID AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO team_activities (
    client_id, 
    actor_type, 
    actor_name, 
    action, 
    description
  )
  VALUES (
    client_uuid,
    actor_type_param,
    actor_name_param,
    action_param,
    description_param
  )
  RETURNING id INTO activity_id;

  RETURN activity_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security
ALTER TABLE team_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_activities
CREATE POLICY "Clients can view their team activities" ON team_activities
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = team_activities.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  );

-- RLS Policies for client_deliverables
CREATE POLICY "Clients can view their deliverables" ON client_deliverables
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = client_deliverables.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can update deliverable approval status" ON client_deliverables
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = client_deliverables.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = client_deliverables.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  );

-- RLS Policies for team_chat_messages
CREATE POLICY "Clients can view their chat messages" ON team_chat_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = team_chat_messages.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can insert chat messages" ON team_chat_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM client_onboarding
      WHERE client_onboarding.id = team_chat_messages.client_id
      AND client_onboarding.user_id = auth.uid()
    )
  );

-- Sample data for testing (commented out for production)
-- INSERT INTO team_activities (client_id, actor_type, actor_name, action, description)
-- VALUES 
--   ('YOUR_CLIENT_ID', 'ai_agent', 'Design AI', 'started working on', 'Homepage wireframe design'),
--   ('YOUR_CLIENT_ID', 'developer', 'John Dev', 'completed', 'API integration for user authentication');

-- INSERT INTO client_deliverables (client_id, title, description, deliverable_type, created_by)
-- VALUES 
--   ('YOUR_CLIENT_ID', 'Homepage Wireframe', 'Initial wireframe design for the homepage', 'wireframe', 'Design Team'),
--   ('YOUR_CLIENT_ID', 'Brand Guidelines', 'Complete brand identity document', 'document', 'Brand Team');

-- INSERT INTO team_chat_messages (client_id, sender_type, sender_name, message)
-- VALUES 
--   ('YOUR_CLIENT_ID', 'team_member', 'Sarah PM', 'Welcome to your project! Feel free to ask any questions.'),
--   ('YOUR_CLIENT_ID', 'ai_agent', 'Design AI', 'I have started working on your homepage wireframe. You will see it in deliverables soon.');