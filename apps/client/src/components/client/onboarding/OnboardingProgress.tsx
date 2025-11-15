import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  active: boolean;
}

interface OnboardingProgressProps {
  steps: OnboardingStep[];
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ steps, currentStep, totalSteps }: OnboardingProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-siso-text-muted">Step {currentStep} of {totalSteps}</span>
          <span className="text-siso-text-muted">{Math.round(progressPercentage)}% Complete</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-siso-bg-tertiary">
          <div className="h-full bg-gradient-to-r from-siso-red to-siso-orange rounded-full transition-all duration-500" />
        </Progress>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Step Circle */}
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              step.completed ? 'bg-gradient-to-r from-siso-red to-siso-orange' :
              step.active ? 'bg-siso-bg-tertiary border-2 border-siso-orange' :
              'bg-siso-bg-secondary border border-siso-border'
            }`}>
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Circle className={`w-5 h-5 ${step.active ? 'text-siso-orange' : 'text-siso-text-muted'}`} />
              )}
              
              {/* Active Pulse */}
              {step.active && (
                <div className="absolute inset-0 rounded-full bg-siso-orange/20 animate-ping" />
              )}
            </div>

            {/* Step Label */}
            <div className="mt-2 text-center">
              <p className={`text-xs font-medium ${
                step.active ? 'text-siso-text-primary' : 'text-siso-text-muted'
              }`}>
                {step.title}
              </p>
              {step.active && (
                <p className="text-xs text-siso-text-muted mt-0.5">
                  {step.subtitle}
                </p>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-[calc(50%+20px)] w-full h-0.5 -z-10 ${
                step.completed ? 'bg-gradient-to-r from-siso-red to-siso-orange' : 'bg-siso-border'
              }`} />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}