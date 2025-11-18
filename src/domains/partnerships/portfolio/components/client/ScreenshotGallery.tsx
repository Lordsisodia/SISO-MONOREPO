/**
 * Screenshot Gallery Component
 * Displays project screenshots in a responsive grid
 */

import { motion } from 'framer-motion';

interface Screenshot {
  url: string;
  caption?: string;
  type?: 'desktop' | 'mobile' | 'feature';
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[] | string[];
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  // Normalize screenshots to always have objects
  const normalizedScreenshots: Screenshot[] = screenshots.map(s =>
    typeof s === 'string' ? { url: s } : s
  );

  if (normalizedScreenshots.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-4xl mb-4">📸</div>
        <p className="text-siso-text-muted">
          Screenshots coming soon...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {normalizedScreenshots.map((screenshot, index) => (
        <motion.div
          key={screenshot.url || index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative aspect-video rounded-lg overflow-hidden border border-siso-border group cursor-pointer"
        >
          <img
            src={screenshot.url || 'https://via.placeholder.com/1920x1080/0A0A0A/FF5722?text=Screenshot'}
            alt={screenshot.caption || `Project screenshot ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {screenshot.caption && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-medium text-sm">
                  {screenshot.caption}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
