import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface DesignImage {
  id: string;
  url: string;
  category: string;
  title: string;
  style: string;
  colors: string[];
  tags: string[];
}

export interface MoodBoardSelection {
  imageId: string;
  preference: 'like' | 'dislike' | 'neutral';
  score: number; // 1-5
  timestamp: Date;
}

export interface CompetitorDesign {
  id: string;
  url: string;
  screenshotUrl: string;
  colorPalette: string[];
  designElements: {
    typography: string[];
    layout: string;
    style: string;
  };
}

export interface DesignPreferences {
  colorPreferences: {
    primary: string[];
    secondary: string[];
    accent: string[];
  };
  typographyPreferences: {
    headingStyles: string[];
    bodyStyles: string[];
  };
  layoutPreferences: string[];
  styleKeywords: string[];
  aiConfidenceScore: number;
}

interface MoodBoardContextType {
  // State
  currentImages: DesignImage[];
  selections: MoodBoardSelection[];
  competitorDesigns: CompetitorDesign[];
  preferences: DesignPreferences | null;
  isAnalyzing: boolean;
  progress: number;
  currentCategory: string;
  
  // Actions
  loadImages: (category?: string) => Promise<void>;
  recordSelection: (imageId: string, preference: 'like' | 'dislike' | 'neutral', score?: number) => void;
  importCompetitor: (url: string) => Promise<void>;
  analyzePreferences: () => Promise<void>;
  generateReport: () => Promise<any>;
  resetMoodBoard: () => void;
  saveProgress: () => Promise<void>;
}

const MoodBoardContext = createContext<MoodBoardContextType | undefined>(undefined);

export function useMoodBoard() {
  const context = useContext(MoodBoardContext);
  if (!context) {
    throw new Error('useMoodBoard must be used within MoodBoardProvider');
  }
  return context;
}

interface MoodBoardProviderProps {
  children: ReactNode;
}

// Sample design images for demonstration
const sampleImages: DesignImage[] = [
  {
    id: '1',
    url: '/images/design-samples/modern-minimal-1.jpg',
    category: 'modern',
    title: 'Modern Minimalist',
    style: 'minimalist',
    colors: ['#FFFFFF', '#000000', '#F0F0F0'],
    tags: ['clean', 'simple', 'professional']
  },
  {
    id: '2',
    url: '/images/design-samples/bold-colorful-1.jpg',
    category: 'bold',
    title: 'Bold & Vibrant',
    style: 'vibrant',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
    tags: ['energetic', 'playful', 'creative']
  },
  {
    id: '3',
    url: '/images/design-samples/corporate-elegant-1.jpg',
    category: 'corporate',
    title: 'Corporate Elegant',
    style: 'professional',
    colors: ['#2C3E50', '#34495E', '#95A5A6'],
    tags: ['formal', 'trustworthy', 'established']
  },
  {
    id: '4',
    url: '/images/design-samples/warm-friendly-1.jpg',
    category: 'warm',
    title: 'Warm & Welcoming',
    style: 'friendly',
    colors: ['#F4A261', '#E76F51', '#2A9D8F'],
    tags: ['approachable', 'comfortable', 'inviting']
  },
  {
    id: '5',
    url: '/images/design-samples/tech-futuristic-1.jpg',
    category: 'tech',
    title: 'Tech & Futuristic',
    style: 'futuristic',
    colors: ['#6C5CE7', '#A29BFE', '#FD79A8'],
    tags: ['innovative', 'modern', 'cutting-edge']
  },
  {
    id: '6',
    url: '/images/design-samples/luxury-premium-1.jpg',
    category: 'luxury',
    title: 'Luxury Premium',
    style: 'premium',
    colors: ['#D4AF37', '#1C1C1C', '#F8F8F8'],
    tags: ['exclusive', 'sophisticated', 'high-end']
  }
];

export function MoodBoardProvider({ children }: MoodBoardProviderProps) {
  const [currentImages, setCurrentImages] = useState<DesignImage[]>(sampleImages);
  const [selections, setSelections] = useState<MoodBoardSelection[]>([]);
  const [competitorDesigns, setCompetitorDesigns] = useState<CompetitorDesign[]>([]);
  const [preferences, setPreferences] = useState<DesignPreferences | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const { toast } = useToast();

  // Calculate progress
  const progress = Math.round((selections.length / currentImages.length) * 100);

  const loadImages = useCallback(async (category?: string) => {
    try {
      // In production, this would fetch from Supabase
      if (category && category !== 'all') {
        setCurrentImages(sampleImages.filter(img => img.category === category));
        setCurrentCategory(category);
      } else {
        setCurrentImages(sampleImages);
        setCurrentCategory('all');
      }
    } catch (error) {
      console.error('Failed to load images:', error);
      toast({
        title: "Error",
        description: "Failed to load design samples",
        variant: "destructive"
      });
    }
  }, [toast]);

  const recordSelection = useCallback((
    imageId: string, 
    preference: 'like' | 'dislike' | 'neutral', 
    score?: number
  ) => {
    const selection: MoodBoardSelection = {
      imageId,
      preference,
      score: score || (preference === 'like' ? 5 : preference === 'dislike' ? 1 : 3),
      timestamp: new Date()
    };

    setSelections(prev => {
      // Replace existing selection for the same image
      const filtered = prev.filter(s => s.imageId !== imageId);
      return [...filtered, selection];
    });
  }, []);

  const importCompetitor = useCallback(async (url: string) => {
    try {
      setIsAnalyzing(true);
      
      // Simulate competitor analysis (in production, this would call an API)
      const mockCompetitor: CompetitorDesign = {
        id: Date.now().toString(),
        url,
        screenshotUrl: `/api/screenshot?url=${encodeURIComponent(url)}`,
        colorPalette: ['#3498DB', '#2ECC71', '#E74C3C', '#F39C12'],
        designElements: {
          typography: ['Helvetica', 'Arial', 'sans-serif'],
          layout: 'Grid-based with sidebar',
          style: 'Modern professional'
        }
      };

      setCompetitorDesigns(prev => [...prev, mockCompetitor]);
      
      toast({
        title: "Competitor Imported",
        description: `Successfully analyzed ${url}`,
      });
    } catch (error) {
      console.error('Failed to import competitor:', error);
      toast({
        title: "Import Failed",
        description: "Could not analyze competitor website",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  const analyzePreferences = useCallback(async () => {
    try {
      setIsAnalyzing(true);
      
      // Simulate AI analysis (in production, this would call Claude API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const likedImages = selections
        .filter(s => s.preference === 'like')
        .map(s => currentImages.find(img => img.id === s.imageId))
        .filter(Boolean) as DesignImage[];

      const analyzedPreferences: DesignPreferences = {
        colorPreferences: {
          primary: ['#3498DB', '#2ECC71'],
          secondary: ['#ECF0F1', '#BDC3C7'],
          accent: ['#E74C3C', '#F39C12']
        },
        typographyPreferences: {
          headingStyles: ['Sans-serif', 'Bold', 'Modern'],
          bodyStyles: ['Sans-serif', 'Regular', 'Clean']
        },
        layoutPreferences: ['Grid-based', 'Minimal spacing', 'Card layouts'],
        styleKeywords: likedImages.flatMap(img => img.tags),
        aiConfidenceScore: 0.87
      };

      setPreferences(analyzedPreferences);
      
      toast({
        title: "Analysis Complete",
        description: "Your design preferences have been analyzed",
      });
    } catch (error) {
      console.error('Failed to analyze preferences:', error);
      toast({
        title: "Analysis Failed",
        description: "Could not analyze your preferences",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [selections, currentImages, toast]);

  const generateReport = useCallback(async () => {
    if (!preferences) {
      toast({
        title: "No Preferences",
        description: "Please complete the mood board first",
        variant: "destructive"
      });
      return null;
    }

    try {
      const report = {
        moodBoardId: Date.now().toString(),
        selections,
        competitorDesigns,
        preferences,
        generatedAt: new Date(),
        summary: {
          totalImages: currentImages.length,
          liked: selections.filter(s => s.preference === 'like').length,
          disliked: selections.filter(s => s.preference === 'dislike').length,
          neutral: selections.filter(s => s.preference === 'neutral').length,
          competitorsAnalyzed: competitorDesigns.length
        }
      };

      // In production, save to Supabase
      console.log('Generated report:', report);
      
      return report;
    } catch (error) {
      console.error('Failed to generate report:', error);
      toast({
        title: "Report Generation Failed",
        description: "Could not generate preference report",
        variant: "destructive"
      });
      return null;
    }
  }, [preferences, selections, competitorDesigns, currentImages, toast]);

  const saveProgress = useCallback(async () => {
    try {
      // In production, save to Supabase
      const progressData = {
        selections,
        competitorDesigns,
        preferences,
        currentCategory,
        savedAt: new Date()
      };

      console.log('Saving progress:', progressData);
      
      toast({
        title: "Progress Saved",
        description: "Your mood board has been saved",
      });
    } catch (error) {
      console.error('Failed to save progress:', error);
      toast({
        title: "Save Failed",
        description: "Could not save your progress",
        variant: "destructive"
      });
    }
  }, [selections, competitorDesigns, preferences, currentCategory, toast]);

  const resetMoodBoard = useCallback(() => {
    setSelections([]);
    setCompetitorDesigns([]);
    setPreferences(null);
    setCurrentCategory('all');
    setCurrentImages(sampleImages);
  }, []);

  return (
    <MoodBoardContext.Provider
      value={{
        currentImages,
        selections,
        competitorDesigns,
        preferences,
        isAnalyzing,
        progress,
        currentCategory,
        loadImages,
        recordSelection,
        importCompetitor,
        analyzePreferences,
        generateReport,
        resetMoodBoard,
        saveProgress
      }}
    >
      {children}
    </MoodBoardContext.Provider>
  );
}