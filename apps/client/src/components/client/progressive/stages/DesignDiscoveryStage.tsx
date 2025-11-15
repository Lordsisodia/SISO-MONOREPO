/**
 * Design Discovery Stage - Stage 2 of Progressive Unlock System
 * Style preferences, mood boards, and brand direction
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Palette, 
  Image, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target,
  Heart,
  Brush,
  Lightbulb,
  Star
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface DesignDiscoveryStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

interface StyleOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  tags: string[];
}

export function DesignDiscoveryStage({ onComplete, onNext }: DesignDiscoveryStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [brandDirection, setBrandDirection] = React.useState<string>('');

  const styleOptions: StyleOption[] = [
    {
      id: 'modern',
      name: 'Modern & Clean',
      description: 'Minimalist design with clean lines and lots of white space',
      preview: '🏢',
      tags: ['Professional', 'Minimalist', 'Corporate']
    },
    {
      id: 'creative',
      name: 'Creative & Bold',
      description: 'Vibrant colors and creative layouts that stand out',
      preview: '🎨',
      tags: ['Artistic', 'Unique', 'Eye-catching']
    },
    {
      id: 'traditional',
      name: 'Traditional & Elegant',
      description: 'Classic design with sophisticated typography',
      preview: '📜',
      tags: ['Classic', 'Sophisticated', 'Timeless']
    },
    {
      id: 'tech',
      name: 'Tech & Innovative',
      description: 'Cutting-edge design with modern animations',
      preview: '💻',
      tags: ['Modern', 'Tech-savvy', 'Interactive']
    }
  ];

  const colorPalettes = [
    { id: 'blue', name: 'Professional Blue', colors: ['#3B82F6', '#1E40AF', '#60A5FA'], category: 'Professional' },
    { id: 'green', name: 'Nature Green', colors: ['#10B981', '#059669', '#34D399'], category: 'Organic' },
    { id: 'purple', name: 'Creative Purple', colors: ['#8B5CF6', '#7C3AED', '#A78BFA'], category: 'Creative' },
    { id: 'orange', name: 'Energetic Orange', colors: ['#F59E0B', '#D97706', '#FBBF24'], category: 'Energetic' },
    { id: 'red', name: 'Bold Red', colors: ['#EF4444', '#DC2626', '#F87171'], category: 'Bold' },
    { id: 'neutral', name: 'Elegant Neutral', colors: ['#6B7280', '#4B5563', '#9CA3AF'], category: 'Sophisticated' }
  ];

  const requiredActions = [
    {
      id: 'style_preferences_selected',
      title: 'Choose Design Style',
      description: 'Select 1-2 design styles that resonate with your brand',
      icon: Brush,
      completed: selectedStyles.length > 0
    },
    {
      id: 'color_palette_selected',
      title: 'Pick Color Palette',
      description: 'Choose colors that represent your brand personality',
      icon: Palette,
      completed: selectedColors.length > 0
    },
    {
      id: 'brand_direction_defined',
      title: 'Define Brand Direction',
      description: 'Describe your brand personality and goals',
      icon: Lightbulb,
      completed: brandDirection.trim().length > 20
    }
  ];

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev => {
      if (prev.includes(styleId)) {
        return prev.filter(id => id !== styleId);
      }
      return prev.length < 2 ? [...prev, styleId] : [prev[1], styleId];
    });
  };

  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev => {
      if (prev.includes(colorId)) {
        return prev.filter(id => id !== colorId);
      }
      return prev.length < 2 ? [...prev, colorId] : [prev[1], colorId];
    });
  };

  const handleActionComplete = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      const newCompleted = [...completedActions, actionId];
      setCompletedActions(newCompleted);
      
      // Check if all actions are completed
      if (newCompleted.length === requiredActions.length) {
        onComplete?.();
      }
    }
  };

  // Auto-complete actions based on selections
  React.useEffect(() => {
    const currentCompleted = requiredActions.filter(action => action.completed).map(action => action.id);
    setCompletedActions(currentCompleted);
    
    // Auto-complete stage if all requirements are met
    if (currentCompleted.length === requiredActions.length && currentCompleted.length > 0) {
      onComplete?.();
    }
  }, [selectedStyles, selectedColors, brandDirection, onComplete]);

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-700 rounded-lg"></div>
          <div className="h-64 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Shape Your Vision
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Define your design preferences and brand direction
          </p>
        </div>
        <Badge variant="outline" className="border-purple-500 text-purple-400">
          Stage 2: Design Discovery
        </Badge>
      </div>

      {/* Progress Section */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span>Design Discovery Progress</span>
          </CardTitle>
          <CardDescription>
            Complete these steps to define your project's visual direction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Progress</span>
                <span>{completedActions.length} of {requiredActions.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {progressPercentage === 100 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Design discovery completed!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  Your design preferences have been captured. Ready for Project Roadmap.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Style Selection */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brush className="w-5 h-5 text-purple-400" />
              <span>Design Style Preferences</span>
            </CardTitle>
            <CardDescription>
              Choose 1-2 styles that match your vision (selected: {selectedStyles.length}/2)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {styleOptions.map((style) => {
                const isSelected = selectedStyles.includes(style.id);
                
                return (
                  <Card 
                    key={style.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                      isSelected ? "border-purple-500 bg-purple-500/10" : "border-slate-600 hover:border-slate-500"
                    )}
                    onClick={() => handleStyleToggle(style.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{style.preview}</div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{style.name}</div>
                          <div className="text-sm text-gray-400">{style.description}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {style.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Color Palette Selection */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>Color Palette</span>
            </CardTitle>
            <CardDescription>
              Select colors that represent your brand (selected: {selectedColors.length}/2)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {colorPalettes.map((palette) => {
                const isSelected = selectedColors.includes(palette.id);
                
                return (
                  <Card 
                    key={palette.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                      isSelected ? "border-purple-500 bg-purple-500/10" : "border-slate-600 hover:border-slate-500"
                    )}
                    onClick={() => handleColorToggle(palette.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          {palette.colors.map((color, i) => (
                            <div 
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">{palette.name}</div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {palette.category}
                          </Badge>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Mood Board */}
      <Card className="border-slate-700 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-purple-400" />
            <span>Advanced Mood Board Discovery</span>
            <Badge variant="default" className="bg-purple-500 text-white">New</Badge>
          </CardTitle>
          <CardDescription>
            Use our AI-powered mood board to capture your exact design vision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <p className="text-sm text-gray-300">
                Swipe through curated design samples to train our AI on your preferences
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-400" />
              <p className="text-sm text-gray-300">
                Import competitor websites for comparison and inspiration
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-400" />
              <p className="text-sm text-gray-300">
                Get AI-generated design recommendations tailored to your industry
              </p>
            </div>
          </div>
          <Button 
            variant="default"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            onClick={() => window.location.href = '/client/dashboard/mood-board'}
          >
            <Palette className="mr-2 h-5 w-5" />
            Launch Interactive Mood Board
          </Button>
        </CardContent>
      </Card>

      {/* Brand Direction */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            <span>Brand Direction & Personality</span>
          </CardTitle>
          <CardDescription>
            Describe your brand's personality, goals, and target audience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={brandDirection}
            onChange={(e) => setBrandDirection(e.target.value)}
            placeholder="Tell us about your brand... What makes it unique? What's your target audience? What feeling should your website convey? (minimum 20 characters)"
            className="w-full h-32 px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>{brandDirection.length} characters</span>
            <span className={cn(
              "font-medium",
              brandDirection.length >= 20 ? "text-green-400" : "text-gray-400"
            )}>
              {brandDirection.length >= 20 ? "✓ Complete" : "Minimum 20 characters"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Requirements Checklist</span>
          </CardTitle>
          <CardDescription>
            Track your progress through design discovery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredActions.map((action) => {
              const Icon = action.icon;
              const isCompleted = action.completed;
              
              return (
                <div 
                  key={action.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                    isCompleted ? "bg-green-500/10 border border-green-500/30" : "bg-slate-700"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isCompleted ? "bg-green-500" : "bg-slate-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Icon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      isCompleted ? "text-green-400" : "text-white"
                    )}>
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-400">{action.description}</div>
                  </div>
                  {isCompleted && (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Complete
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Stage 2 of 6 • Design Discovery
        </div>
        <Button 
          onClick={onNext}
          disabled={progressPercentage < 100}
          className="flex items-center space-x-2"
        >
          <span>Continue to Project Roadmap</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}