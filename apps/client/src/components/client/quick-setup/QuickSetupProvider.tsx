import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuthSession } from '@/hooks/useAuthSession';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VoiceData {
  transcript: string;
  extractedData: {
    businessType: string;
    industry: string;
    goals: string;
    challenges: string;
    timeline: string;
  };
  confidence: number;
}

interface MoodBoardData {
  selections: Array<{
    imageId: string;
    preference: 'like' | 'dislike';
    category: string;
  }>;
  styleKeywords: string[];
  colorPalette: string[];
  confidence: number;
}

interface QuickSetupContextType {
  currentStep: 'intro' | 'voice' | 'mood-board' | 'complete';
  setCurrentStep: (step: 'intro' | 'voice' | 'mood-board' | 'complete') => void;
  voiceData: VoiceData | null;
  setVoiceData: (data: VoiceData) => void;
  moodBoardData: MoodBoardData | null;
  setMoodBoardData: (data: MoodBoardData) => void;
  progress: number;
  saveSetupData: () => Promise<any>;
  isLoading: boolean;
}

const QuickSetupContext = createContext<QuickSetupContextType | undefined>(undefined);

export function QuickSetupProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthSession();
  const [currentStep, setCurrentStep] = useState<'intro' | 'voice' | 'mood-board' | 'complete'>('intro');
  const [voiceData, setVoiceData] = useState<VoiceData | null>(null);
  const [moodBoardData, setMoodBoardData] = useState<MoodBoardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate progress based on completed steps
  const progress = (() => {
    switch (currentStep) {
      case 'intro': return 0;
      case 'voice': return 33;
      case 'mood-board': return 66;
      case 'complete': return 100;
      default: return 0;
    }
  })();

  const saveSetupData = useCallback(async () => {
    if (!user?.id) {
      toast.error('Please log in to save your setup');
      return null;
    }

    setIsLoading(true);
    try {
      // Save or update client onboarding data
      const { data: existingData, error: fetchError } = await supabase
        .from('client_onboarding')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const onboardingData = {
        user_id: user.id,
        voice_onboarding_data: voiceData ? {
          transcript: voiceData.transcript,
          extractedData: voiceData.extractedData,
          confidence: voiceData.confidence
        } : null,
        voice_transcript: voiceData?.transcript || null,
        voice_analysis_confidence: voiceData?.confidence || null,
        design_preferences_data: moodBoardData ? {
          selections: moodBoardData.selections,
          styleKeywords: moodBoardData.styleKeywords,
          colorPalette: moodBoardData.colorPalette,
          confidence: moodBoardData.confidence
        } : null,
        voice_onboarding_complete: !!voiceData,
        design_preferences_complete: !!moodBoardData,
        company: voiceData?.extractedData.businessType || 'Not specified',
        industry: voiceData?.extractedData.industry || 'General Business',
        description: voiceData?.extractedData.goals || 'Not specified',
        updated_at: new Date().toISOString()
      };

      let clientId: string;

      if (existingData && !fetchError) {
        // Update existing record
        const { data: updateData, error: updateError } = await supabase
          .from('client_onboarding')
          .update(onboardingData)
          .eq('id', existingData.id)
          .select()
          .single();

        if (updateError) throw updateError;
        clientId = existingData.id;
      } else {
        // Insert new record
        const { data: insertData, error: insertError } = await supabase
          .from('client_onboarding')
          .insert(onboardingData)
          .select()
          .single();

        if (insertError) throw insertError;
        clientId = insertData.id;
      }

      // Save mood board selections if available
      if (moodBoardData && clientId) {
        // Delete existing selections
        await supabase
          .from('mood_board_selections')
          .delete()
          .eq('client_id', clientId);

        // Insert new selections
        const selectionsToInsert = moodBoardData.selections.map(selection => ({
          client_id: clientId,
          image_id: selection.imageId,
          preference: selection.preference,
          category: selection.category
        }));

        if (selectionsToInsert.length > 0) {
          await supabase
            .from('mood_board_selections')
            .insert(selectionsToInsert);
        }

        // Save design preferences analysis
        await supabase
          .from('design_preferences')
          .upsert({
            client_id: clientId,
            color_scheme: { colors: moodBoardData.colorPalette },
            design_style: moodBoardData.styleKeywords[0] || 'Modern',
            visual_elements: moodBoardData.styleKeywords,
            ai_confidence: moodBoardData.confidence
          }, {
            onConflict: 'client_id'
          });
      }

      toast.success('Setup completed successfully!');
      return { clientId, voiceData, moodBoardData };
    } catch (error) {
      console.error('Error saving setup data:', error);
      toast.error('Failed to save setup data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, voiceData, moodBoardData]);

  const value = {
    currentStep,
    setCurrentStep,
    voiceData,
    setVoiceData,
    moodBoardData,
    setMoodBoardData,
    progress,
    saveSetupData,
    isLoading
  };

  return (
    <QuickSetupContext.Provider value={value}>
      {children}
    </QuickSetupContext.Provider>
  );
}

export function useQuickSetup() {
  const context = useContext(QuickSetupContext);
  if (context === undefined) {
    throw new Error('useQuickSetup must be used within a QuickSetupProvider');
  }
  return context;
}