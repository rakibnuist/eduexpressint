#!/usr/bin/env node

/**
 * Logo Size Generation Script
 * 
 * This script generates multiple logo sizes from a source logo file.
 * It uses Sharp for image processing to create optimized versions
 * for different use cases (navbar, footer, favicon, etc.)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Sharp is available
let sharp;
try {
  sharp = await import('sharp');
} catch (error) {
  console.error('❌ Sharp is not installed. Please install it first:');
  console.error('npm install sharp');
  process.exit(1);
}

const sourceLogoPath = path.join(__dirname, '../public/logo.png');
const brandDir = path.join(__dirname, '../public/brand');

// Logo size configurations
const logoConfigs = [
  // Navbar sizes
  { name: 'logo-24.png', size: 24, description: 'Navbar small' },
  { name: 'logo-32.png', size: 32, description: 'Navbar medium' },
  { name: 'logo-48.png', size: 48, description: 'Navbar large' },
  
  // Footer sizes
  { name: 'logo-64.png', size: 64, description: 'Footer standard' },
  { name: 'logo-96.png', size: 96, description: 'Footer large' },
  
  // General purpose
  { name: 'logo-128.png', size: 128, description: 'General medium' },
  { name: 'logo-256.png', size: 256, description: 'General large' },
  
  // Dark theme versions (if needed)
  { name: 'logo-on-dark-24.png', size: 24, description: 'Dark theme navbar small' },
  { name: 'logo-on-dark-32.png', size: 32, description: 'Dark theme navbar medium' },
  { name: 'logo-on-dark-48.png', size: 48, description: 'Dark theme navbar large' },
  { name: 'logo-on-dark-64.png', size: 64, description: 'Dark theme footer standard' },
  { name: 'logo-on-dark-96.png', size: 96, description: 'Dark theme footer large' },
  { name: 'logo-on-dark-128.png', size: 128, description: 'Dark theme general medium' },
  { name: 'logo-on-dark-256.png', size: 256, description: 'Dark theme general large' },
];

// Ensure brand directory exists
if (!fs.existsSync(brandDir)) {
  fs.mkdirSync(brandDir, { recursive: true });
  console.log('📁 Created brand directory:', brandDir);
}

// Function to generate logo sizes
async function generateLogoSizes() {
  console.log('🎨 Generating logo sizes...');

  // Check if source logo exists
  if (!fs.existsSync(sourceLogoPath)) {
    console.error('❌ Source logo not found at:', sourceLogoPath);
    console.log('💡 Please place your logo file at public/logo.png');
    return;
  }

  console.log('📄 Source logo found:', sourceLogoPath);

  let generatedCount = 0;
  let errorCount = 0;

  for (const config of logoConfigs) {
    try {
      const outputPath = path.join(brandDir, config.name);
      
      await sharp.default(sourceLogoPath)
        .resize(config.size, config.size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(outputPath);

      console.log(`✅ Generated: ${config.name} (${config.size}x${config.size}) - ${config.description}`);
      generatedCount++;
    } catch (error) {
      console.error(`❌ Error generating ${config.name}:`, error.message);
      errorCount++;
    }
  }

  // Generate a base logo (original size, optimized)
  try {
    const baseOutputPath = path.join(brandDir, 'logo-base.png');
    await sharp.default(sourceLogoPath)
      .png({ quality: 95, compressionLevel: 8 })
      .toFile(baseOutputPath);
    
    console.log(`✅ Generated: logo-base.png (original size, optimized)`);
    generatedCount++;
  } catch (error) {
    console.error(`❌ Error generating base logo:`, error.message);
    errorCount++;
  }

  console.log(`\n🎉 Logo generation complete!`);
  console.log(`✅ Generated: ${generatedCount} logo files`);
  if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
  }
  console.log(`📁 Output directory: ${brandDir}`);
  
  // Generate usage instructions
  console.log(`\n📖 Usage Instructions:`);
  console.log(`- Navbar: Use logo-32.png or logo-48.png`);
  console.log(`- Footer: Use logo-64.png or logo-96.png`);
  console.log(`- General: Use logo-128.png or logo-256.png`);
  console.log(`- Dark themes: Use logo-on-dark-* variants`);
  console.log(`- Original: Use logo-base.png for high-res needs`);
}

// Run the script
generateLogoSizes().catch(console.error);
