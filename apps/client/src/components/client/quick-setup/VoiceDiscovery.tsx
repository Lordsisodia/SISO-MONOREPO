import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2, CheckCircle, AlertCircle, Volume2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useQuickSetup } from './QuickSetupProvider';
import { cn } from '@/lib/utils';

interface VoiceDiscoveryProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export function VoiceDiscovery({ onComplete, onSkip }: VoiceDiscoveryProps) {
  const { setVoiceData } = useQuickSetup();
  const [stage, setStage] = useState<'intro' | 'recording' | 'processing' | 'review'>('intro');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // Simulate real-time transcript for demo
  const sampleTranscripts = [
    "Hi, I'm starting a new online boutique selling sustainable fashion...",
    "We focus on eco-friendly materials and ethical manufacturing...",
    "Our target audience is environmentally conscious millennials...",
    "We need an e-commerce platform with inventory management...",
    "I'd like to launch within the next 3 months...",
  ];

  useEffect(() => {
    if (isRecording && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
        
        // Simulate audio level
        setAudioLevel(Math.random() * 100);
        
        // Add transcript segments progressively
        const segmentIndex = Math.floor((120 - timeRemaining) / 24);
        if (segmentIndex < sampleTranscripts.length && !transcript.includes(sampleTranscripts[segmentIndex])) {
          setTranscript(prev => prev + (prev ? ' ' : '') + sampleTranscripts[segmentIndex]);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, timeRemaining, transcript]);

  const startRecording = () => {
    setStage('recording');
    setIsRecording(true);
    setTimeRemaining(120);
    setTranscript('');
    
    // Check for Web Speech API support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join(' ');
        setTranscript(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        // Continue with demo mode
      };
      
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Process the transcript
    processTranscript();
  };

  const processTranscript = async () => {
    setStage('processing');
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI analysis result
    const analysis = {
      businessType: 'Online Boutique - Sustainable Fashion',
      industry: 'E-commerce',
      goals: 'Launch an eco-friendly fashion platform with ethical manufacturing focus',
      challenges: 'Need inventory management, sustainable supplier network, and eco-conscious branding',
      timeline: '3 months',
      competitors: ['Reformation', 'Everlane', 'Patagonia'],
      confidence: 0.92
    };
    
    setAnalysisResult(analysis);
    
    // Save to context
    const voiceData = {
      transcript: transcript || sampleTranscripts.join(' '),
      extractedData: analysis,
      confidence: analysis.confidence
    };
    
    setVoiceData(voiceData);
    setStage('review');
  };

  const handleComplete = () => {
    if (analysisResult) {
      onComplete({
        transcript,
        extractedData: analysisResult,
        confidence: analysisResult.confidence
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
                  >
                    <Mic className="h-12 w-12 text-white" />
                  </motion.div>

                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">
                      2-Minute Voice Discovery
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                      Tell us about your business naturally. Our AI will extract everything needed for your project.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6 max-w-xl mx-auto space-y-4 text-left">
                    <h3 className="font-semibold text-white flex items-center">
                      <Volume2 className="h-5 w-5 mr-2 text-purple-400" />
                      What to talk about:
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Your business and what makes it unique
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Your main goals with this project
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Any challenges you're trying to solve
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Your target audience and competitors
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-400 mr-2">•</span>
                        Your ideal timeline for launch
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      size="lg"
                      onClick={startRecording}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Mic className="mr-2 h-5 w-5" />
                      Start Voice Chat
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onSkip}
                    >
                      Skip to Text Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === 'recording' && (
          <motion.div
            key="recording"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-6"
                    >
                      <Mic className="h-16 w-16 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">
                      {isRecording ? 'Recording...' : 'Recording Paused'}
                    </h3>
                    <p className="text-gray-300">
                      Time remaining: {formatTime(timeRemaining)}
                    </p>
                  </div>

                  {/* Audio Level Visualizer */}
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: isRecording && i < (audioLevel / 5) ? 
                              `${20 + Math.random() * 30}px` : '8px' 
                          }}
                          transition={{ duration: 0.1 }}
                          className="w-2 bg-gradient-to-t from-purple-600 to-blue-600 rounded-full"
                          style={{ height: '8px' }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Live Transcript */}
                  <div className="bg-slate-800/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Live Transcript:</h4>
                    <p className="text-white text-sm leading-relaxed">
                      {transcript || 'Start speaking to see your words appear here...'}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      size="lg"
                      variant={isRecording ? "destructive" : "default"}
                      onClick={() => isRecording ? stopRecording() : startRecording()}
                      className={cn(
                        "min-w-[200px]",
                        !isRecording && "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      )}
                    >
                      {isRecording ? (
                        <>
                          <MicOff className="mr-2 h-5 w-5" />
                          Stop Recording
                        </>
                      ) : (
                        <>
                          <Mic className="mr-2 h-5 w-5" />
                          Resume Recording
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={stopRecording}
                      disabled={!transcript}
                    >
                      Finish Early
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="p-12">
                <div className="text-center space-y-6">
                  <Loader2 className="h-16 w-16 animate-spin mx-auto text-purple-400" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Analyzing Your Voice...
                    </h3>
                    <p className="text-gray-300">
                      Our AI is extracting key insights from your description
                    </p>
                  </div>
                  <Progress value={66} className="w-64 mx-auto" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {stage === 'review' && analysisResult && (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Voice Analysis Complete!
                    </h3>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      {Math.round(analysisResult.confidence * 100)}% Confidence
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-3">What we learned:</h4>
                      <dl className="space-y-2">
                        <div>
                          <dt className="text-sm text-gray-400">Business Type</dt>
                          <dd className="text-white">{analysisResult.businessType}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Industry</dt>
                          <dd className="text-white">{analysisResult.industry}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Main Goals</dt>
                          <dd className="text-white">{analysisResult.goals}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-400">Timeline</dt>
                          <dd className="text-white">{analysisResult.timeline}</dd>
                        </div>
                      </dl>
                    </div>

                    {analysisResult.competitors && analysisResult.competitors.length > 0 && (
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">Identified Competitors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.competitors.map((competitor: string, index: number) => (
                            <Badge key={index} variant="secondary">
                              {competitor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button
                      size="lg"
                      onClick={handleComplete}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      Continue to Design Preferences
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={startRecording}
                    >
                      Record Again
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}