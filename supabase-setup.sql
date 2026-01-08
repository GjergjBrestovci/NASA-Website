-- Supabase SQL Setup Script
-- Run this in the Supabase SQL Editor to set up the database

-- Create schedule table
CREATE TABLE IF NOT EXISTS schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slot TEXT NOT NULL,
  focus TEXT NOT NULL,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('live', 'upcoming', 'milestone', 'completed')),
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_schedule_position ON schedule(position);

-- Enable Row Level Security
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read schedule (public)
CREATE POLICY "Public read access" ON schedule
  FOR SELECT
  USING (true);

-- Policy: Only authenticated users with teacher role can insert
CREATE POLICY "Teachers can insert" ON schedule
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'role' = 'teacher' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

-- Policy: Only authenticated users with teacher role can update
CREATE POLICY "Teachers can update" ON schedule
  FOR UPDATE
  USING (
    auth.jwt() ->> 'role' = 'teacher' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

-- Policy: Only authenticated users with teacher role can delete
CREATE POLICY "Teachers can delete" ON schedule
  FOR DELETE
  USING (
    auth.jwt() ->> 'role' = 'teacher' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'teacher'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_schedule_updated_at ON schedule;
CREATE TRIGGER update_schedule_updated_at
  BEFORE UPDATE ON schedule
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some default schedule items
INSERT INTO schedule (title, slot, focus, status, position) VALUES
  ('Launch Briefing', 'Mondays · 16:00 – 17:00', 'Mission overview, crew roles, and weekly objectives.', 'live', 0),
  ('Build & Test Lab', 'Wednesdays · 16:00 – 18:00', 'Hands-on builds, sensor wiring, and code checkpoints.', 'upcoming', 1),
  ('Flight Readiness Sim', 'Fridays · 15:30 – 17:00', 'Comms loops, anomalies, and go/no-go drills.', 'upcoming', 2),
  ('Launch Day', 'Monthly · Weather permitting', 'Integration, final checks, and launch operations.', 'milestone', 3)
ON CONFLICT DO NOTHING;

-- To create a teacher user, run this in Supabase Dashboard > Authentication > Users
-- Or use the Supabase Admin API to set app_metadata.role = 'teacher'
-- 
-- Example SQL to update an existing user to teacher role:
-- UPDATE auth.users 
-- SET raw_app_meta_data = raw_app_meta_data || '{"role": "teacher"}'::jsonb 
-- WHERE email = 'teacher@example.com';
