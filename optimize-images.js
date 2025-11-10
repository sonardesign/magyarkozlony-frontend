// ============================================
// Image Optimization Script
// ============================================
// Optimizes bg-large.png for web performance using Sharp

import sharp from 'sharp';
import { existsSync, statSync } from 'fs';
import { join } from 'path';

const IMAGE_PATH = 'src/images/bg-large.png';
const OUTPUT_JPG = 'src/images/bg-optimized.jpg';
const OUTPUT_WEBP = 'src/images/bg-optimized.webp';

async function optimizeImage() {
  console.log('🖼️  Optimizing background image...\n');

  // Check if original exists
  if (!existsSync(IMAGE_PATH)) {
    console.error('❌ Original image not found:', IMAGE_PATH);
    process.exit(1);
  }

  const originalStats = statSync(IMAGE_PATH);
  const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
  console.log(`📊 Original: ${originalSize} MB (${IMAGE_PATH})`);

  try {
    // Get image metadata
    const metadata = await sharp(IMAGE_PATH).metadata();
    console.log(`📐 Dimensions: ${metadata.width}x${metadata.height}`);
    
    // Determine if resize is needed (max 1920 width for background)
    const maxWidth = 1920;
    const shouldResize = metadata.width > maxWidth;
    
    // Create Sharp instance
    let image = sharp(IMAGE_PATH);
    
    if (shouldResize) {
      console.log(`🔧 Resizing to ${maxWidth}px width...`);
      image = image.resize(maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Optimize as JPG (best for photos/backgrounds)
    console.log('💾 Creating optimized JPG...');
    await image
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true
      })
      .toFile(OUTPUT_JPG);

    const jpgStats = statSync(OUTPUT_JPG);
    const jpgSize = (jpgStats.size / 1024).toFixed(2);
    const jpgSavings = ((1 - jpgStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`   ✓ ${OUTPUT_JPG}`);
    console.log(`   📦 Size: ${jpgSize} KB (${jpgSavings}% smaller)`);

    // Create WebP version (modern format, even better compression)
    console.log('💾 Creating WebP version...');
    await sharp(IMAGE_PATH)
      .resize(shouldResize ? maxWidth : null, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(OUTPUT_WEBP);

    const webpStats = statSync(OUTPUT_WEBP);
    const webpSize = (webpStats.size / 1024).toFixed(2);
    const webpSavings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
    console.log(`   ✓ ${OUTPUT_WEBP}`);
    console.log(`   📦 Size: ${webpSize} KB (${webpSavings}% smaller)`);

    console.log('\n✅ Optimization complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update SCSS files to use optimized images:');
    console.log('      • Replace "bg-large.png" with "bg-optimized.jpg"');
    console.log('      • Or use WebP with fallback for best performance');
    console.log('   2. Run: npm run scss:build');
    console.log('   3. Run: npm run build');
    console.log('\n💡 For modern browsers, use WebP. JPG is the fallback.');

  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
    
    if (error.message.includes('sharp')) {
      console.log('\n🔧 Installing sharp...');
      console.log('   Run: npm install');
    }
    
    process.exit(1);
  }
}

optimizeImage();
