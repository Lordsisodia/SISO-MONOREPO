import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import type { Database } from '@/integrations/supabase/types';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://tcidaytqzruxqhsbfofy.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjaWRheXRxenJ1eHFoc2Jmb2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTkyNTMsImV4cCI6MjA3NTA5NTI1M30.oKi1aENw7-1we_8RWZj6i6AnhJtf7arI6sXaTuJ3o5o";

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error('Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY to your .env file');
}

// Context for authenticated Supabase client
interface SupabaseContextType {
  supabase: SupabaseClient<Database>;
  isLoading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

// Supabase client wrapper that uses Clerk JWT
function SupabaseAuthWrapper({ children }: { children: React.ReactNode }) {
  const { getToken } = useAuth();
  const [supabaseClient] = useState(() =>
    createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          'x-client-info': 'siso-partnerships-clerk',
        },
      },
      auth: {
        persistSession: false, // Clerk handles session persistence
      },
    })
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setSupabaseToken = async () => {
      try {
        const token = await getToken({ template: 'supabase' });

        if (token) {
          // Set the JWT token for Supabase RLS
          await supabaseClient.auth.setSession({
            access_token: token,
            refresh_token: '', // Clerk manages refresh
          });
        } else {
          // Clear the session if no token
          await supabaseClient.auth.signOut();
        }
      } catch (error) {
        console.error('Error setting Supabase token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setSupabaseToken();

    // Refresh token when Clerk session changes
    const intervalId = setInterval(setSupabaseToken, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [getToken, supabaseClient]);

  return (
    <SupabaseContext.Provider value={{ supabase: supabaseClient, isLoading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

// Main provider component
export function ClerkSupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SupabaseAuthWrapper>
        {children}
      </SupabaseAuthWrapper>
    </ClerkProvider>
  );
}

// Hook to use authenticated Supabase client
export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within ClerkSupabaseProvider');
  }
  return context;
}
