import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingMode } from './OnboardingFlow';

interface ModeSelectorProps {
  onSelect: (mode: OnboardingMode) => void;
}

export function ModeSelector({ onSelect }: ModeSelectorProps) {
  return (
    <div className="text-center space-y-8">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
          Let's Get Started
        </h2>
        <p className="mt-2 text-siso-text-muted">
          Choose how you'd like to share your vision
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full h-auto p-8 flex flex-col items-center space-y-4 border-2 border-siso-border hover:border-siso-orange/50 transition-all bg-siso-bg-secondary"
            onClick={() => onSelect('chat')}
          >
            <div className="relative">
              <MessageSquare className="h-12 w-12 text-siso-orange" />
              <Sparkles className="h-5 w-5 text-siso-red absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-siso-text-bold">💬 Chat</h3>
              <p className="text-sm text-siso-text-muted">
                Interactive chat with AI assistance
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-siso-text-muted">
                <Clock className="h-3 w-3" />
                <span>5-10 minutes</span>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-left w-full">
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>Type at your own pace</span>
              </p>
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>Review & edit answers</span>
              </p>
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>Auto-saves progress</span>
              </p>
            </div>
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="outline"
            className="w-full h-auto p-8 flex flex-col items-center space-y-4 border-2 border-siso-border hover:border-siso-orange/50 transition-all relative overflow-hidden bg-siso-bg-secondary"
            onClick={() => onSelect('voice')}
          >
            <div className="absolute -top-2 -right-2 bg-siso-orange text-white text-xs px-2 py-1 rounded-bl-lg font-semibold">
              FASTEST
            </div>
            <div className="relative">
              <Phone className="h-12 w-12 text-siso-orange" />
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-siso-text-bold">📞 Voice Call</h3>
              <p className="text-sm text-siso-text-muted">
                Quick AI-powered conversation
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-siso-text-muted">
                <Clock className="h-3 w-3" />
                <span>2 minutes</span>
              </div>
            </div>
            <div className="mt-4 space-y-1 text-xs text-left w-full">
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>Just talk naturally</span>
              </p>
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>AI transcribes everything</span>
              </p>
              <p className="flex items-center space-x-1">
                <span className="text-green-500">✓</span>
                <span>71% of users prefer this</span>
              </p>
            </div>
          </Button>
        </motion.div>
      </div>

      <p className="text-sm text-siso-text-muted">
        Don't worry - you can switch methods anytime during onboarding
      </p>
    </div>
  );
}