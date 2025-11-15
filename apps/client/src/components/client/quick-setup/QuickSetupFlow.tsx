import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Mic, Palette, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { VoiceDiscovery } from './VoiceDiscovery';
import { MoodBoardInterface } from './MoodBoardInterface';
import { QuickSetupProvider, useQuickSetup } from './QuickSetupProvider';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export type QuickSetupStep = 'intro' | 'voice' | 'mood-board' | 'complete';

interface QuickSetupFlowProps {
  onComplete?: (data: any) => void;
  onSkip?: () => void;
}

// Inner component that uses the context
function QuickSetupContent({ onComplete, onSkip }: QuickSetupFlowProps) {
  const navigate = useNavigate();
  const { 
    currentStep, 
    setCurrentStep,
    voiceData,
    moodBoardData,
    saveSetupData,
    progress
  } = useQuickSetup();

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleVoiceComplete = (data: any) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('mood-board');
      setIsTransitioning(false);
    }, 500);
  };

  const handleMoodBoardComplete = (data: any) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentStep('complete');
      setIsTransitioning(false);
    }, 500);
  };

  const handleComplete = async () => {
    const setupData = await saveSetupData();
    if (onComplete) {
      onComplete(setupData);
    } else {
      navigate('/client/dashboard');
    }
  };

  const handleSkipVoice = () => {
    setCurrentStep('mood-board');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'voice':
        setCurrentStep('intro');
        break;
      case 'mood-board':
        setCurrentStep('voice');
        break;
      case 'complete':
        setCurrentStep('mood-board');
        break;
    }
  };

  const steps = [
    { id: 'voice', label: 'Voice Discovery', icon: Mic },
    { id: 'mood-board', label: 'Design Preferences', icon: Palette },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const currentStepIndex = currentStep === 'intro' ? -1 : 
                          currentStep === 'voice' ? 0 : 
                          currentStep === 'mood-board' ? 1 : 2;

  return (
    <div className="min-h-screen bg-siso-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={currentStep !== 'intro' ? handleBack : () => navigate(-1)}
              disabled={isTransitioning}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">Quick Setup</span>
            </div>
            
            <div className="w-20" />
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {currentStep !== 'intro' && (
        <div className="fixed top-16 left-0 right-0 bg-background/80 backdrop-blur-sm border-b z-10">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex items-center">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-colors",
                        isActive && "bg-primary text-primary-foreground",
                        isCompleted && "bg-primary/20 text-primary",
                        !isActive && !isCompleted && "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={cn(
                        "ml-2 text-sm font-medium transition-colors",
                        isActive && "text-primary",
                        isCompleted && "text-primary/60",
                        !isActive && !isCompleted && "text-muted-foreground"
                      )}>
                        {step.label}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 mx-4">
                        <Progress 
                          value={isCompleted ? 100 : isActive ? 50 : 0} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-32 pb-8">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-siso-red rounded-full flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-siso-text-bold" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="absolute inset-0"
                    >
                      <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 bg-siso-orange rounded-full" />
                      <div className="absolute top-1/2 right-0 w-2 h-2 bg-siso-red rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>

                <h1 className="text-4xl font-bold mb-4 text-siso-text-bold">
                  Welcome to Quick Setup!
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
                  Set up your project in just 2 minutes with voice discovery and visual preferences
                </p>

                <div className="space-y-4 max-w-md mx-auto text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Voice Discovery</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your business in a 2-minute conversation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Design Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Swipe through designs to capture your style
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Start Building</h3>
                      <p className="text-sm text-muted-foreground">
                        Your AI team begins work immediately
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto"
                    onClick={() => setCurrentStep('voice')}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Already have project details?{' '}
                    <Button
                      variant="link"
                      className="p-0 h-auto"
                      onClick={() => navigate('/onboarding-chat')}
                    >
                      Use text-based setup
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {currentStep === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-2xl mx-auto"
            >
              <VoiceDiscovery 
                onComplete={handleVoiceComplete}
                onSkip={handleSkipVoice}
              />
            </motion.div>
          )}

          {currentStep === 'mood-board' && (
            <motion.div
              key="mood-board"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-4xl mx-auto"
            >
              <MoodBoardInterface
                industry={voiceData?.extractedData?.industry || 'General Business'}
                onComplete={handleMoodBoardComplete}
                onSkip={() => setCurrentStep('complete')}
              />
            </motion.div>
          )}

          {currentStep === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
                >
                  <CheckCircle className="h-20 w-20 text-siso-orange mx-auto mb-6" />
                </motion.div>

                <h2 className="text-3xl font-bold mb-4">Setup Complete!</h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Your AI team is ready to start building your project
                </p>

                <div className="space-y-4 mb-8">
                  {voiceData && (
                    <div className="bg-muted/50 rounded-lg p-4 text-left">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Mic className="h-4 w-4 mr-2 text-primary" />
                        Business Summary
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {voiceData.extractedData?.businessType || 'Your business details have been captured'}
                      </p>
                    </div>
                  )}

                  {moodBoardData && (
                    <div className="bg-muted/50 rounded-lg p-4 text-left">
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Palette className="h-4 w-4 mr-2 text-primary" />
                        Design Preferences
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {moodBoardData.styleKeywords?.join(', ') || 'Your design preferences have been saved'}
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  size="lg"
                  onClick={handleComplete}
                  className="w-full sm:w-auto"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Main component with provider
export function QuickSetupFlow(props: QuickSetupFlowProps) {
  return (
    <QuickSetupProvider>
      <QuickSetupContent {...props} />
    </QuickSetupProvider>
  );
}