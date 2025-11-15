import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimation, PanInfo } from 'framer-motion';
import { Heart, X, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMoodBoard } from './MoodBoardProvider';
import { cn } from '@/lib/utils';

const SWIPE_THRESHOLD = 100;
const ROTATION_FACTOR = 0.1;

export function MoodBoardSwiper() {
  const { 
    currentImages, 
    selections, 
    recordSelection, 
    progress,
    currentCategory 
  } = useMoodBoard();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  
  const x = useMotionValue(0);
  const controls = useAnimation();
  
  // Get unrated images
  const unratedImages = currentImages.filter(
    img => !selections.find(s => s.imageId === img.id)
  );
  
  const currentImage = unratedImages[currentIndex];
  const hasNext = currentIndex < unratedImages.length - 1;
  const isComplete = unratedImages.length === 0;

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const shouldSwipeRight = info.offset.x > SWIPE_THRESHOLD;
    const shouldSwipeLeft = info.offset.x < -SWIPE_THRESHOLD;

    if (shouldSwipeRight) {
      setExitDirection('right');
      recordSelection(currentImage.id, 'like');
      await controls.start({ x: window.innerWidth, rotate: 20, opacity: 0 });
      nextCard();
    } else if (shouldSwipeLeft) {
      setExitDirection('left');
      recordSelection(currentImage.id, 'dislike');
      await controls.start({ x: -window.innerWidth, rotate: -20, opacity: 0 });
      nextCard();
    } else {
      controls.start({ x: 0, rotate: 0 });
    }
  };

  const nextCard = () => {
    if (hasNext) {
      setCurrentIndex(prev => prev + 1);
      setExitDirection(null);
      controls.set({ x: 0, rotate: 0, opacity: 1 });
    }
  };

  const handleAction = async (action: 'like' | 'dislike' | 'neutral') => {
    if (!currentImage) return;

    recordSelection(currentImage.id, action);
    
    if (action === 'like') {
      setExitDirection('right');
      await controls.start({ x: window.innerWidth, rotate: 20, opacity: 0 });
    } else if (action === 'dislike') {
      setExitDirection('left');
      await controls.start({ x: -window.innerWidth, rotate: -20, opacity: 0 });
    } else {
      await controls.start({ y: -50, opacity: 0 });
    }
    
    nextCard();
  };

  const resetCurrentCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      controls.set({ x: 0, rotate: 0, opacity: 1 });
    }
  };

  // Calculate rotation based on drag
  const rotate = useMotionValue(0);
  x.onChange(latest => {
    rotate.set(latest * ROTATION_FACTOR);
  });

  if (isComplete) {
    return (
      <Card className="p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">All Done!</h3>
        <p className="text-muted-foreground mb-4">
          You've reviewed all design samples in this category
        </p>
        <Progress value={100} className="mb-4" />
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => setCurrentIndex(0)}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Review Again
          </Button>
          <Button>
            Continue to Analysis
          </Button>
        </div>
      </Card>
    );
  }

  if (!currentImage) return null;

  return (
    <div className="relative h-[600px] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {selections.length} of {currentImages.length} designs reviewed
          </span>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Swiper Container */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Background cards preview */}
        {unratedImages.slice(currentIndex + 1, currentIndex + 3).map((img, idx) => (
          <Card
            key={img.id}
            className="absolute w-[350px] h-[450px] shadow-xl"
            style={{
              transform: `scale(${0.95 - idx * 0.05}) translateY(${idx * 10}px)`,
              opacity: 0.5 - idx * 0.2,
              zIndex: -idx - 1,
            }}
          />
        ))}

        {/* Active Card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x, rotate }}
          className="absolute cursor-grab active:cursor-grabbing"
          whileTap={{ scale: 1.05 }}
        >
          <Card className="w-[350px] h-[450px] overflow-hidden shadow-2xl relative">
            {/* Swipe Indicators */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-500/50 to-green-600/50 z-10 pointer-events-none"
              style={{
                opacity: useMotionValue(0),
              }}
              animate={{
                opacity: x.get() > 50 ? (x.get() - 50) / 100 : 0
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-black/90 rounded-full p-4">
                  <Heart className="h-12 w-12 text-green-600 fill-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-bl from-red-500/50 to-red-600/50 z-10 pointer-events-none"
              style={{
                opacity: useMotionValue(0),
              }}
              animate={{
                opacity: x.get() < -50 ? (-x.get() - 50) / 100 : 0
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="bg-black/90 rounded-full p-4">
                  <X className="h-12 w-12 text-red-600" />
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <div className="h-3/4 bg-gradient-to-br from-gray-200 to-gray-300 relative">
              {currentImage.url.startsWith('/') ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {currentImage.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="h-16 w-16 rounded-lg shadow-md"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="text-lg font-semibold">{currentImage.title}</p>
                  </div>
                </div>
              ) : (
                <img 
                  src={currentImage.url} 
                  alt={currentImage.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* Card Info */}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{currentImage.title}</h3>
              <div className="flex flex-wrap gap-2">
                {currentImage.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center space-x-4">
          <Button
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={() => handleAction('dislike')}
          >
            <X className="h-6 w-6 text-red-500" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={() => handleAction('neutral')}
          >
            <Sparkles className="h-5 w-5 text-blue-500" />
          </Button>
          
          <Button
            size="icon"
            variant="outline"
            className="h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform"
            onClick={() => handleAction('like')}
          >
            <Heart className="h-6 w-6 text-green-500" />
          </Button>
        </div>

        {/* Undo Button */}
        {currentIndex > 0 && (
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-0 left-0"
            onClick={resetCurrentCard}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center mt-6 text-sm text-muted-foreground">
        <p>Swipe right or tap ❤️ to like • Swipe left or tap ✕ to dislike</p>
      </div>
    </div>
  );
}