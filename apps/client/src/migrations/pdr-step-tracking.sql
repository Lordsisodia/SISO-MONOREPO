-- PDR Step Tracking Migration
-- This migration creates tables for tracking 46-step PDR progress

-- Extend existing client_onboarding (no breaking changes)
ALTER TABLE client_onboarding 
ADD COLUMN IF NOT EXISTS pdr_velocity DECIMAL DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS estimated_completion_date DATE,
ADD COLUMN IF NOT EXISTS current_phase VARCHAR(50) DEFAULT 'discovery';

-- Create 46-step PDR tracking table
CREATE TABLE IF NOT EXISTS pdr_step_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id),
  step_number INTEGER NOT NULL,
  title VARCHAR(255),
  description TEXT,
  phase VARCHAR(50), -- 'discovery', 'design', 'development', 'launch'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'active', 'completed', 'blocked'
  estimated_duration VARCHAR(50),
  actual_duration INTEGER, -- in hours
  deliverables TEXT[],
  requires_approval BOOLEAN DEFAULT FALSE,
  approval_status VARCHAR(50), -- 'pending', 'approved', 'changes_requested'
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  assigned_agents TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(client_id, step_number)
);

-- Create agent activity tracking for PDR steps
CREATE TABLE IF NOT EXISTS pdr_agent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id),
  pdr_step INTEGER,
  agent_name VARCHAR(100),
  activity_description TEXT,
  activity_type VARCHAR(50), -- 'coding', 'design', 'analysis', 'testing'
  code_changes INTEGER,
  tokens_used INTEGER,
  files_modified TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create PDR phase progress tracking
CREATE TABLE IF NOT EXISTS pdr_phase_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES client_onboarding(id),
  phase_name VARCHAR(50),
  start_step INTEGER,
  end_step INTEGER,
  progress_percentage DECIMAL DEFAULT 0,
  estimated_completion DATE,
  phase_status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Function: Update PDR step progress
CREATE OR REPLACE FUNCTION update_pdr_step_progress(
  client_uuid UUID,
  step_num INTEGER,
  new_status VARCHAR(50)
)
RETURNS BOOLEAN AS $$
DECLARE
  step_updated BOOLEAN;
BEGIN
  -- Update step status
  UPDATE pdr_step_tracking 
  SET 
    status = new_status,
    started_at = CASE WHEN new_status = 'active' AND started_at IS NULL THEN NOW() ELSE started_at END,
    completed_at = CASE WHEN new_status = 'completed' THEN NOW() ELSE NULL END,
    updated_at = NOW()
  WHERE client_id = client_uuid AND step_number = step_num;

  GET DIAGNOSTICS step_updated = FOUND;

  -- Update client current_step if this step is completed
  IF new_status = 'completed' AND step_updated THEN
    UPDATE client_onboarding 
    SET 
      current_step = GREATEST(current_step, step_num + 1),
      updated_at = NOW()
    WHERE id = client_uuid;
  END IF;

  RETURN step_updated;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate project velocity
CREATE OR REPLACE FUNCTION calculate_project_velocity(client_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
  completed_steps INTEGER;
  days_active INTEGER;
  velocity DECIMAL;
BEGIN
  -- Count completed steps
  SELECT COUNT(*) INTO completed_steps
  FROM pdr_step_tracking
  WHERE client_id = client_uuid AND status = 'completed';

  -- Calculate days since project started
  SELECT EXTRACT(DAY FROM NOW() - created_at) INTO days_active
  FROM client_onboarding
  WHERE id = client_uuid;

  -- Calculate velocity (steps per day)
  IF days_active > 0 THEN
    velocity := completed_steps::DECIMAL / days_active;
  ELSE
    velocity := 0;
  END IF;

  -- Update client record
  UPDATE client_onboarding 
  SET pdr_velocity = velocity
  WHERE id = client_uuid;

  RETURN velocity;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate phase progress
CREATE OR REPLACE FUNCTION calculate_phase_progress(client_uuid UUID)
RETURNS VOID AS $$
DECLARE
  phase_rec RECORD;
  completed_count INTEGER;
  total_count INTEGER;
  progress DECIMAL;
BEGIN
  -- Define phases
  FOR phase_rec IN 
    SELECT 'discovery' as name, 1 as start_step, 8 as end_step
    UNION ALL
    SELECT 'design', 9, 18
    UNION ALL
    SELECT 'development', 19, 38
    UNION ALL
    SELECT 'launch', 39, 46
  LOOP
    -- Count completed steps in phase
    SELECT COUNT(*) INTO completed_count
    FROM pdr_step_tracking
    WHERE client_id = client_uuid 
      AND step_number BETWEEN phase_rec.start_step AND phase_rec.end_step
      AND status = 'completed';
    
    -- Calculate total steps in phase
    total_count := phase_rec.end_step - phase_rec.start_step + 1;
    
    -- Calculate progress percentage
    progress := (completed_count::DECIMAL / total_count) * 100;
    
    -- Update or insert phase progress
    INSERT INTO pdr_phase_progress (
      client_id, phase_name, start_step, end_step, progress_percentage
    ) VALUES (
      client_uuid, phase_rec.name, phase_rec.start_step, phase_rec.end_step, progress
    )
    ON CONFLICT (client_id, phase_name) DO UPDATE
    SET progress_percentage = progress,
        updated_at = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pdr_step_tracking_updated_at
  BEFORE UPDATE ON pdr_step_tracking
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdr_phase_progress_updated_at
  BEFORE UPDATE ON pdr_phase_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security Policies
ALTER TABLE pdr_step_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdr_agent_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdr_phase_progress ENABLE ROW LEVEL SECURITY;

-- Policies for pdr_step_tracking
CREATE POLICY "Users can view their own PDR steps"
  ON pdr_step_tracking
  FOR SELECT
  USING (client_id IN (
    SELECT id FROM client_onboarding WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can update PDR steps"
  ON pdr_step_tracking
  FOR ALL
  USING (true);

-- Policies for pdr_agent_activities
CREATE POLICY "Users can view their own agent activities"
  ON pdr_agent_activities
  FOR SELECT
  USING (client_id IN (
    SELECT id FROM client_onboarding WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can insert agent activities"
  ON pdr_agent_activities
  FOR INSERT
  WITH CHECK (true);

-- Policies for pdr_phase_progress
CREATE POLICY "Users can view their own phase progress"
  ON pdr_phase_progress
  FOR SELECT
  USING (client_id IN (
    SELECT id FROM client_onboarding WHERE user_id = auth.uid()
  ));

CREATE POLICY "System can manage phase progress"
  ON pdr_phase_progress
  FOR ALL
  USING (true);

-- Create indexes for performance
CREATE INDEX idx_pdr_step_tracking_client_id ON pdr_step_tracking(client_id);
CREATE INDEX idx_pdr_step_tracking_status ON pdr_step_tracking(status);
CREATE INDEX idx_pdr_agent_activities_client_id ON pdr_agent_activities(client_id);
CREATE INDEX idx_pdr_agent_activities_created_at ON pdr_agent_activities(created_at DESC);
CREATE INDEX idx_pdr_phase_progress_client_id ON pdr_phase_progress(client_id);