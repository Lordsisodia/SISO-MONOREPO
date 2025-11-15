import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MoodBoardProvider } from './MoodBoardProvider';
import { MoodBoardSwiper } from './MoodBoardSwiper';
import { MoodBoardGrid } from './MoodBoardGrid';
import { CompetitorImporter } from './CompetitorImporter';
import { DesignAnalyzer } from './DesignAnalyzer';
import { PreferenceReport } from './PreferenceReport';
import { 
  Smartphone, 
  Monitor, 
  Globe, 
  Brain, 
  FileText,
  ChevronRight,
  Save,
  RefreshCw
} from 'lucide-react';
import { useMoodBoard } from './MoodBoardProvider';
import { Progress } from '@/components/ui/progress';

interface MoodBoardGeneratorProps {
  onComplete?: (preferences: any) => void;
  clientId?: string;
  projectId?: string;
}

// Inner component that uses the mood board context
function MoodBoardContent({ onComplete }: MoodBoardGeneratorProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState('swipe');
  const { 
    progress, 
    selections, 
    preferences,
    saveProgress,
    resetMoodBoard,
    generateReport
  } = useMoodBoard();

  // Switch to appropriate view based on device
  useEffect(() => {
    if (isMobile && activeTab === 'grid') {
      setActiveTab('swipe');
    } else if (!isMobile && activeTab === 'swipe') {
      setActiveTab('grid');
    }
  }, [isMobile]);

  // Auto-save progress
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (selections.length > 0) {
        saveProgress();
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(saveInterval);
  }, [selections, saveProgress]);

  const handleComplete = async () => {
    const report = await generateReport();
    if (report && onComplete) {
      onComplete(report);
    }
  };

  const tabs = [
    { 
      value: 'swipe', 
      label: 'Swipe', 
      icon: Smartphone,
      mobileOnly: true 
    },
    { 
      value: 'grid', 
      label: 'Grid View', 
      icon: Monitor,
      desktopOnly: true 
    },
    { 
      value: 'competitors', 
      label: 'Competitors', 
      icon: Globe 
    },
    { 
      value: 'analysis', 
      label: 'AI Analysis', 
      icon: Brain,
      disabled: selections.length < 5
    },
    { 
      value: 'report', 
      label: 'Report', 
      icon: FileText,
      disabled: !preferences
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Design Preference Discovery</h1>
        <p className="text-muted-foreground">
          Help us understand your design style to create the perfect look for your brand
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Overall Progress</span>
            {selections.length > 0 && (
              <Badge variant="secondary">
                {selections.length} selections made
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={saveProgress}
              disabled={selections.length === 0}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetMoodBoard}
              disabled={selections.length === 0}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          Complete the mood board to unlock AI analysis and design recommendations
        </p>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          {tabs.map((tab) => {
            // Hide mobile/desktop specific tabs based on screen size
            if (tab.mobileOnly && !isMobile) return null;
            if (tab.desktopOnly && isMobile) return null;

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                disabled={tab.disabled}
                className="flex items-center space-x-1"
              >
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <AnimatePresence mode="wait">
          <TabsContent value="swipe" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MoodBoardSwiper />
            </motion.div>
          </TabsContent>

          <TabsContent value="grid" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MoodBoardGrid />
            </motion.div>
          </TabsContent>

          <TabsContent value="competitors" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CompetitorImporter />
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DesignAnalyzer />
            </motion.div>
          </TabsContent>

          <TabsContent value="report" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PreferenceReport />
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>

      {/* Complete Button */}
      {preferences && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleComplete}
            className="min-w-[200px]"
          >
            Continue to Next Step
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}

// Main component that provides the context
export function MoodBoardGenerator(props: MoodBoardGeneratorProps) {
  return (
    <MoodBoardProvider>
      <MoodBoardContent {...props} />
    </MoodBoardProvider>
  );
}