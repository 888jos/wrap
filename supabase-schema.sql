-- Create workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own workspaces"
  ON workspaces FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workspaces"
  ON workspaces FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workspaces"
  ON workspaces FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workspaces"
  ON workspaces FOR DELETE
  USING (auth.uid() = user_id);

-- Ensure upsert(onConflict: 'user_id') is valid and fast
CREATE UNIQUE INDEX IF NOT EXISTS workspaces_user_id_idx ON workspaces(user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON workspaces
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
