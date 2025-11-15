/**
 * Voice Onboarding CTA Component
 * Prominent call-to-action for voice-based quick setup
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { Mic, Clock, Sparkles } from 'lucide-react';

export function VoiceOnboardingCTA() {
  const navigate = useNavigate();
  const { clientData } = useClientDetails();

  // Don't show if voice onboarding is already completed
  if (clientData?.voice_onboarding_complete) {
    return null;
  }

  // Don't show if project is already well underway
  const currentStep = clientData?.current_step || 0;
  if (currentStep > 10) {
    return null;
  }

  const handleStartVoiceChat = () => {
    navigate('/client/dashboard/quick-setup?mode=voice');
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
                <span>Quick Voice Setup (Optional)</span>
                <Badge variant="outline" className="text-xs border-purple-400/30 text-purple-400">
                  2 min
                </Badge>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Tell us about your business in a quick voice chat
              </p>
            </div>
          </div>
          
          <Button 
            size="sm"
            variant="outline"
            className="border-purple-400/30 text-purple-400 hover:bg-purple-400/10 hover:text-purple-300"
            onClick={handleStartVoiceChat}
          >
            <Mic className="mr-1.5 h-3 w-3" />
            Start Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}