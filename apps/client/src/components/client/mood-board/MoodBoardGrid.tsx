import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Eye, Filter, Grid3X3, List, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMoodBoard } from './MoodBoardProvider';
import { cn } from '@/lib/utils';

type ViewMode = 'grid' | 'list';

export function MoodBoardGrid() {
  const { 
    currentImages, 
    selections, 
    recordSelection,
    currentCategory,
    loadImages
  } = useMoodBoard();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [selectMode, setSelectMode] = useState(false);

  const categories = [
    { value: 'all', label: 'All Styles' },
    { value: 'modern', label: 'Modern' },
    { value: 'bold', label: 'Bold & Vibrant' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'warm', label: 'Warm & Friendly' },
    { value: 'tech', label: 'Tech & Futuristic' },
    { value: 'luxury', label: 'Luxury' }
  ];

  const getImagePreference = (imageId: string) => {
    const selection = selections.find(s => s.imageId === imageId);
    return selection?.preference;
  };

  const handleImageClick = (imageId: string) => {
    if (selectMode) {
      setSelectedImages(prev => {
        const newSet = new Set(prev);
        if (newSet.has(imageId)) {
          newSet.delete(imageId);
        } else {
          newSet.add(imageId);
        }
        return newSet;
      });
    } else {
      const currentPref = getImagePreference(imageId);
      const nextPref = currentPref === 'like' ? 'dislike' : 
                      currentPref === 'dislike' ? 'neutral' : 'like';
      recordSelection(imageId, nextPref);
    }
  };

  const handleBulkAction = (action: 'like' | 'dislike' | 'neutral') => {
    selectedImages.forEach(imageId => {
      recordSelection(imageId, action);
    });
    setSelectedImages(new Set());
    setSelectMode(false);
  };

  const filteredImages = filterStyle === 'all' 
    ? currentImages 
    : currentImages.filter(img => img.style === filterStyle);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex items-center space-x-4">
          <Select value={currentCategory} onValueChange={loadImages}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ToggleGroup type="single" value={viewMode} onValueChange={(v) => v && setViewMode(v as ViewMode)}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={selectMode ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectMode(!selectMode);
              setSelectedImages(new Set());
            }}
          >
            {selectMode ? `${selectedImages.size} selected` : 'Select Multiple'}
          </Button>

          {selectMode && selectedImages.size > 0 && (
            <>
              <Button
                size="sm"
                variant="outline"
                className="text-green-600"
                onClick={() => handleBulkAction('like')}
              >
                <Check className="h-4 w-4 mr-1" />
                Like All
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600"
                onClick={() => handleBulkAction('dislike')}
              >
                <X className="h-4 w-4 mr-1" />
                Dislike All
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Grid/List View */}
      <ScrollArea className="h-[600px]">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {filteredImages.map((image) => {
                const preference = getImagePreference(image.id);
                const isSelected = selectedImages.has(image.id);

                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setHoveredImage(image.id)}
                    onHoverEnd={() => setHoveredImage(null)}
                  >
                    <Card 
                      className={cn(
                        "relative overflow-hidden cursor-pointer transition-all",
                        preference === 'like' && "ring-2 ring-green-500",
                        preference === 'dislike' && "ring-2 ring-red-500",
                        isSelected && "ring-2 ring-primary"
                      )}
                      onClick={() => handleImageClick(image.id)}
                    >
                      {/* Selection Checkbox */}
                      {selectMode && (
                        <div className="absolute top-2 left-2 z-10">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => handleImageClick(image.id)}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black/90 border-siso-orange"
                          />
                        </div>
                      )}

                      {/* Preference Indicator */}
                      {preference && !selectMode && (
                        <div className="absolute top-2 right-2 z-10">
                          <div className={cn(
                            "rounded-full p-2",
                            preference === 'like' && "bg-green-500 text-white",
                            preference === 'dislike' && "bg-red-500 text-white",
                            preference === 'neutral' && "bg-blue-500 text-white"
                          )}>
                            {preference === 'like' && <Check className="h-4 w-4" />}
                            {preference === 'dislike' && <X className="h-4 w-4" />}
                            {preference === 'neutral' && <Eye className="h-4 w-4" />}
                          </div>
                        </div>
                      )}

                      {/* Image */}
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300">
                        {image.url.startsWith('/') ? (
                          <div className="h-full flex items-center justify-center p-4">
                            <div className="text-center">
                              <div className="flex justify-center gap-1 mb-2">
                                {image.colors.slice(0, 3).map((color, idx) => (
                                  <div
                                    key={idx}
                                    className="h-8 w-8 rounded-full shadow-sm"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                              <p className="text-sm font-medium">{image.title}</p>
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3">
                        <h4 className="font-medium text-sm mb-1 truncate">{image.title}</h4>
                        <div className="flex flex-wrap gap-1">
                          {image.tags.slice(0, 2).map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {image.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{image.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {filteredImages.map((image) => {
                const preference = getImagePreference(image.id);
                const isSelected = selectedImages.has(image.id);

                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Card 
                      className={cn(
                        "p-4 flex items-center space-x-4 cursor-pointer transition-all",
                        preference === 'like' && "border-green-500",
                        preference === 'dislike' && "border-red-500",
                        isSelected && "border-primary"
                      )}
                      onClick={() => handleImageClick(image.id)}
                    >
                      {selectMode && (
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleImageClick(image.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}

                      {/* Thumbnail */}
                      <div className="h-16 w-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0">
                        {image.url.startsWith('/') ? (
                          <div className="h-full flex items-center justify-center">
                            <div className="flex -space-x-2">
                              {image.colors.slice(0, 3).map((color, idx) => (
                                <div
                                  key={idx}
                                  className="h-4 w-4 rounded-full border-2 border-black"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <h4 className="font-medium">{image.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{image.style}</span>
                          <span>•</span>
                          <span>{image.tags.join(', ')}</span>
                        </div>
                      </div>

                      {/* Preference */}
                      {preference && !selectMode && (
                        <div className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          preference === 'like' && "bg-green-100 text-green-700",
                          preference === 'dislike' && "bg-red-100 text-red-700",
                          preference === 'neutral' && "bg-blue-100 text-blue-700"
                        )}>
                          {preference}
                        </div>
                      )}
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}