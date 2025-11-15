import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Circle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useOnboardingContext } from './OnboardingProvider';
import { OnboardingMode } from './OnboardingFlow';

interface ProgressTrackerProps {
  mode: OnboardingMode;
  onBack?: () => void;
}

const steps = [
  { id: 'basic', label: 'Basic Info', icon: '📋' },
  { id: 'business', label: 'Business Details', icon: '🏢' },
  { id: 'goals', label: 'Goals & Objectives', icon: '🎯' },
  { id: 'design', label: 'Design Preferences', icon: '🎨' },
  { id: 'timeline', label: 'Timeline & Budget', icon: '📅' },
];

export function ProgressTracker({ mode, onBack }: ProgressTrackerProps) {
  const { currentStep, completedSteps, timeRemaining, lastAutoSave } = useOnboardingContext();
  
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeSinceAutoSave = () => {
    if (!lastAutoSave) return 'Never';
    const seconds = Math.floor((Date.now() - lastAutoSave) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-siso-orange/10 text-siso-text"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-siso-text-muted">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Est. time: {formatTime(timeRemaining)}</span>
          </div>
          {mode === 'voice' && (
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <span>Voice Active</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-siso-text-bold">
            Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
          </h3>
          <span className="text-sm font-medium text-siso-text">{Math.round(progressPercentage)}%</span>
        </div>
        
        <Progress value={progressPercentage} className="h-2 bg-siso-bg-tertiary" />
        
        <div className="bg-siso-bg-secondary/50 rounded-lg p-4 border border-siso-border">
          <div className="grid grid-cols-5 gap-2">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStepIndex === index;
              const isPending = index > currentStepIndex;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all ${
                    isCurrent ? 'bg-siso-orange/10 ring-2 ring-siso-orange/50' : ''
                  }`}
                >
                  <div className="relative">
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <Circle className="h-6 w-6 text-siso-orange fill-siso-orange/20" />
                      </motion.div>
                    ) : (
                      <Circle className="h-6 w-6 text-siso-text-muted/50" />
                    )}
                    <span className="text-lg absolute -top-2 -right-2">{step.icon}</span>
                  </div>
                  <span className={`text-xs text-center ${
                    isCompleted ? 'text-green-600 font-medium' :
                    isCurrent ? 'text-siso-orange font-medium' :
                    'text-siso-text-muted'
                  }`}>
                    {step.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-siso-text-muted">
          <span>Auto-saved {getTimeSinceAutoSave()}</span>
          <span className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-500 rounded-full" />
            <span>Progress saved automatically</span>
          </span>
        </div>
      </div>
    </div>
  );
}