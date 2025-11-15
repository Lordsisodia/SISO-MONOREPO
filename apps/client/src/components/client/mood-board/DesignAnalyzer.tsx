import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Palette, Type, Layout, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMoodBoard } from './MoodBoardProvider';
import { cn } from '@/lib/utils';

export function DesignAnalyzer() {
  const { 
    preferences, 
    selections, 
    competitorDesigns,
    analyzePreferences, 
    isAnalyzing,
    currentImages 
  } = useMoodBoard();

  const likedCount = selections.filter(s => s.preference === 'like').length;
  const dislikedCount = selections.filter(s => s.preference === 'dislike').length;
  const neutralCount = selections.filter(s => s.preference === 'neutral').length;

  const canAnalyze = selections.length >= 5; // Minimum selections for meaningful analysis

  if (!preferences && !isAnalyzing) {
    return (
      <Card className="p-8 text-center">
        <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">AI Design Analysis</h3>
        <p className="text-muted-foreground mb-6">
          Complete the mood board to generate your personalized design preferences
        </p>
        
        <div className="max-w-md mx-auto space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm">Images reviewed</span>
            <span className="font-medium">{selections.length} / {currentImages.length}</span>
          </div>
          <Progress value={(selections.length / currentImages.length) * 100} />
          
          {selections.length > 0 && (
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{likedCount}</p>
                <p className="text-xs text-muted-foreground">Liked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{neutralCount}</p>
                <p className="text-xs text-muted-foreground">Neutral</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{dislikedCount}</p>
                <p className="text-xs text-muted-foreground">Disliked</p>
              </div>
            </div>
          )}
        </div>

        {canAnalyze && (
          <Button 
            size="lg" 
            className="mt-6"
            onClick={analyzePreferences}
          >
            <Brain className="mr-2 h-5 w-5" />
            Analyze My Preferences
          </Button>
        )}

        {!canAnalyze && (
          <Alert className="mt-6 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Review at least 5 designs to enable AI analysis
            </AlertDescription>
          </Alert>
        )}
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative h-32 w-32 mx-auto mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0"
            >
              <Brain className="h-32 w-32 text-primary" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="h-16 w-16 text-primary/50" />
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Analyzing Your Preferences...</h3>
          <p className="text-muted-foreground mb-4">
            Our AI is examining your selections to create the perfect design brief
          </p>
          
          <div className="max-w-md mx-auto space-y-2 text-left">
            {['Extracting color patterns...', 'Analyzing typography preferences...', 'Identifying layout styles...', 'Generating recommendations...'].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.5 }}
                className="flex items-center space-x-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                </motion.div>
                <span className="text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Card>
    );
  }

  if (!preferences) return null;

  return (
    <div className="space-y-6">
      {/* Confidence Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Analysis Complete</span>
          </h3>
          <Badge variant="secondary" className="text-sm">
            {Math.round(preferences.aiConfidenceScore * 100)}% Confidence
          </Badge>
        </div>
        
        <Alert>
          <TrendingUp className="h-4 w-4" />
          <AlertDescription>
            Based on your selections, we've identified key design patterns that will resonate with your brand vision.
          </AlertDescription>
        </Alert>
      </Card>

      {/* Color Analysis */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Palette className="h-5 w-5 text-primary" />
          <span>Color Preferences</span>
        </h4>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Primary Colors</p>
            <div className="flex space-x-2">
              {preferences.colorPreferences.primary.map((color, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="h-16 w-16 rounded-lg shadow-md mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Secondary Colors</p>
            <div className="flex space-x-2">
              {preferences.colorPreferences.secondary.map((color, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="h-12 w-12 rounded-lg shadow-md mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Accent Colors</p>
            <div className="flex space-x-2">
              {preferences.colorPreferences.accent.map((color, idx) => (
                <div key={idx} className="text-center">
                  <div
                    className="h-10 w-10 rounded-lg shadow-md mb-1"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs font-mono">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Typography Analysis */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Type className="h-5 w-5 text-primary" />
          <span>Typography Preferences</span>
        </h4>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Heading Styles</p>
            <div className="flex flex-wrap gap-2">
              {preferences.typographyPreferences.headingStyles.map((style, idx) => (
                <Badge key={idx} variant="outline">
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Body Text Styles</p>
            <div className="flex flex-wrap gap-2">
              {preferences.typographyPreferences.bodyStyles.map((style, idx) => (
                <Badge key={idx} variant="outline">
                  {style}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Layout & Style */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center space-x-2">
          <Layout className="h-5 w-5 text-primary" />
          <span>Layout & Style Keywords</span>
        </h4>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Preferred Layouts</p>
            <div className="flex flex-wrap gap-2">
              {preferences.layoutPreferences.map((layout, idx) => (
                <Badge key={idx} variant="secondary">
                  {layout}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Style Keywords</p>
            <div className="flex flex-wrap gap-2">
              {preferences.styleKeywords.slice(0, 8).map((keyword, idx) => (
                <Badge key={idx} variant="outline">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Competitor Comparison */}
      {competitorDesigns.length > 0 && (
        <Card className="p-6">
          <h4 className="font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Competitive Advantage</span>
          </h4>
          
          <p className="text-sm text-muted-foreground mb-4">
            Based on {competitorDesigns.length} competitor{competitorDesigns.length > 1 ? 's' : ''} analyzed, 
            your design will stand out by:
          </p>
          
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span className="text-sm">Using more vibrant and engaging color combinations</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span className="text-sm">Implementing modern typography that competitors lack</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">•</span>
              <span className="text-sm">Creating cleaner, more intuitive layouts</span>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}