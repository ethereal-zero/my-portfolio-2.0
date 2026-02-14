import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (
  process.env.REACT_APP_SUPABASE_URL ||
  process.env.REACT_APP_PUBLIC_SUPABASE_URL ||
  ''
).replace(/^"|"$/g, '').trim();

const supabaseKey = (
  process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY ||
  process.env.REACT_APP_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.REACT_APP_SUPABASE_ANON_KEY ||
  process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY ||
  ''
).replace(/^"|"$/g, '').trim();

if (!supabaseUrl || !supabaseKey) {
  console.error('REACT_APP_SUPABASE_URL exists:', !!process.env.REACT_APP_SUPABASE_URL);
  console.error('REACT_APP_PUBLIC_SUPABASE_URL exists:', !!process.env.REACT_APP_PUBLIC_SUPABASE_URL);
  console.error('REACT_APP_SUPABASE_PUBLISHABLE_KEY exists:', !!process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY);
  console.error('REACT_APP_PUBLIC_SUPABASE_PUBLISHABLE_KEY exists:', !!process.env.REACT_APP_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  console.error('REACT_APP_SUPABASE_ANON_KEY exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
  console.error('REACT_APP_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.REACT_APP_PUBLIC_SUPABASE_ANON_KEY);

  throw new Error(
    'Missing Supabase env vars. Check .env.development.local/.env.local and restart dev server.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
