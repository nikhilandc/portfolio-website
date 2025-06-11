import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

export const submitMessage = async (name: string, email: string, message: string) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const markMessageAsRead = async (id: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', id);

  if (error) throw error;
};

// File upload helper
export const uploadFile = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from('resume')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (error) throw error;
  return data;
};

// Get file URL helper
export const getFileUrl = (path: string) => {
  const { data } = supabase.storage
    .from('resume')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

// Delete file helper
export const deleteFile = async (path: string) => {
  const { error } = await supabase.storage
    .from('resume')
    .remove([path]);

  if (error) throw error;
};

// List files in a folder
export const listFiles = async (folder: string) => {
  const { data, error } = await supabase.storage
    .from('resume')
    .list(folder);

  if (error) throw error;
  return data;
};

// Download file helper
export const downloadFile = async (path: string) => {
  const { data, error } = await supabase.storage
    .from('resume')
    .download(path);

  if (error) throw error;
  return data;
};