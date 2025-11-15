# 🎨 Cloudinary Image System - SISO-CLIENT-BASE

## Why Cloudinary?

**Problem**: Vercel has a 250 MB deployment limit. Client portfolio sites with lots of images will exceed this quickly.

**Solution**: Cloudinary hosts images externally with:
- ✅ **Zero Vercel impact** - images stored on Cloudinary CDN
- ✅ **Auto image editing** - crop, resize, filters via URL
- ✅ **Auto optimization** - WebP/AVIF, quality tuning
- ✅ **Face detection** - team photos auto-center on faces
- ✅ **Lazy loading** - built-in performance
- ✅ **Global CDN** - fast delivery worldwide
- ✅ **Free tier** - 25 GB storage, 25 GB bandwidth/month

---

## 📁 Step 1: Organize Images in Cloudinary

### Upload to Cloudinary Dashboard

1. Go to: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer
2. Create folder structure:

```
restaurant/              ← Your client name
├── portfolio/          ← Portfolio showcase
│   ├── project-1.jpg
│   ├── project-2.jpg
│   └── project-3.jpg
├── menu/              ← Food/products
│   ├── appetizers/
│   ├── mains/
│   └── desserts/
├── team/              ← Staff photos
│   ├── chef-john.jpg
│   └── manager-sarah.jpg
├── hero/              ← Hero banners
│   └── main-hero.jpg
└── gallery/           ← General gallery
    └── interior-1.jpg

bike-rental/            ← Another client
├── portfolio/
├── products/
└── team/

tour-guides/            ← Another client
├── portfolio/
└── gallery/
```

### Naming Convention

**Good names:**
- `restaurant/portfolio/modern-interior-night.jpg`
- `bike-rental/products/mountain-bike-red.jpg`
- `restaurant/team/chef-john-headshot.jpg`

**Bad names:**
- `IMG_1234.jpg` ❌
- `photo.jpg` ❌
- `untitled.jpg` ❌

---

## 💻 Step 2: Use in Your Client Project

### Basic Usage

```tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';

export default function Portfolio() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Auto-cropped to 1200x800, optimized, lazy-loaded */}
      <CloudinaryImage
        src="restaurant/portfolio/project-1"
        alt="Modern restaurant interior"
        preset="portfolioHero"
      />

      {/* Same image as thumbnail - auto-resized to 400x300 */}
      <CloudinaryImage
        src="restaurant/portfolio/project-1"
        alt="Thumbnail"
        preset="portfolioThumbnail"
      />

      {/* Product image - square 600x600 */}
      <CloudinaryImage
        src="restaurant/menu/pasta-carbonara"
        alt="Pasta dish"
        preset="productSquare"
      />
    </div>
  );
}
```

### With Image Editing Effects

```tsx
{/* Sharpen food images */}
<CloudinaryImage
  src="restaurant/menu/pasta-carbonara"
  alt="Creamy Pasta"
  preset="productSquare"
  effect="sharpen"
/>

{/* Vintage effect for team photos */}
<CloudinaryImage
  src="restaurant/team/chef-john"
  alt="Chef John"
  preset="teamMember"
  effect="vintage"
  className="rounded-full"
/>

{/* Warm tone for hero */}
<CloudinaryImage
  src="restaurant/hero/main-hero"
  alt="Restaurant"
  preset="heroFull"
  effect="warm"
/>
```

### Background Images

```tsx
import { CloudinaryBackground } from '@/components/shared/CloudinaryImage';

<CloudinaryBackground
  src="restaurant/hero/main-hero"
  preset="heroFull"
  effect="warm"
  className="h-screen flex items-center justify-center"
>
  <h1 className="text-white text-6xl">Welcome</h1>
</CloudinaryBackground>
```

---

## 🎨 Available Presets

### Portfolio Presets

| Preset | Size | Best For |
|--------|------|----------|
| `portfolioHero` | 1200x800 | Large showcase images |
| `portfolioThumbnail` | 400x300 | Grid thumbnails |

### Product/Menu Presets

| Preset | Size | Best For |
|--------|------|----------|
| `productSquare` | 600x600 | Food, products (square) |
| `productWide` | 800x600 | Products (wide format) |

### Team Presets

| Preset | Size | Special Feature |
|--------|------|-----------------|
| `teamMember` | 400x400 | **Auto face detection!** Centers on face |

### Hero Presets

| Preset | Size | Best For |
|--------|------|----------|
| `heroFull` | 1920x1080 | Desktop hero banners |
| `heroMobile` | 768x1024 | Mobile hero images |

### Gallery Presets

| Preset | Size | Best For |
|--------|------|----------|
| `gallerySquare` | 500x500 | Instagram-style grid |

### Logo Preset

| Preset | Size | Special Feature |
|--------|------|-----------------|
| `logo` | 200x200 | Fit without cropping, transparent background |

---

## ✨ Available Effects

### Color Effects

```tsx
effect="vibrant"       // Boosts colors
effect="warm"          // Adds warm orange/red tones
effect="cool"          // Adds cool blue/green tones
effect="vintage"       // Sepia/retro look
effect="blackAndWhite" // Grayscale
```

### Enhancement Effects

```tsx
effect="sharpen"     // Makes images crisp (great for food!)
effect="blur"        // Background blur
effect="brightness"  // Brightens the image
effect="contrast"    // Increases contrast
```

### Artistic Effects

```tsx
effect="cartoonify"  // Cartoon effect
effect="oilPaint"    // Oil painting look
effect="pixelate"    // Pixelated style
effect="vignette"    // Darkens edges
```

---

## 📋 Real-World Examples

### Portfolio Page

```tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';

const portfolioItems = [
  { id: 1, src: 'restaurant/portfolio/modern-interior', title: 'Modern Design' },
  { id: 2, src: 'restaurant/portfolio/outdoor-patio', title: 'Outdoor Space' },
  { id: 3, src: 'restaurant/portfolio/private-dining', title: 'Private Events' },
];

export default function PortfolioPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioItems.map((item) => (
        <div key={item.id} className="group cursor-pointer">
          <CloudinaryImage
            src={item.src}
            alt={item.title}
            preset="portfolioHero"
            effect="vibrant"
            className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          />
          <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
        </div>
      ))}
    </div>
  );
}
```

### Menu/Products Page

```tsx
const menuItems = [
  { name: 'Pasta Carbonara', image: 'restaurant/menu/mains/carbonara', price: '$18.99' },
  { name: 'Grilled Salmon', image: 'restaurant/menu/mains/salmon', price: '$24.99' },
];

export default function MenuPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {menuItems.map((item) => (
        <div key={item.name} className="text-center">
          <CloudinaryImage
            src={item.image}
            alt={item.name}
            preset="productSquare"
            effect="sharpen" // Makes food look extra crispy!
            className="rounded-lg mb-2"
          />
          <h4 className="font-medium">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Team Page

```tsx
const team = [
  { name: 'Chef John', role: 'Head Chef', image: 'restaurant/team/chef-john' },
  { name: 'Sarah', role: 'Manager', image: 'restaurant/team/manager-sarah' },
];

export default function TeamPage() {
  return (
    <div className="flex gap-8 justify-center">
      {team.map((member) => (
        <div key={member.name} className="text-center">
          {/* Auto-centers on face! */}
          <CloudinaryImage
            src={member.image}
            alt={member.name}
            preset="teamMember"
            className="rounded-full mx-auto mb-2"
          />
          <h4 className="font-medium">{member.name}</h4>
          <p className="text-sm text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### Hero Section

```tsx
import { CloudinaryBackground } from '@/components/shared/CloudinaryImage';

export default function HeroSection() {
  return (
    <CloudinaryBackground
      src="restaurant/hero/main-hero"
      preset="heroFull"
      effect="warm"
      className="h-screen flex items-center justify-center text-white"
    >
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Our Restaurant</h1>
        <p className="text-2xl">Experience Fine Dining</p>
      </div>
    </CloudinaryBackground>
  );
}
```

---

## 🔄 Workflow for Each Client Project

### 1. Upload Images

- Go to Cloudinary dashboard
- Create folder: `client-name/`
- Upload all images to appropriate subfolders
- Note the filenames (without extension)

### 2. Use in Code

```tsx
// Just reference by path
<CloudinaryImage
  src="client-name/portfolio/project-1"
  alt="Project showcase"
  preset="portfolioHero"
/>
```

### 3. Apply Effects (Optional)

```tsx
// Add effect prop for instant editing
<CloudinaryImage
  src="client-name/portfolio/project-1"
  alt="Project showcase"
  preset="portfolioHero"
  effect="vibrant" // Try: vibrant, warm, cool, sharpen, vintage
/>
```

---

## 💡 Pro Tips

### 1. Same Image, Different Sizes

```tsx
{/* Large version */}
<CloudinaryImage src="food-dish" preset="productSquare" />

{/* Thumbnail version - same image! */}
<CloudinaryImage src="food-dish" preset="portfolioThumbnail" />
```

### 2. Try Different Effects

```tsx
{/* Original */}
<CloudinaryImage src="photo" preset="portfolioHero" />

{/* Warm tone */}
<CloudinaryImage src="photo" preset="portfolioHero" effect="warm" />

{/* Vintage */}
<CloudinaryImage src="photo" preset="portfolioHero" effect="vintage" />
```

### 3. Face Detection for Team Photos

```tsx
{/* Automatically centers on person's face */}
<CloudinaryImage
  src="team/member-1"
  preset="teamMember" // Uses gravity: 'face'
/>
```

### 4. Sharpen Food Images

```tsx
{/* Makes food look crispy and appetizing */}
<CloudinaryImage
  src="menu/pasta"
  preset="productSquare"
  effect="sharpen" // Secret sauce!
/>
```

---

## 🎯 What You Get Automatically

✅ **Perfect Sizes** - Every preset has optimal dimensions
✅ **Face Detection** - Team photos auto-center on faces
✅ **Auto Format** - WebP/AVIF for modern browsers
✅ **Lazy Loading** - Images load as you scroll
✅ **Responsive** - Different sizes for mobile/tablet/desktop
✅ **SEO Optimized** - Proper alt tags
✅ **Zero Vercel Impact** - Stays under 250MB limit
✅ **CDN Delivery** - Fast worldwide
✅ **Image Editing** - Filters and effects via simple props
✅ **Caching** - Images cached globally for speed

---

## 📊 Cloudinary Free Tier

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: Unlimited
- **Current Usage**: Check at https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/getting-started

---

## 🚀 Quick Start Checklist

For each new client project:

- [ ] Create client folder in Cloudinary (`client-name/`)
- [ ] Upload images to appropriate subfolders
- [ ] Install deps: `npm i @cloudinary/url-gen @cloudinary/react`
- [ ] Add to `.env.local`: `VITE_CLOUDINARY_CLOUD_NAME=ddfgfpelo`
- [ ] Import component: `import CloudinaryImage from '@/components/shared/CloudinaryImage'`
- [ ] Use in pages: `<CloudinaryImage src="client-name/portfolio/image-1" preset="portfolioHero" />`
- [ ] Test different presets and effects

---

## 🔍 Troubleshooting

**Image not showing?**
- Check filename matches exactly (case-sensitive)
- Verify image uploaded to Cloudinary
- Check browser console for errors

**Image looks wrong?**
- Try different presets
- Adjust with effects
- Check source image quality

**Want custom size?**
- Add new preset in `src/lib/cloudinary-config.ts`
- Define width, height, crop, gravity

**Need new effect?**
- Add to `IMAGE_EFFECTS` in `src/lib/cloudinary-config.ts`
- Use Cloudinary transformation syntax

---

*SISO-CLIENT-BASE Shared Component | Auto-Editing Built-In | Zero Photoshop Required*
