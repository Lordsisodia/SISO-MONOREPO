import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingSession {
  id: string;
  user_id: string;
  session_type: 'chat' | 'voice';
  current_step: number;
  total_steps: number;
  progress_data: any;
  voice_call_data?: any;
  auto_save_data?: any;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export function useOnboardingSession() {
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createSession = useCallback(async (type: 'chat' | 'voice') => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('onboarding_sessions')
        .insert({
          user_id: user.id,
          session_type: type,
          current_step: 0,
          total_steps: 5,
          progress_data: {},
          auto_save_data: {},
        })
        .select()
        .single();

      if (error) throw error;
      
      setSession(data);
      return data;
    } catch (error) {
      console.error('Failed to create session:', error);
      toast({
        title: "Error",
        description: "Failed to create onboarding session",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateSession = useCallback(async (updates: Partial<OnboardingSession>) => {
    if (!session) return;

    try {
      const { error } = await supabase
        .from('onboarding_sessions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (error) throw error;

      setSession(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Failed to update session:', error);
    }
  }, [session]);

  const resumeSession = useCallback(async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      // Get the most recent incomplete session
      const { data, error } = await supabase
        .from('onboarding_sessions')
        .select('*')
        .eq('user_id', user.id)
        .is('completed_at', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) return null;

      setSession(data);
      
      toast({
        title: "Welcome back!",
        description: "We've restored your previous progress.",
      });

      return data;
    } catch (error) {
      console.error('Failed to resume session:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const completeSession = useCallback(async () => {
    if (!session) return;

    try {
      const { error } = await supabase
        .from('onboarding_sessions')
        .update({
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (error) throw error;

      toast({
        title: "Onboarding complete!",
        description: "Your information has been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to complete session:', error);
    }
  }, [session, toast]);

  return {
    session,
    loading,
    createSession,
    updateSession,
    resumeSession,
    completeSession
  };
}