/*
  # Initial Schema Setup

  1. Tables
    - users (handled by Supabase Auth)
    - messages
    - projects
    - project_purchases

  2. Security
    - Enable RLS on all tables
    - Set up policies for secure access
*/

-- Messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false
);

-- Enable RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can read messages
CREATE POLICY "Admins can read messages"
  ON messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Anyone can insert messages
CREATE POLICY "Anyone can submit messages"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Projects table for sellable items
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2),
  image TEXT,
  tags TEXT[] DEFAULT '{}',
  demo_link TEXT,
  github_link TEXT,
  features TEXT[] DEFAULT '{}',
  documentation TEXT,
  is_sellable BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects
CREATE POLICY "Anyone can view projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Only admins can modify projects
CREATE POLICY "Admins can modify projects"
  ON projects
  USING (auth.jwt() ->> 'role' = 'admin');

-- Project purchases tracking
CREATE TABLE IF NOT EXISTS project_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases"
  ON project_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update project updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();