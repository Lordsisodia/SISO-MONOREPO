import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Upload, Loader2, Check, AlertCircle, ExternalLink, Palette, Type, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useMoodBoard } from './MoodBoardProvider';
import { cn } from '@/lib/utils';

export function CompetitorImporter() {
  const { competitorDesigns, importCompetitor, isAnalyzing } = useMoodBoard();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const validateUrl = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleImport = async () => {
    setError('');
    
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid URL (including http:// or https://)');
      return;
    }

    try {
      await importCompetitor(url);
      setUrl('');
      setShowUrlInput(false);
    } catch (err) {
      setError('Failed to import competitor website');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleImport();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Competitor Analysis</h3>
        <p className="text-muted-foreground">
          Import competitor websites to analyze their design and create something even better
        </p>
      </div>

      {/* Import Section */}
      <Card className="p-6">
        <AnimatePresence mode="wait">
          {!showUrlInput ? (
            <motion.div
              key="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Import Competitor Website</h4>
              <p className="text-sm text-muted-foreground mb-4">
                We'll analyze their design elements and help you create something unique
              </p>
              <Button onClick={() => setShowUrlInput(true)} disabled={isAnalyzing}>
                <Upload className="mr-2 h-4 w-4" />
                Import Website
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="url">Website URL</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isAnalyzing}
                    className={error ? 'border-red-500' : ''}
                  />
                  <Button 
                    onClick={handleImport} 
                    disabled={isAnalyzing || !url}
                  >
                    {isAnalyzing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Import'
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUrlInput(false);
                      setUrl('');
                      setError('');
                    }}
                    disabled={isAnalyzing}
                  >
                    Cancel
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  We'll capture a screenshot and analyze the design elements including colors, typography, and layout patterns.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Analyzed Competitors */}
      {competitorDesigns.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold">Analyzed Competitors ({competitorDesigns.length})</h4>
          
          <div className="grid gap-4">
            {competitorDesigns.map((competitor) => (
              <motion.div
                key={competitor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4">
                  <div className="flex items-start space-x-4">
                    {/* Screenshot Preview */}
                    <div className="w-32 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                      {competitor.screenshotUrl ? (
                        <img 
                          src={competitor.screenshotUrl} 
                          alt="Screenshot"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center">
                          <Globe className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Analysis Results */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <a 
                          href={competitor.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary flex items-center space-x-1"
                        >
                          <span className="truncate max-w-[300px]">{competitor.url}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <Badge variant="secondary">Analyzed</Badge>
                      </div>

                      {/* Color Palette */}
                      <div className="flex items-center space-x-2">
                        <Palette className="h-4 w-4 text-muted-foreground" />
                        <div className="flex space-x-1">
                          {competitor.colorPalette.map((color, idx) => (
                            <div
                              key={idx}
                              className="h-6 w-6 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Typography */}
                      <div className="flex items-start space-x-2">
                        <Type className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                          {competitor.designElements.typography.map((font, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {font}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Layout */}
                      <div className="flex items-center space-x-2">
                        <Layout className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {competitor.designElements.layout}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis Progress */}
      {isAnalyzing && (
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div>
              <p className="font-medium">Analyzing website...</p>
              <p className="text-sm text-muted-foreground">
                This may take a few moments as we capture and analyze the design
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}