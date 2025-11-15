// Supabase Client Singleton - DO NOT CREATE MULTIPLE INSTANCES
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://tcidaytqzruxqhsbfofy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaWRheXRxenJ1eHFoc2Jmb2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTkyNTMsImV4cCI6MjA3NTA5NTI1M30.oKi1aENw7-1we_8RWZj6i6AnhJtf7arI6sXaTuJ3o5o";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Create singleton instance
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
      realtime: {
        params: {
          eventsPerSecond: 2,
        },
      },
      global: {
        headers: {
          'x-client-info': 'siso-partnerships-pwa',
        },
      },
    });
  }
  return supabaseInstance;
})();