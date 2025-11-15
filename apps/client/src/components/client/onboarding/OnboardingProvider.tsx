import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingContextType {
  currentStep: string;
  completedSteps: string[];
  formData: any;
  timeRemaining: number;
  lastAutoSave: number | null;
  updateStep: (step: string) => void;
  updateFormData: (data: any) => void;
  markStepComplete: (step: string) => void;
  autoSave: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboardingContext must be used within OnboardingProvider');
  }
  return context;
}

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [currentStep, setCurrentStep] = useState('basic');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [formData, setFormData] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes default
  const [lastAutoSave, setLastAutoSave] = useState<number | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const sessionData = {
        user_id: user.id,
        session_type: 'chat', // Will be dynamic based on actual mode
        current_step: currentStep,
        total_steps: 5,
        progress_data: {
          completedSteps,
          formData,
        },
        auto_save_data: formData,
        updated_at: new Date().toISOString(),
      };

      if (sessionId) {
        await supabase
          .from('onboarding_sessions')
          .update(sessionData)
          .eq('id', sessionId);
      } else {
        const { data, error } = await supabase
          .from('onboarding_sessions')
          .insert(sessionData)
          .select()
          .single();
        
        if (data) {
          setSessionId(data.id);
        }
      }

      setLastAutoSave(Date.now());
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, [currentStep, completedSteps, formData, sessionId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoSave]);

  // Update time remaining
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateStep = (step: string) => {
    setCurrentStep(step);
    // Adjust time based on step
    const stepTimes: Record<string, number> = {
      basic: 60,
      business: 120,
      goals: 90,
      design: 120,
      timeline: 60,
    };
    setTimeRemaining(stepTimes[step] || 60);
  };

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const markStepComplete = (step: string) => {
    setCompletedSteps(prev => [...new Set([...prev, step])]);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        completedSteps,
        formData,
        timeRemaining,
        lastAutoSave,
        updateStep,
        updateFormData,
        markStepComplete,
        autoSave,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}