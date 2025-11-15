import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Share2, CheckCircle, Palette, Type, Layout, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useMoodBoard } from './MoodBoardProvider';
import { useToast } from '@/hooks/use-toast';

export function PreferenceReport() {
  const { 
    preferences, 
    selections, 
    competitorDesigns,
    currentImages,
    generateReport 
  } = useMoodBoard();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  if (!preferences) {
    return null;
  }

  const likedImages = selections
    .filter(s => s.preference === 'like')
    .map(s => currentImages.find(img => img.id === s.imageId))
    .filter(Boolean);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const report = await generateReport();
      if (report) {
        toast({
          title: "Report Generated!",
          description: "Your design preference report is ready",
        });
        // In production, this would download or save the report
        console.log('Generated report:', report);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = () => {
    // In production, this would share the report
    toast({
      title: "Sharing Report",
      description: "Report link copied to clipboard",
    });
  };

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="inline-block mb-4"
        >
          <div className="relative">
            <FileText className="h-16 w-16 text-primary" />
            <CheckCircle className="h-6 w-6 text-green-500 absolute -bottom-1 -right-1" />
          </div>
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-2">Design Preference Report</h2>
        <p className="text-muted-foreground">
          Your personalized design brief is ready for the creative team
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-primary">{currentImages.length}</p>
          <p className="text-sm text-muted-foreground">Designs Reviewed</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{likedImages.length}</p>
          <p className="text-sm text-muted-foreground">Favorites</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{competitorDesigns.length}</p>
          <p className="text-sm text-muted-foreground">Competitors</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(preferences.aiConfidenceScore * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">AI Confidence</p>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Key Insights */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Key Design Insights</h3>
          
          <div className="space-y-4">
            {/* Color Palette */}
            <div className="flex items-start space-x-3">
              <Palette className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-2">Color Palette</p>
                <div className="flex space-x-2">
                  {[...preferences.colorPreferences.primary, ...preferences.colorPreferences.accent].map((color, idx) => (
                    <div
                      key={idx}
                      className="h-10 w-10 rounded-lg shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="flex items-start space-x-3">
              <Type className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-2">Typography Style</p>
                <p className="text-sm text-muted-foreground">
                  {preferences.typographyPreferences.headingStyles.join(', ')} for headings, 
                  {' '}{preferences.typographyPreferences.bodyStyles.join(', ')} for body text
                </p>
              </div>
            </div>

            {/* Layout */}
            <div className="flex items-start space-x-3">
              <Layout className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-2">Layout Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {preferences.layoutPreferences.map((layout, idx) => (
                    <Badge key={idx} variant="secondary">
                      {layout}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Style Keywords */}
            <div className="flex items-start space-x-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-2">Brand Personality</p>
                <div className="flex flex-wrap gap-2">
                  {preferences.styleKeywords.slice(0, 6).map((keyword, idx) => (
                    <Badge key={idx} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Designs */}
        {likedImages.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Top Design Inspirations</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {likedImages.slice(0, 6).map((img) => (
                <div key={img!.id} className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                  {img!.url.startsWith('/') ? (
                    <div className="h-full flex items-center justify-center p-2">
                      <div className="text-center">
                        <div className="flex justify-center gap-0.5 mb-1">
                          {img!.colors.slice(0, 3).map((color, idx) => (
                            <div
                              key={idx}
                              className="h-3 w-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <p className="text-xs font-medium truncate">{img!.title}</p>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={img!.url} 
                      alt={img!.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Designer Notes */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Notes for Designer</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Client prefers {preferences.styleKeywords[0]?.toLowerCase()} and {preferences.styleKeywords[1]?.toLowerCase()} design aesthetics</li>
            <li>• Avoid overly complex layouts - simplicity is key</li>
            <li>• Ensure mobile responsiveness with the chosen layout style</li>
            <li>• Use the primary colors for main CTAs and important elements</li>
            {competitorDesigns.length > 0 && (
              <li>• Differentiate from competitors by emphasizing unique brand personality</li>
            )}
          </ul>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          <Download className="mr-2 h-5 w-5" />
          {isGenerating ? 'Generating...' : 'Download Full Report'}
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share with Designer
        </Button>
      </div>
    </Card>
  );
}