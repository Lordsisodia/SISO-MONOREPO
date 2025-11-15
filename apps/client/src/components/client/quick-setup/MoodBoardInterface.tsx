import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles, Palette, CheckCircle, Image, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuickSetup } from './QuickSetupProvider';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface MoodBoardInterfaceProps {
  industry: string;
  onComplete: (data: any) => void;
  onSkip: () => void;
}

interface DesignImage {
  id: string;
  url: string;
  category: string;
  tags: string[];
  style: string;
}

export function MoodBoardInterface({ industry, onComplete, onSkip }: MoodBoardInterfaceProps) {
  const { setMoodBoardData } = useQuickSetup();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Array<{
    imageId: string;
    preference: 'like' | 'dislike';
    category: string;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Sample design images for quick setup
  const designImages: DesignImage[] = [
    {
      id: 'modern-1',
      url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
      category: 'Modern Minimal',
      tags: ['clean', 'minimal', 'white space', 'modern'],
      style: 'Modern & Clean'
    },
    {
      id: 'bold-1',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
      category: 'Bold Creative',
      tags: ['colorful', 'bold', 'creative', 'dynamic'],
      style: 'Creative & Bold'
    },
    {
      id: 'elegant-1',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      category: 'Elegant Classic',
      tags: ['elegant', 'sophisticated', 'classic', 'luxury'],
      style: 'Traditional & Elegant'
    },
    {
      id: 'tech-1',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
      category: 'Tech Modern',
      tags: ['tech', 'futuristic', 'innovative', 'digital'],
      style: 'Tech & Innovative'
    },
    {
      id: 'playful-1',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      category: 'Playful Fun',
      tags: ['playful', 'fun', 'vibrant', 'energetic'],
      style: 'Playful & Fun'
    },
    {
      id: 'nature-1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      category: 'Natural Organic',
      tags: ['natural', 'organic', 'earthy', 'sustainable'],
      style: 'Natural & Organic'
    },
    {
      id: 'dark-1',
      url: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800',
      category: 'Dark Sophisticated',
      tags: ['dark', 'sophisticated', 'premium', 'mysterious'],
      style: 'Dark & Sophisticated'
    },
    {
      id: 'retro-1',
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800',
      category: 'Retro Vintage',
      tags: ['retro', 'vintage', 'nostalgic', 'classic'],
      style: 'Retro & Vintage'
    }
  ];

  const currentImage = designImages[currentIndex];
  const progress = (currentIndex / designImages.length) * 100;

  const handleSelection = (preference: 'like' | 'dislike') => {
    const newSelection = {
      imageId: currentImage.id,
      preference,
      category: currentImage.category
    };

    setSelections([...selections, newSelection]);

    if (currentIndex < designImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All images rated, process results
      processSelections([...selections, newSelection]);
    }
  };

  const processSelections = async (allSelections: typeof selections) => {
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Analyze selections
    const likedCategories = allSelections
      .filter(s => s.preference === 'like')
      .map(s => s.category);

    const likedImages = allSelections
      .filter(s => s.preference === 'like')
      .map(s => designImages.find(img => img.id === s.imageId))
      .filter(Boolean) as DesignImage[];

    // Extract common style keywords
    const styleKeywords = Array.from(new Set(
      likedImages.flatMap(img => img.tags)
    )).slice(0, 5);

    // Generate color palette based on preferences
    const colorPalettes: Record<string, string[]> = {
      'Modern Minimal': ['#FFFFFF', '#F3F4F6', '#1F2937', '#3B82F6'],
      'Bold Creative': ['#F59E0B', '#EC4899', '#8B5CF6', '#10B981'],
      'Elegant Classic': ['#1F2937', '#D4AF37', '#F9FAFB', '#6B7280'],
      'Tech Modern': ['#3B82F6', '#6366F1', '#8B5CF6', '#1E293B'],
      'Playful Fun': ['#F472B6', '#FBBF24', '#34D399', '#60A5FA'],
      'Natural Organic': ['#10B981', '#84CC16', '#F59E0B', '#92400E'],
      'Dark Sophisticated': ['#0F172A', '#1E293B', '#6366F1', '#DC2626'],
      'Retro Vintage': ['#F87171', '#FBBF24', '#34D399', '#93C5FD']
    };

    const dominantCategory = likedCategories[0] || 'Modern Minimal';
    const colorPalette = colorPalettes[dominantCategory] || colorPalettes['Modern Minimal'];

    const result = {
      selections: allSelections,
      styleKeywords,
      colorPalette,
      dominantStyle: dominantCategory,
      confidence: likedCategories.length > 0 ? 0.85 + (likedCategories.length * 0.02) : 0.5
    };

    setAnalysisResult(result);
    setMoodBoardData(result);
    setIsProcessing(false);
    setShowResults(true);
  };

  const handleComplete = () => {
    if (analysisResult) {
      onComplete(analysisResult);
    }
  };

  if (isProcessing) {
    return (
      <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
        <CardContent className="p-12">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Palette className="h-16 w-16 mx-auto text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Analyzing Your Style Preferences...
              </h3>
              <p className="text-gray-300">
                Creating your personalized design profile
              </p>
            </div>
            <Progress value={75} className="w-64 mx-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults && analysisResult) {
    return (
      <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Design Preferences Captured!
              </h3>
              <Badge variant="outline" className="border-green-500 text-green-400">
                {Math.round(analysisResult.confidence * 100)}% Match Confidence
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <Palette className="h-4 w-4 mr-2 text-purple-400" />
                  Your Color Palette
                </h4>
                <div className="flex space-x-2">
                  {analysisResult.colorPalette.map((color: string, index: number) => (
                    <div
                      key={index}
                      className="w-12 h-12 rounded-lg border border-slate-600"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                  Design Style
                </h4>
                <p className="text-white">{analysisResult.dominantStyle}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {analysisResult.styleKeywords.map((keyword: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Selected Preferences:</h4>
              <div className="grid grid-cols-4 gap-2">
                {analysisResult.selections
                  .filter((s: any) => s.preference === 'like')
                  .map((selection: any, index: number) => {
                    const img = designImages.find(i => i.id === selection.imageId);
                    return img ? (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={img.category}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="absolute bottom-1 left-1 text-xs text-white">
                            {img.style}
                          </span>
                        </div>
                      </div>
                    ) : null;
                  })}
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={handleComplete}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Continue to Complete
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              Quick Style Discovery
            </h3>
            <p className="text-gray-300">
              Swipe through designs to capture your style ({currentIndex + 1}/{designImages.length})
            </p>
            <Progress value={progress} className="w-full max-w-xs mx-auto mt-4" />
          </div>

          {/* Image Display */}
          <div className="relative max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-700"
              >
                <img
                  src={currentImage.url}
                  alt={currentImage.category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {currentImage.style}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentImage.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleSelection('dislike')}
              className="bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30"
            >
              <X className="h-6 w-6 mr-2" />
              Not My Style
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleSelection('like')}
              className="bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30"
            >
              <Heart className="h-6 w-6 mr-2" />
              Love It
            </Button>
          </div>

          {/* Skip Option */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={onSkip}
              className="text-gray-400 hover:text-gray-300"
            >
              Skip design preferences
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}