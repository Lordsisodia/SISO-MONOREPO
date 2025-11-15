import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MoodBoardProvider } from './MoodBoardProvider';
import { 
  Palette, 
  Sparkles,
  Eye,
  Save,
  RefreshCw,
  Plus,
  ChevronRight,
  Download,
  Code,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { useMoodBoard } from './MoodBoardProvider';
import { Progress } from '@/components/ui/progress';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';

interface MoodBoardGeneratorProps {
  onComplete?: (preferences: any) => void;
  clientId?: string;
  projectId?: string;
}

// Color palette presets
const colorPresets = [
  { name: 'Modern Tech', colors: ['#0F172A', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'] },
  { name: 'Soft Pastels', colors: ['#FEE2E2', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#E9D5FF'] },
  { name: 'Dark Mode', colors: ['#000000', '#1F2937', '#374151', '#6B7280', '#9CA3AF'] },
  { name: 'Vibrant', colors: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'] },
  { name: 'Earth Tones', colors: ['#8B4513', '#A0522D', '#D2691E', '#DEB887', '#F5DEB3'] },
  { name: 'Ocean', colors: ['#003049', '#264653', '#2A9D8F', '#E9C46A', '#F4A261'] }
];

// Preview template component
function PreviewTemplate({ colors, fonts, style }: any) {
  const primaryColor = colors[0] || '#3B82F6';
  const secondaryColor = colors[1] || '#10B981';
  const bgColor = colors[2] || '#F3F4F6';
  const textColor = colors[3] || '#1F2937';

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div 
        className="h-16 flex items-center justify-between px-6"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="text-white font-bold text-lg">Your Brand</div>
        <nav className="flex space-x-6">
          <span className="text-white/80 hover:text-white cursor-pointer">Home</span>
          <span className="text-white/80 hover:text-white cursor-pointer">About</span>
          <span className="text-white/80 hover:text-white cursor-pointer">Services</span>
          <span className="text-white/80 hover:text-white cursor-pointer">Contact</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div 
        className="p-12 text-center"
        style={{ backgroundColor: bgColor }}
      >
        <h1 
          className="text-4xl font-bold mb-4"
          style={{ color: textColor }}
        >
          Welcome to Your New Website
        </h1>
        <p 
          className="text-lg mb-8 max-w-2xl mx-auto"
          style={{ color: textColor, opacity: 0.8 }}
        >
          Experience the perfect blend of design and functionality with our custom-tailored solution for your business.
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            className="px-8 py-3"
            style={{ 
              backgroundColor: primaryColor,
              color: 'white'
            }}
          >
            Get Started
          </Button>
          <Button 
            variant="outline"
            className="px-8 py-3"
            style={{ 
              borderColor: secondaryColor,
              color: secondaryColor
            }}
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-12 grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div 
            key={i}
            className="p-6 rounded-lg text-center"
            style={{ backgroundColor: i === 2 ? secondaryColor + '20' : bgColor }}
          >
            <div 
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: i === 2 ? secondaryColor : primaryColor }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 
              className="font-semibold mb-2"
              style={{ color: textColor }}
            >
              Feature {i}
            </h3>
            <p 
              className="text-sm"
              style={{ color: textColor, opacity: 0.7 }}
            >
              Description of your amazing feature that provides value to customers.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inner component that uses the mood board context
function MoodBoardContent({ onComplete }: MoodBoardGeneratorProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState('#3B82F6');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  const { 
    progress, 
    selections, 
    preferences,
    saveProgress,
    resetMoodBoard,
    generateReport
  } = useMoodBoard();

  const handleColorSelect = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else if (selectedColors.length < 5) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handlePresetSelect = (presetName: string, colors: string[]) => {
    setSelectedPreset(presetName);
    setSelectedColors(colors);
  };

  const handleComplete = async () => {
    const report = await generateReport();
    if (report && onComplete) {
      onComplete({
        ...report,
        selectedColors,
        selectedPreset
      });
    }
  };

  const previewWidths = {
    desktop: 'w-full',
    tablet: 'w-3/4',
    mobile: 'w-1/2'
  };

  return (
    <div className="space-y-6">
      {/* Header - Keep existing but remove duplicate title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
          Design Preference Discovery
        </h1>
        <p className="text-siso-text-muted">
          Select colors and styles to create the perfect look for your brand
        </p>
      </div>

      {/* Progress Bar */}
      <Card className="p-4 bg-siso-bg-secondary border-siso-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-siso-text">Overall Progress</span>
            {selectedColors.length > 0 && (
              <Badge variant="secondary" className="bg-siso-orange/20 text-siso-orange border-siso-orange/30">
                {selectedColors.length} colors selected
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={saveProgress}
              disabled={selectedColors.length === 0}
              className="text-siso-text hover:bg-siso-bg-tertiary"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedColors([]);
                setSelectedPreset('');
                resetMoodBoard();
              }}
              disabled={selectedColors.length === 0}
              className="text-siso-text hover:bg-siso-bg-tertiary"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
        <Progress value={(selectedColors.length / 5) * 100} className="h-2 bg-siso-bg-tertiary" />
        <p className="text-xs text-siso-text-muted mt-2">
          Select at least 3 colors to generate your design preview
        </p>
      </Card>

      {/* 3-Column Layout */}
      <div className={cn(
        "grid gap-6",
        isMobile ? "grid-cols-1" : "grid-cols-4"
      )}>
        {/* Left Column - Color Selection (25%) */}
        <div className={cn(
          "space-y-4",
          isMobile ? "order-1" : "lg:col-span-1"
        )}>
          <Card className="p-4 bg-siso-bg-secondary border-siso-border">
            <h3 className="font-semibold mb-4 flex items-center text-siso-text-bold">
              <Palette className="w-4 h-4 mr-2 text-siso-orange" />
              Color Palette
            </h3>
            
            {/* Color Presets */}
            <div className="space-y-3 mb-6">
              <h4 className="text-sm font-medium text-siso-text">Preset Palettes</h4>
              {colorPresets.map((preset) => (
                <div
                  key={preset.name}
                  className={cn(
                    "p-2 rounded-lg border cursor-pointer transition-all",
                    selectedPreset === preset.name 
                      ? "border-siso-orange bg-siso-orange/10" 
                      : "border-siso-border hover:border-siso-orange/50"
                  )}
                  onClick={() => handlePresetSelect(preset.name, preset.colors)}
                >
                  <p className="text-xs font-medium mb-2 text-siso-text">{preset.name}</p>
                  <div className="flex space-x-1">
                    {preset.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Color Picker */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-siso-text">Custom Colors</h4>
              <HexColorPicker 
                color={customColor} 
                onChange={setCustomColor}
                style={{ width: '100%' }}
              />
              <div className="flex items-center space-x-2">
                <Input
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="flex-1 bg-siso-bg border-siso-border text-siso-text"
                  placeholder="#000000"
                />
                <Button
                  size="sm"
                  onClick={() => handleColorSelect(customColor)}
                  disabled={selectedColors.length >= 5}
                  className="bg-siso-orange hover:bg-siso-orange/90 text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Selected Colors */}
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-medium text-siso-text">Selected Colors</h4>
              <div className="flex flex-wrap gap-2">
                {selectedColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded border-2 border-siso-border cursor-pointer hover:border-siso-red"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Style Categories */}
          <Card className="p-4 bg-siso-bg-secondary border-siso-border">
            <h3 className="font-semibold mb-4 flex items-center text-siso-text-bold">
              <Sparkles className="w-4 h-4 mr-2 text-siso-orange" />
              Style Categories
            </h3>
            <div className="space-y-2">
              {['Modern', 'Classic', 'Minimalist', 'Bold', 'Playful'].map((style) => (
                <label key={style} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-siso-border text-siso-orange focus:ring-siso-orange"
                  />
                  <span className="text-sm text-siso-text">{style}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Middle Column - Main Content (50%) */}
        <div className={cn(
          "space-y-4",
          isMobile ? "order-3" : "lg:col-span-2"
        )}>
          <Card className="p-6 bg-siso-bg-secondary border-siso-border">
            <h3 className="font-semibold mb-4 flex items-center text-siso-text-bold">
              <Eye className="w-4 h-4 mr-2 text-siso-orange" />
              Mood Board Images
            </h3>
            
            {/* Placeholder for mood board images */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-video bg-siso-bg-tertiary rounded-lg flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-siso-orange transition-all"
                >
                  <p className="text-siso-text-muted">Design Sample {i}</p>
                </motion.div>
              ))}
            </div>

            {/* AI Analysis Section */}
            <div className="mt-6 p-4 bg-siso-bg-tertiary rounded-lg">
              <h4 className="font-medium mb-2 text-siso-text">AI Design Analysis</h4>
              <p className="text-sm text-siso-text-muted">
                Select images and colors to receive AI-powered design recommendations tailored to your brand.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column - Live Preview (25%) */}
        <div className={cn(
          "space-y-4",
          isMobile ? "order-2" : "lg:col-span-1"
        )}>
          <Card className="p-4 bg-siso-bg-secondary border-siso-border sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center text-siso-text-bold">
                <Eye className="w-4 h-4 mr-2 text-siso-orange" />
                Live Preview
              </h3>
              
              {/* Device Preview Selector */}
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('desktop')}
                  className="h-7 w-7 p-0"
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('tablet')}
                  className="h-7 w-7 p-0"
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setPreviewDevice('mobile')}
                  className="h-7 w-7 p-0"
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Preview Container */}
            <div className="relative bg-siso-bg rounded-lg p-4 min-h-[500px]">
              <div className={cn(
                "mx-auto transition-all duration-300",
                previewWidths[previewDevice]
              )}>
                {selectedColors.length >= 3 ? (
                  <PreviewTemplate 
                    colors={selectedColors}
                    fonts={{}}
                    style={{}}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-8">
                    <div>
                      <Palette className="w-12 h-12 mx-auto mb-4 text-siso-text-muted" />
                      <p className="text-siso-text-muted">
                        Select at least 3 colors to see your landing page preview
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Export Options */}
            {selectedColors.length >= 3 && (
              <div className="mt-4 space-y-2">
                <Button 
                  className="w-full bg-siso-orange hover:bg-siso-orange/90 text-white"
                  onClick={handleComplete}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Save & Continue
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-siso-border text-siso-text"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Export Code
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// Main component with provider wrapper
export function MoodBoardGenerator3Column(props: MoodBoardGeneratorProps) {
  return (
    <MoodBoardProvider>
      <MoodBoardContent {...props} />
    </MoodBoardProvider>
  );
}