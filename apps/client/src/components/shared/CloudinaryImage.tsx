import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill, fit } from '@cloudinary/url-gen/actions/resize';
import { autoGravity, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { IMAGE_PRESETS, IMAGE_EFFECTS, type ImagePreset, type ImageEffect } from '@/lib/cloudinary-config';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  preset: ImagePreset;
  effect?: ImageEffect;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
}

/**
 * 🎨 Smart Cloudinary Image Component
 *
 * AUTO-EDITING BUILT-IN! No Photoshop needed!
 *
 * Just specify a preset and optional effect - images are automatically:
 * - Cropped to perfect size
 * - Optimized for web (WebP/AVIF)
 * - Responsive across devices
 * - Lazy loaded (unless priority)
 * - Enhanced with filters
 * - Delivered via global CDN
 *
 * @example Basic Usage
 * <CloudinaryImage
 *   src="restaurant/portfolio/project-1"
 *   alt="Modern restaurant interior"
 *   preset="portfolioHero"
 * />
 *
 * @example With Effects
 * <CloudinaryImage
 *   src="restaurant/menu/pasta-carbonara"
 *   alt="Creamy Pasta"
 *   preset="productSquare"
 *   effect="sharpen"
 * />
 *
 * @example Team Photo (Auto Face Detection!)
 * <CloudinaryImage
 *   src="restaurant/team/chef-john"
 *   alt="Chef John"
 *   preset="teamMember"
 *   className="rounded-full"
 * />
 */
export default function CloudinaryImage({
  src,
  alt,
  preset,
  effect,
  className = '',
  priority = false,
  onClick,
}: CloudinaryImageProps) {
  // Initialize Cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddfgfpelo',
    },
  });

  // Get transformation settings
  const presetConfig = IMAGE_PRESETS[preset];
  const effectConfig = effect ? IMAGE_EFFECTS[effect] : null;

  // Build image transformation
  let img = cld.image(src);

  // Apply format and quality
  img = img.format(autoFormat()).quality(autoQuality());

  // Apply resize based on crop type
  if (presetConfig.crop === 'fill') {
    let resizeAction = fill()
      .width(presetConfig.width)
      .height(presetConfig.height);

    // Apply gravity if specified
    if (presetConfig.gravity === 'face') {
      resizeAction = resizeAction.gravity(focusOn(face()));
    } else if (presetConfig.gravity === 'auto') {
      resizeAction = resizeAction.gravity(autoGravity());
    }

    img = img.resize(resizeAction);
  } else if (presetConfig.crop === 'fit') {
    img = img.resize(
      fit()
        .width(presetConfig.width)
        .height(presetConfig.height)
    );
  }

  // Apply effect if specified
  if (effectConfig?.effect) {
    // Parse effect string and apply
    const effectStr = effectConfig.effect;

    // Note: For advanced effects, you may need to use Cloudinary's effect actions
    // This is a simplified version - extend as needed
    img = img.addTransformation(`e_${effectStr}`);
  }

  return (
    <AdvancedImage
      cldImg={img}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      onClick={onClick}
    />
  );
}

/**
 * 🎨 Cloudinary Background Image
 *
 * Use Cloudinary images as CSS backgrounds
 *
 * @example
 * <CloudinaryBackground
 *   src="restaurant/hero/main-hero"
 *   preset="heroFull"
 *   className="h-screen"
 * >
 *   <h1>Welcome to Our Restaurant</h1>
 * </CloudinaryBackground>
 */
interface CloudinaryBackgroundProps {
  src: string;
  preset: ImagePreset;
  effect?: ImageEffect;
  className?: string;
  children?: React.ReactNode;
}

export function CloudinaryBackground({
  src,
  preset,
  effect,
  className = '',
  children,
}: CloudinaryBackgroundProps) {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddfgfpelo',
    },
  });

  const presetConfig = IMAGE_PRESETS[preset];
  const effectConfig = effect ? IMAGE_EFFECTS[effect] : null;

  let img = cld.image(src);
  img = img.format(autoFormat()).quality(autoQuality());

  if (presetConfig.crop === 'fill') {
    img = img.resize(
      fill()
        .width(presetConfig.width)
        .height(presetConfig.height)
        .gravity(autoGravity())
    );
  }

  if (effectConfig?.effect) {
    img = img.addTransformation(`e_${effectConfig.effect}`);
  }

  const imageUrl = img.toURL();

  return (
    <div
      className={`bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {children}
    </div>
  );
}
