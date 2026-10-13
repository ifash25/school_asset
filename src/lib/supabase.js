import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  Boolean(url) &&
  Boolean(anon) &&
  !String(url).includes('your-supabase-url') &&
  String(anon) !== 'your-anon-key';

export const supabase = isSupabaseConfigured ? createClient(url, anon) : null;
