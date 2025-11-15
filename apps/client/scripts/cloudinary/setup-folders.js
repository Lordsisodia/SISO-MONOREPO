/**
 * 🎨 Cloudinary Folder Setup Script
 *
 * Creates organized folder structure for all client projects
 * Run: node scripts/cloudinary/setup-folders.js
 */

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

// Client projects configuration
const CLIENTS = [
  {
    name: 'restaurant',
    displayName: 'Restaurant Portfolio (Restraunt project)',
    folders: ['portfolio', 'menu', 'team', 'hero', 'gallery'],
  },
  {
    name: 'bike-rental',
    displayName: 'Bike Rental Template',
    folders: ['portfolio', 'products', 'team', 'hero', 'gallery'],
  },
  {
    name: 'tour-guides',
    displayName: 'Tour Guides Template',
    folders: ['portfolio', 'destinations', 'team', 'hero', 'gallery'],
  },
  {
    name: '5-star-hire',
    displayName: '5 Star Hire',
    folders: ['portfolio', 'services', 'team', 'hero', 'gallery'],
  },
];

/**
 * Create folders in Cloudinary
 * Note: Cloudinary creates folders automatically when you upload to them
 * This script creates placeholder assets to establish the folder structure
 */
async function createFolderStructure() {
  console.log('🎨 Setting up Cloudinary folder structure...\n');

  for (const client of CLIENTS) {
    console.log(`📁 Creating folders for: ${client.displayName}`);

    for (const folder of client.folders) {
      const folderPath = `${client.name}/${folder}`;

      try {
        // Upload a tiny placeholder to create the folder
        // We'll use a 1x1 transparent pixel
        const result = await cloudinary.uploader.upload(
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          {
            folder: folderPath,
            public_id: '.placeholder',
            overwrite: true,
            resource_type: 'image',
          }
        );

        console.log(`   ✅ ${folderPath}`);
      } catch (error) {
        console.log(`   ❌ ${folderPath} - ${error.message}`);
      }
    }

    console.log('');
  }

  console.log('✨ Folder structure created!\n');
  console.log('📋 Summary:');
  console.log(`   - ${CLIENTS.length} client projects`);
  console.log(`   - ${CLIENTS.reduce((sum, c) => sum + c.folders.length, 0)} folders total\n`);
  console.log('🎯 Next steps:');
  console.log('   1. Go to Cloudinary dashboard');
  console.log('   2. Upload your client images to the appropriate folders');
  console.log('   3. Use CloudinaryImage component in your code\n');
  console.log('📸 Dashboard: https://console.cloudinary.com/pm/c-4fe9b087e1f6b59df09ceb06e7a7a4/media-explorer\n');
}

/**
 * List existing folders in Cloudinary
 */
async function listFolders() {
  console.log('📁 Listing existing folders in Cloudinary...\n');

  try {
    const result = await cloudinary.api.root_folders();

    if (result.folders && result.folders.length > 0) {
      console.log('Found folders:');
      for (const folder of result.folders) {
        console.log(`   📁 ${folder.name}`);

        // List subfolders
        try {
          const subResult = await cloudinary.api.sub_folders(folder.name);
          if (subResult.folders && subResult.folders.length > 0) {
            for (const subfolder of subResult.folders) {
              console.log(`      📁 ${folder.name}/${subfolder.name}`);
            }
          }
        } catch (error) {
          // Ignore subfolder errors
        }
      }
    } else {
      console.log('No folders found. Run setup to create them.');
    }

    console.log('');
  } catch (error) {
    console.error('Error listing folders:', error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';

  console.log('\n🎨 Cloudinary Folder Manager\n');

  // Verify configuration
  if (!cloudinary.config().cloud_name || !cloudinary.config().api_key) {
    console.error('❌ Error: Cloudinary credentials not found!');
    console.error('Make sure .env.cloudinary exists with:');
    console.error('   VITE_CLOUDINARY_CLOUD_NAME=ddfgfpelo');
    console.error('   CLOUDINARY_API_KEY=your_key');
    console.error('   CLOUDINARY_API_SECRET=your_secret\n');
    process.exit(1);
  }

  console.log(`✅ Connected to Cloudinary: ${cloudinary.config().cloud_name}\n`);

  switch (command) {
    case 'setup':
      await createFolderStructure();
      break;

    case 'list':
      await listFolders();
      break;

    case 'help':
      console.log('Commands:');
      console.log('   setup  - Create folder structure for all clients (default)');
      console.log('   list   - List existing folders');
      console.log('   help   - Show this help message\n');
      break;

    default:
      console.log(`Unknown command: ${command}`);
      console.log('Run with "help" to see available commands\n');
  }
}

// Run
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
