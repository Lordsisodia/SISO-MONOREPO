/**
 * Cloudinary Image Configuration & Editing Presets
 *
 * SISO-CLIENT-BASE Shared Component
 * Auto-editing built-in - no Photoshop needed!
 *
 * All client projects can use this for portfolio images
 */

export const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddfgfpelo',

  // Organized folder structure for all clients
  getFolders: (clientName: string) => ({
    portfolio: `${clientName}/portfolio`,
    menu: `${clientName}/menu`,
    team: `${clientName}/team`,
    hero: `${clientName}/hero`,
    gallery: `${clientName}/gallery`,
    products: `${clientName}/products`,
  })
};

/**
 * 🎨 IMAGE EDITING PRESETS
 * Apply these to automatically transform images
 *
 * Usage:
 * <CloudinaryImage src="my-image" preset="portfolioHero" />
 */
export const IMAGE_PRESETS = {
  // Portfolio Images
  portfolioHero: {
    width: 1200,
    height: 800,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  portfolioThumbnail: {
    width: 400,
    height: 300,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  // Product/Menu Images
  productSquare: {
    width: 600,
    height: 600,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  productWide: {
    width: 800,
    height: 600,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  // Team Photos
  teamMember: {
    width: 400,
    height: 400,
    crop: 'fill' as const,
    gravity: 'face' as const, // Auto-centers on faces!
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  // Hero Images
  heroFull: {
    width: 1920,
    height: 1080,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  heroMobile: {
    width: 768,
    height: 1024,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  // Gallery Grid
  gallerySquare: {
    width: 500,
    height: 500,
    crop: 'fill' as const,
    gravity: 'auto' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
  },

  // Logos & Icons
  logo: {
    width: 200,
    height: 200,
    crop: 'fit' as const, // Fit without cropping
    gravity: 'center' as const,
    quality: 'auto' as const,
    format: 'auto' as const,
    background: 'transparent' as const,
  },
};

/**
 * 🎨 ADVANCED EDITING EFFECTS
 * Apply filters to your images via URL
 *
 * Usage:
 * <CloudinaryImage src="my-image" preset="portfolioHero" effect="vibrant" />
 */
export const IMAGE_EFFECTS = {
  // Color adjustments
  vibrant: { effect: 'vibrance:30' as const },
  warm: { effect: 'tint:50:red:yellow' as const },
  cool: { effect: 'tint:50:blue:green' as const },
  vintage: { effect: 'sepia:50' as const },
  blackAndWhite: { effect: 'grayscale' as const },

  // Enhancement
  sharpen: { effect: 'sharpen:100' as const }, // Great for food!
  blur: { effect: 'blur:300' as const },
  brightness: { effect: 'brightness:20' as const },
  contrast: { effect: 'contrast:20' as const },

  // Artistic
  cartoonify: { effect: 'cartoonify' as const },
  oilPaint: { effect: 'oil_paint:50' as const },
  pixelate: { effect: 'pixelate:20' as const },

  // Overlays
  vignette: { effect: 'vignette' as const },
};

/**
 * Helper function to combine presets and effects
 */
export function combineTransformations(
  preset: keyof typeof IMAGE_PRESETS,
  effect?: keyof typeof IMAGE_EFFECTS
) {
  const basePreset = IMAGE_PRESETS[preset];
  const appliedEffect = effect ? IMAGE_EFFECTS[effect] : {};

  return {
    ...basePreset,
    ...appliedEffect,
  };
}

/**
 * Type exports for TypeScript
 */
export type ImagePreset = keyof typeof IMAGE_PRESETS;
export type ImageEffect = keyof typeof IMAGE_EFFECTS;
