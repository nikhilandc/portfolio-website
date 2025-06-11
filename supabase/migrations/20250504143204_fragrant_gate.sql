/*
  # Add Storage Bucket

  1. Changes
    - Create a new storage bucket for file uploads
    - Set up RLS policies for secure access
    - Configure bucket settings
*/

-- Enable storage if not already enabled
CREATE EXTENSION IF NOT EXISTS "storage" WITH SCHEMA "storage";

-- Create a new storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-files', 'project-files', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy to allow authenticated users to view files
CREATE POLICY "Authenticated users can view files"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'project-files');

-- Policy to allow only admins to upload files
CREATE POLICY "Only admins can upload files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-files'
  AND auth.jwt() ->> 'role' = 'admin'
);

-- Policy to allow only admins to update files
CREATE POLICY "Only admins can update files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-files'
  AND auth.jwt() ->> 'role' = 'admin'
)
WITH CHECK (
  bucket_id = 'project-files'
  AND auth.jwt() ->> 'role' = 'admin'
);

-- Policy to allow only admins to delete files
CREATE POLICY "Only admins can delete files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-files'
  AND auth.jwt() ->> 'role' = 'admin'
);