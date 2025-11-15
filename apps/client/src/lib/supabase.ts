import { createClient } from '@supabase/supabase-js';

// SISO-CLIENT-BASE Supabase Configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yeqosbhihojkrgexenzj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcW9zYmhpaG9qa3JnZXhlbnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTkzOTksImV4cCI6MjA3NTA5NTM5OX0.AOYh-XI7yxaUL-bCefYVTYaZk9v-ZApwa93XDT0icfU';

/**
 * Supabase Client for SISO Client Portal
 *
 * Features:
 * - Client authentication and session management
 * - Real-time subscriptions for client updates
 * - Client data isolation and security
 * - MCP integration for AI-assisted operations
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Client portal specific auth settings
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'siso-client-auth',
    flowType: 'pkce', // Enhanced security for client portal
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  global: {
    headers: {
      'X-Client-Portal': 'SISO-CLIENT-BASE',
    },
  },
});

/**
 * Client-specific Supabase helpers
 */
export const clientQueries = {
  /**
   * Get current authenticated client
   */
  async getCurrentClient() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get client projects with proper isolation
   */
  async getClientProjects(clientId: string) {
    const { data, error } = await supabase
      .from('client_projects')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to client-specific real-time updates
   */
  subscribeToClientUpdates(clientId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`client:${clientId}`)
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          filter: `client_id=eq.${clientId}`
        },
        callback
      )
      .subscribe();
  },
};

export type { Database } from '../types/database';
export default supabase;