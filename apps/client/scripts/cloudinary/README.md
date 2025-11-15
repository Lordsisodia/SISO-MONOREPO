# 🎨 Cloudinary API Scripts

Quick reference for managing client portfolio images.

## ✅ Status: All Folders Created!

All 4 client projects have organized folder structures in Cloudinary:
- ✅ restaurant (portfolio, menu, team, hero, gallery)
- ✅ bike-rental (portfolio, products, team, hero, gallery)
- ✅ tour-guides (portfolio, destinations, team, hero, gallery)
- ✅ 5-star-hire (portfolio, services, team, hero, gallery)

**Total: 20 folders ready for images!**

---

## 🚀 Quick Start

### Upload Single Image
```bash
node scripts/cloudinary/upload-images.js restaurant portfolio ./image.jpg
```

### Upload Entire Folder
```bash
node scripts/cloudinary/upload-images.js restaurant portfolio ./images/ --batch
```

### List Uploaded Images
```bash
node scripts/cloudinary/upload-images.js restaurant portfolio --list
```

---

## 📁 Available Commands

### Folder Management (`setup-folders.js`)

```bash
# Create all folders (already done!)
node scripts/cloudinary/setup-folders.js setup

# List all folders
node scripts/cloudinary/setup-folders.js list

# Help
node scripts/cloudinary/setup-folders.js help
```

### Image Upload (`upload-images.js`)

```bash
# Upload single image
node scripts/cloudinary/upload-images.js <client> <folder> <image-path>

# Upload with custom name
node scripts/cloudinary/upload-images.js <client> <folder> <image-path> <custom-name>

# Upload directory (batch)
node scripts/cloudinary/upload-images.js <client> <folder> <directory-path> --batch

# List images in folder
node scripts/cloudinary/upload-images.js <client> <folder> --list

# Help
node scripts/cloudinary/upload-images.js help
```

---

## 🎯 Valid Clients
- `restaurant`
- `bike-rental`
- `tour-guides`
- `5-star-hire`

## 📁 Valid Folders
- `portfolio` - Portfolio showcase images
- `menu` / `products` / `services` / `destinations` - Product/service images
- `team` - Team member photos
- `hero` - Hero/banner images
- `gallery` - General gallery images

---

## 💡 Examples

### Restaurant Portfolio
```bash
# Upload hero image
node scripts/cloudinary/upload-images.js restaurant hero ~/Desktop/hero.jpg main-hero

# Upload portfolio images (batch)
node scripts/cloudinary/upload-images.js restaurant portfolio ~/Desktop/portfolio/ --batch

# Upload menu items
node scripts/cloudinary/upload-images.js restaurant menu ~/Desktop/food-photos/ --batch

# Check what's uploaded
node scripts/cloudinary/upload-images.js restaurant portfolio --list
```

### Bike Rental
```bash
# Upload bike product images
node scripts/cloudinary/upload-images.js bike-rental products ~/Desktop/bikes/ --batch

# Upload team photos
node scripts/cloudinary/upload-images.js bike-rental team ~/Desktop/team/ --batch
```

### Tour Guides
```bash
# Upload destination photos
node scripts/cloudinary/upload-images.js tour-guides destinations ~/Desktop/locations/ --batch

# Upload tour guide headshots
node scripts/cloudinary/upload-images.js tour-guides team ~/Desktop/guides/ --batch
```

---

## 📸 View in Dashboard

https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer

---

## 🎨 Use in Code

After uploading, use images in your React components:

```tsx
import CloudinaryImage from '@/components/shared/CloudinaryImage';

<CloudinaryImage
  src="restaurant/portfolio/modern-interior"
  alt="Modern restaurant interior"
  preset="portfolioHero"
  effect="vibrant"
/>
```

---

## 📚 Full Documentation

- **Comprehensive Guide**: `../../docs/CLOUDINARY-API-GUIDE.md`
- **Usage Examples**: `../../docs/CLOUDINARY-GUIDE.md`
- **Image Workflow**: `../../IMAGE-WORKFLOW.md`
- **Quick Setup**: `../../CLOUDINARY-SETUP.md`

---

*Ready to use | Folders created | Scripts tested ✅*
