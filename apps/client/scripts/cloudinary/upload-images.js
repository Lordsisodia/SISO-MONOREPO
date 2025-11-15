/**
 * 🎨 Cloudinary Image Upload Script
 *
 * Upload images to your client portfolios
 * Run: node scripts/cloudinary/upload-images.js <client> <folder> <image-path>
 *
 * Examples:
 *   node scripts/cloudinary/upload-images.js restaurant portfolio ./images/project-1.jpg
 *   node scripts/cloudinary/upload-images.js bike-rental products ./images/bike.jpg
 */

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join, basename, extname } from 'path';
import { existsSync, readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config({ path: join(__dirname, '../../.env.cloudinary') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddfgfpelo',
  api_key: process.env.CLOUDINARY_API_KEY || '512635148385397',
  api_secret: process.env.CLOUDINARY_API_SECRET || '2Jr3_bfqE9Z-k998wuKCIDlW3a8',
});

const CLIENTS = ['restaurant', 'bike-rental', 'tour-guides', '5-star-hire'];
const FOLDERS = ['portfolio', 'menu', 'products', 'services', 'destinations', 'team', 'hero', 'gallery'];

/**
 * Upload a single image
 */
async function uploadImage(clientName, folderName, imagePath, customName = null) {
  const folderPath = `${clientName}/${folderName}`;

  // Validate client and folder
  if (!CLIENTS.includes(clientName)) {
    console.error(`❌ Invalid client: ${clientName}`);
    console.error(`   Valid clients: ${CLIENTS.join(', ')}`);
    return false;
  }

  // Check if file exists
  if (!existsSync(imagePath)) {
    console.error(`❌ File not found: ${imagePath}`);
    return false;
  }

  try {
    const fileName = customName || basename(imagePath, extname(imagePath));

    console.log(`📤 Uploading: ${imagePath}`);
    console.log(`   → Destination: ${folderPath}/${fileName}`);

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folderPath,
      public_id: fileName,
      overwrite: true,
      resource_type: 'auto',
    });

    console.log(`✅ Uploaded successfully!`);
    console.log(`   📷 URL: ${result.secure_url}`);
    console.log(`   📐 Size: ${result.width}x${result.height}`);
    console.log(`   💾 Format: ${result.format}`);
    console.log('');

    return result;
  } catch (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    return false;
  }
}

/**
 * Upload multiple images from a directory
 */
async function uploadDirectory(clientName, folderName, dirPath) {
  const folderPath = `${clientName}/${folderName}`;

  if (!existsSync(dirPath)) {
    console.error(`❌ Directory not found: ${dirPath}`);
    return;
  }

  const files = readdirSync(dirPath);
  const imageFiles = files.filter((file) => {
    const ext = extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.error(`❌ No images found in: ${dirPath}`);
    return;
  }

  console.log(`📁 Found ${imageFiles.length} images in ${dirPath}`);
  console.log(`📤 Uploading to: ${folderPath}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const file of imageFiles) {
    const imagePath = join(dirPath, file);
    const result = await uploadImage(clientName, folderName, imagePath);

    if (result) {
      successCount++;
    } else {
      failCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n📊 Upload Summary:');
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📁 Total: ${imageFiles.length}\n`);
}

/**
 * List images in a folder
 */
async function listImages(clientName, folderName) {
  const folderPath = `${clientName}/${folderName}`;

  console.log(`📁 Listing images in: ${folderPath}\n`);

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
    });

    if (result.resources && result.resources.length > 0) {
      console.log(`Found ${result.resources.length} images:\n`);

      for (const resource of result.resources) {
        const filename = basename(resource.public_id);
        console.log(`   📷 ${filename}`);
        console.log(`      Size: ${resource.width}x${resource.height}`);
        console.log(`      Format: ${resource.format}`);
        console.log(`      URL: ${resource.secure_url}`);
        console.log('');
      }
    } else {
      console.log('No images found in this folder.');
      console.log('Upload some images first!\n');
    }
  } catch (error) {
    console.error(`❌ Error listing images: ${error.message}`);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);

  console.log('\n🎨 Cloudinary Image Upload Tool\n');

  // Verify configuration
  if (!cloudinary.config().cloud_name || !cloudinary.config().api_key) {
    console.error('❌ Error: Cloudinary credentials not found!');
    console.error('Make sure .env.cloudinary exists\n');
    process.exit(1);
  }

  console.log(`✅ Connected to: ${cloudinary.config().cloud_name}\n`);

  if (args.length === 0 || args[0] === 'help') {
    console.log('Usage:');
    console.log('');
    console.log('Upload single image:');
    console.log('   node scripts/cloudinary/upload-images.js <client> <folder> <image-path> [custom-name]');
    console.log('');
    console.log('Upload directory:');
    console.log('   node scripts/cloudinary/upload-images.js <client> <folder> <directory-path> --batch');
    console.log('');
    console.log('List images:');
    console.log('   node scripts/cloudinary/upload-images.js <client> <folder> --list');
    console.log('');
    console.log('Examples:');
    console.log('   node scripts/cloudinary/upload-images.js restaurant portfolio ./image.jpg');
    console.log('   node scripts/cloudinary/upload-images.js restaurant portfolio ./images/ --batch');
    console.log('   node scripts/cloudinary/upload-images.js restaurant portfolio --list');
    console.log('');
    console.log('Valid clients:');
    console.log(`   ${CLIENTS.join(', ')}`);
    console.log('');
    console.log('Valid folders:');
    console.log(`   ${FOLDERS.join(', ')}`);
    console.log('');
    return;
  }

  const [clientName, folderName, pathOrFlag, customNameOrFlag] = args;

  // List images
  if (pathOrFlag === '--list') {
    await listImages(clientName, folderName);
    return;
  }

  // Upload directory
  if (customNameOrFlag === '--batch' || pathOrFlag.endsWith('/')) {
    await uploadDirectory(clientName, folderName, pathOrFlag);
    return;
  }

  // Upload single image
  await uploadImage(clientName, folderName, pathOrFlag, customNameOrFlag);
}

// Run
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
