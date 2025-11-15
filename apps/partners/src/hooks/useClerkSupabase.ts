import { useAuth, useUser } from '@clerk/clerk-react';
import { useSupabase } from '@/app/providers/ClerkSupabaseProvider';

/**
 * Convenience hook that provides both Clerk auth state and authenticated Supabase client
 *
 * @example
 * ```tsx
 * const { user, isSignedIn, supabase } = useClerkSupabase();
 *
 * // Use Clerk user data
 * console.log(user?.firstName);
 *
 * // Use authenticated Supabase client
 * const { data } = await supabase.from('partners').select('*');
 * ```
 */
export function useClerkSupabase() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const { supabase, isLoading: supabaseLoading } = useSupabase();

  return {
    // Clerk auth state
    user,
    isSignedIn,
    isLoaded: authLoaded && userLoaded,

    // Authenticated Supabase client
    supabase,
    isSupabaseReady: !supabaseLoading,

    // Combined loading state
    isReady: authLoaded && userLoaded && !supabaseLoading,
  };
}
