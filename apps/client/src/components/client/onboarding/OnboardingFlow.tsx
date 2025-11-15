import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeSelector } from './ModeSelector';
import { VoiceOnboarding } from './VoiceOnboarding';
import { EnhancedChat } from './EnhancedChat';
import { ProgressTracker } from './ProgressTracker';
import { OnboardingProvider } from './OnboardingProvider';
import { useOnboardingSession } from '@/hooks/useOnboardingSession';
import { Card } from '@/components/ui/card';

export type OnboardingMode = 'chat' | 'voice' | null;

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
  onSkip?: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [mode, setMode] = useState<OnboardingMode>(null);
  const { session, resumeSession } = useOnboardingSession();

  useEffect(() => {
    // Check for existing session
    const checkExistingSession = async () => {
      const resumed = await resumeSession();
      if (resumed) {
        setMode(resumed.session_type as OnboardingMode);
      }
    };
    checkExistingSession();
  }, [resumeSession]);

  const handleModeSelect = (selectedMode: OnboardingMode) => {
    setMode(selectedMode);
  };

  const handleBack = () => {
    setMode(null);
  };

  return (
    <OnboardingProvider>
      <Card className="w-full max-w-4xl mx-auto p-6 bg-siso-bg/95 backdrop-blur border-siso-border">
        <AnimatePresence mode="wait">
          {!mode ? (
            <motion.div
              key="mode-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ModeSelector onSelect={handleModeSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="onboarding-content"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ProgressTracker mode={mode} onBack={handleBack} />
              
              {mode === 'voice' ? (
                <VoiceOnboarding onComplete={onComplete} />
              ) : (
                <EnhancedChat onComplete={onComplete} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </OnboardingProvider>
  );
}