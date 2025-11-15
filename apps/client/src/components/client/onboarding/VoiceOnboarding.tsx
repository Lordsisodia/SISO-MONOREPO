import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, MicOff, Volume2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useOnboardingContext } from './OnboardingProvider';
import { useToast } from '@/hooks/use-toast';

interface VoiceOnboardingProps {
  onComplete: (data: any) => void;
}

interface TranscriptSegment {
  speaker: 'AI' | 'User';
  text: string;
  timestamp: number;
}

export function VoiceOnboarding({ onComplete }: VoiceOnboardingProps) {
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'processing' | 'complete'>('idle');
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [extractedData, setExtractedData] = useState<any>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const { updateFormData, autoSave } = useOnboardingContext();
  const { toast } = useToast();

  // Simulate AI conversation flow
  const aiQuestions = [
    "Hi! I'm your AI assistant. What's the name of your business?",
    "Great! What type of business do you run?",
    "That sounds interesting! Can you tell me more about what you do?",
    "What are your main goals for the new website or app?",
    "Do you have any design preferences or brands you admire?",
    "What's your timeline for this project?",
    "And finally, what's your budget range?",
  ];

  const startCall = async () => {
    setCallStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setCallStatus('active');
      // Start with first AI question
      addTranscriptSegment('AI', aiQuestions[0]);
    }, 2000);
  };

  const addTranscriptSegment = (speaker: 'AI' | 'User', text: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text,
      timestamp: Date.now()
    }]);
  };

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // Update call duration
  useEffect(() => {
    if (callStatus === 'active') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [callStatus]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = async () => {
    setCallStatus('processing');
    
    // Simulate AI processing
    setTimeout(() => {
      const mockExtractedData = {
        company: 'Sample Business',
        industry: 'Technology',
        description: 'We provide innovative tech solutions',
        goals: 'Increase online presence and customer engagement',
        designPreferences: 'Modern, clean, professional',
        timeline: '2-3 months',
        budget: '$10,000 - $25,000'
      };
      
      setExtractedData(mockExtractedData);
      updateFormData(mockExtractedData);
      setCallStatus('complete');
      autoSave();
      
      toast({
        title: "Call Complete!",
        description: "Your information has been captured successfully.",
      });
    }, 3000);
  };

  const confirmAndContinue = () => {
    if (extractedData) {
      onComplete(extractedData);
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {callStatus === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Ready for Your 2-Minute Call?</h3>
              <p className="text-muted-foreground">
                Our AI assistant will guide you through a quick conversation to understand your needs
              </p>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Phone className="h-12 w-12 text-primary animate-pulse" />
                <div className="text-left">
                  <p className="font-semibold">AI Assistant Ready</p>
                  <p className="text-sm text-muted-foreground">Click to start your call</p>
                </div>
              </div>
              
              <Button
                size="lg"
                className="w-full"
                onClick={startCall}
              >
                <Phone className="mr-2 h-5 w-5" />
                Start Voice Call
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium">No typing needed</p>
              </div>
              <div className="text-center">
                <Volume2 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="font-medium">Clear audio quality</p>
              </div>
              <div className="text-center">
                <Mic className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="font-medium">AI transcription</p>
              </div>
            </div>
          </motion.div>
        )}

        {callStatus === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <p className="text-lg">Connecting to AI assistant...</p>
          </motion.div>
        )}

        {callStatus === 'active' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Phone className="h-8 w-8 text-green-500" />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <p className="font-semibold">AI Assistant</p>
                    <p className="text-sm text-green-500">Call Active</p>
                  </div>
                </div>
                <div className="text-2xl font-mono">
                  {formatDuration(callDuration)} / 2:00
                </div>
              </div>

              <Progress value={(callDuration / 120) * 100} className="mb-6" />

              <div
                ref={transcriptRef}
                className="bg-muted/50 rounded-lg p-4 h-64 overflow-y-auto space-y-3 mb-6"
              >
                {transcript.map((segment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: segment.speaker === 'AI' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${segment.speaker === 'User' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      segment.speaker === 'AI' 
                        ? 'bg-primary/20 text-primary-foreground' 
                        : 'bg-background border'
                    }`}>
                      <p className="text-xs font-medium mb-1">
                        {segment.speaker === 'AI' ? '🤖 AI' : '👤 You'}
                      </p>
                      <p className="text-sm">{segment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant="destructive"
                  onClick={endCall}
                >
                  End Call
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {callStatus === 'processing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-4"
          >
            <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">Processing your conversation...</p>
              <p className="text-sm text-muted-foreground">
                Our AI is extracting your business information
              </p>
            </div>
          </motion.div>
        )}

        {callStatus === 'complete' && extractedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="text-2xl font-bold">Call Complete!</h3>
              <p className="text-muted-foreground">
                Here's what we captured from your conversation
              </p>
            </div>

            <Card className="p-6 space-y-4">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="flex justify-between items-start">
                  <span className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <span className="text-muted-foreground text-right max-w-[60%]">
                    {value as string}
                  </span>
                </div>
              ))}
            </Card>

            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCallStatus('idle');
                  setTranscript([]);
                  setCallDuration(0);
                }}
              >
                Start Over
              </Button>
              <Button onClick={confirmAndContinue}>
                Looks Good, Continue
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}