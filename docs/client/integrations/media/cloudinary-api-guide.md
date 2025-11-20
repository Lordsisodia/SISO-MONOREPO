# 🚀 Cloudinary API Management Guide

## ✅ Folders Created Successfully!

All client portfolio folders have been set up in Cloudinary:

```
✅ restaurant/
   ├── portfolio
   ├── menu
   ├── team
   ├── hero
   └── gallery

✅ bike-rental/
   ├── portfolio
   ├── products
   ├── team
   ├── hero
   └── gallery

✅ tour-guides/
   ├── portfolio
   ├── destinations
   ├── team
   ├── hero
   └── gallery

✅ 5-star-hire/
   ├── portfolio
   ├── services
   ├── team
   ├── hero
   └── gallery
```

---

## 📸 View in Cloudinary Dashboard

**Go to**: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer

You'll see all folders organized by client!

---

## 🛠️ API Scripts Available

### 1. **Folder Management**

```bash
# Create folder structure
node scripts/cloudinary/setup-folders.js setup

# List all folders
node scripts/cloudinary/setup-folders.js list

# Show help
node scripts/cloudinary/setup-folders.js help
```

### 2. **Image Upload**

```bash
# Upload single image
node scripts/cloudinary/upload-images.js <client> <folder> <image-path>

# Examples:
node scripts/cloudinary/upload-images.js restaurant portfolio ./image.jpg
node scripts/cloudinary/upload-images.js bike-rental products ./bike-photo.jpg

# Upload entire directory
node scripts/cloudinary/upload-images.js restaurant portfolio ./images/ --batch

# List images in a folder
node scripts/cloudinary/upload-images.js restaurant portfolio --list

# Upload with custom name
node scripts/cloudinary/upload-images.js restaurant hero ./photo.jpg hero-main
```

---

## 📤 How to Upload Your Client Images

### Method 1: Via Dashboard (Easiest)

1. **Go to Cloudinary**: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer
2. **Navigate to folder**: Click `restaurant` → `portfolio`
3. **Drag & drop images** directly into the folder
4. **Done!** Images are now available

### Method 2: Via API Script (Bulk Upload)

```bash
# If you have a folder of restaurant portfolio images:
cd SISO-CLIENT-BASE

# Upload all images at once
node scripts/cloudinary/upload-images.js restaurant portfolio ../path-to-images/ --batch
```

### Method 3: Single Image Upload

```bash
# Upload one image at a time
node scripts/cloudinary/upload-images.js restaurant portfolio ~/Desktop/restaurant-interior.jpg
```

---

## 🎨 Using Uploaded Images in Code

Once images are uploaded, use them in your client projects:

### Example 1: Restaurant Portfolio

```tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';

export default function RestaurantPortfolio() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Image uploaded to: restaurant/portfolio/modern-interior.jpg */}
      <CloudinaryImage
        src="restaurant/portfolio/modern-interior"
        alt="Modern interior design"
        preset="portfolioHero"
        effect="vibrant"
      />

      {/* Image uploaded to: restaurant/menu/pasta-carbonara.jpg */}
      <CloudinaryImage
        src="restaurant/menu/pasta-carbonara"
        alt="Creamy pasta"
        preset="productSquare"
        effect="sharpen"
      />

      {/* Image uploaded to: restaurant/team/chef-john.jpg */}
      <CloudinaryImage
        src="restaurant/team/chef-john"
        alt="Chef John"
        preset="teamMember"
        className="rounded-full"
      />
    </div>
  );
}
```

### Example 2: Bike Rental Products

```tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';

const bikes = [
  { name: 'Mountain Bike', image: 'bike-rental/products/mountain-bike' },
  { name: 'Road Bike', image: 'bike-rental/products/road-bike' },
  { name: 'Electric Bike', image: 'bike-rental/products/electric-bike' },
];

export default function BikeRental() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <CloudinaryImage
          key={bike.name}
          src={bike.image}
          alt={bike.name}
          preset="productWide"
          effect="sharpen"
        />
      ))}
    </div>
  );
}
```

---

## 🔍 Checking What's Uploaded

### List All Images in a Folder

```bash
# See what's in restaurant portfolio
node scripts/cloudinary/upload-images.js restaurant portfolio --list

# See what's in bike-rental products
node scripts/cloudinary/upload-images.js bike-rental products --list

# See team photos
node scripts/cloudinary/upload-images.js restaurant team --list
```

**Output Example:**
```
📁 Listing images in: restaurant/portfolio

Found 5 images:

   📷 modern-interior
      Size: 1920x1280
      Format: jpg
      URL: https://res.cloudinary.com/ddfgfpelo/image/upload/v.../restaurant/portfolio/modern-interior.jpg

   📷 outdoor-patio
      Size: 1800x1200
      Format: jpg
      URL: https://res.cloudinary.com/ddfgfpelo/...
```

---

## 📋 Workflow for Each Client Project

### Step 1: Gather Client Images
- Get portfolio photos from client
- Get product/menu photos
- Get team headshots
- Get hero banner images

### Step 2: Organize Locally (Optional)
Create local folders matching Cloudinary structure:
```
client-images/
├── portfolio/
│   ├── project-1.jpg
│   ├── project-2.jpg
│   └── project-3.jpg
├── menu/
│   ├── dish-1.jpg
│   └── dish-2.jpg
└── team/
    ├── chef.jpg
    └── manager.jpg
```

### Step 3: Bulk Upload
```bash
# Upload all portfolio images
node scripts/cloudinary/upload-images.js restaurant portfolio ./client-images/portfolio/ --batch

# Upload all menu images
node scripts/cloudinary/upload-images.js restaurant menu ./client-images/menu/ --batch

# Upload all team images
node scripts/cloudinary/upload-images.js restaurant team ./client-images/team/ --batch
```

### Step 4: Use in Code
```tsx
<CloudinaryImage
  src="restaurant/portfolio/project-1"
  alt="Project showcase"
  preset="portfolioHero"
  effect="vibrant"
/>
```

### Step 5: Test Different Effects
```tsx
// Try different effects to see what looks best
<CloudinaryImage src="restaurant/menu/dish-1" preset="productSquare" effect="sharpen" />
<CloudinaryImage src="restaurant/menu/dish-1" preset="productSquare" effect="vibrant" />
<CloudinaryImage src="restaurant/menu/dish-1" preset="productSquare" effect="warm" />
```

---

## 🎯 Real-World Example: Restaurant Client

### Upload Images

```bash
# Navigate to SISO-CLIENT-BASE
cd SISO-CLIENT-BASE

# Upload hero image
node scripts/cloudinary/upload-images.js restaurant hero ~/Desktop/restaurant-hero.jpg main-hero

# Upload portfolio images (batch)
node scripts/cloudinary/upload-images.js restaurant portfolio ~/Desktop/portfolio-images/ --batch

# Upload menu items
node scripts/cloudinary/upload-images.js restaurant menu ~/Desktop/menu-photos/ --batch

# Upload team photos
node scripts/cloudinary/upload-images.js restaurant team ~/Desktop/team-photos/ --batch
```

### Verify Uploads

```bash
# Check what got uploaded
node scripts/cloudinary/upload-images.js restaurant portfolio --list
node scripts/cloudinary/upload-images.js restaurant menu --list
node scripts/cloudinary/upload-images.js restaurant team --list
```

### Use in Portfolio Page

```tsx
// src/pages/RestaurantPortfolio.tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';
import { CloudinaryBackground } from '@/components/shared/CloudinaryImage';

export default function RestaurantPortfolio() {
  return (
    <div>
      {/* Hero Section */}
      <CloudinaryBackground
        src="restaurant/hero/main-hero"
        preset="heroFull"
        effect="warm"
        className="h-screen flex items-center justify-center text-white"
      >
        <h1 className="text-6xl font-bold">Welcome to Our Restaurant</h1>
      </CloudinaryBackground>

      {/* Portfolio Grid */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold mb-8">Our Spaces</h2>
        <div className="grid grid-cols-3 gap-6">
          <CloudinaryImage
            src="restaurant/portfolio/modern-interior"
            alt="Modern interior"
            preset="portfolioHero"
            effect="vibrant"
            className="rounded-lg shadow-lg"
          />
          <CloudinaryImage
            src="restaurant/portfolio/outdoor-patio"
            alt="Outdoor patio"
            preset="portfolioHero"
            effect="warm"
            className="rounded-lg shadow-lg"
          />
          <CloudinaryImage
            src="restaurant/portfolio/private-dining"
            alt="Private dining"
            preset="portfolioHero"
            effect="sharpen"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Menu Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold mb-8">Our Menu</h2>
        <div className="grid grid-cols-4 gap-4">
          <CloudinaryImage
            src="restaurant/menu/pasta-carbonara"
            alt="Pasta Carbonara"
            preset="productSquare"
            effect="sharpen"
          />
          <CloudinaryImage
            src="restaurant/menu/grilled-salmon"
            alt="Grilled Salmon"
            preset="productSquare"
            effect="sharpen"
          />
          {/* More menu items... */}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto py-16">
        <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
        <div className="flex gap-8 justify-center">
          <div className="text-center">
            <CloudinaryImage
              src="restaurant/team/chef-john"
              alt="Chef John"
              preset="teamMember"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Chef John</h3>
            <p className="text-gray-600">Head Chef</p>
          </div>
          <div className="text-center">
            <CloudinaryImage
              src="restaurant/team/manager-sarah"
              alt="Sarah Martinez"
              preset="teamMember"
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">Sarah Martinez</h3>
            <p className="text-gray-600">Restaurant Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 💡 Pro Tips

### 1. Name Files Descriptively Before Upload
```bash
# Good names:
- restaurant-modern-interior-night.jpg
- pasta-carbonara-closeup.jpg
- chef-john-headshot.jpg

# Avoid:
- IMG_1234.jpg
- photo.jpg
- untitled.jpg
```

### 2. Use Batch Upload for Multiple Files
```bash
# Much faster than one-by-one
node scripts/cloudinary/upload-images.js restaurant portfolio ./images/ --batch
```

### 3. Check Uploads Before Using
```bash
# Always verify what got uploaded
node scripts/cloudinary/upload-images.js restaurant portfolio --list
```

### 4. Test Effects in Code
```tsx
// Try different effects to see what works best
<CloudinaryImage src="photo" preset="portfolioHero" effect="vibrant" />
<CloudinaryImage src="photo" preset="portfolioHero" effect="warm" />
<CloudinaryImage src="photo" preset="portfolioHero" effect="cool" />
```

---

## 🔐 Security Note

**API Keys are already configured** in `.env.cloudinary`:
- ✅ Cloud name: `ddfgfpelo`
- ✅ API key: `512635148385397`
- ✅ API secret: `2Jr3_bfqE9Z-k998wuKCIDlW3a8`

**This file is gitignored** - never commit it!

---

## 📊 Usage Monitoring

**Free Tier Limits:**
- Storage: 25 GB
- Bandwidth: 25 GB/month
- Transformations: Unlimited

**Check usage**: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/getting-started

---

## 🎉 You're All Set!

**Folders created ✅**
**Scripts ready ✅**
**Components built ✅**
**Documentation complete ✅**

### Next Steps:

1. **Upload images** (via dashboard or script)
2. **Use in code** with `<CloudinaryImage>`
3. **Try different presets and effects**
4. **Enjoy zero Vercel impact!**

---

*API-powered | Bulk upload ready | Zero Photoshop required*
