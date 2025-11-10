// ============================================
// Build Script for Production Deployment
// ============================================
// Copies all necessary files to dist/ folder

import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = join(__dirname, 'dist');

// Clean dist directory
console.log('🧹 Cleaning dist directory...');
if (existsSync(DIST_DIR)) {
  rmSync(DIST_DIR, { recursive: true, force: true });
}
mkdirSync(DIST_DIR, { recursive: true });

// Copy directory recursively
function copyDir(src, dest, exclude = []) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src);

  for (const entry of entries) {
    // Skip excluded directories/files
    if (exclude.includes(entry)) {
      continue;
    }

    const srcPath = join(src, entry);
    const destPath = join(dest, entry);

    if (statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath, exclude);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Copy HTML files
console.log('📄 Copying HTML files...');
const htmlFiles = ['index.html', 'tanusitvanyok.html', 'segitseg.html', 'rss.html'];
htmlFiles.forEach(file => {
  if (existsSync(file)) {
    copyFileSync(file, join(DIST_DIR, file));
    console.log(`  ✓ ${file}`);
  }
});

// Copy src directory (excluding SCSS source files and source maps)
console.log('📦 Copying src directory...');
const srcDir = join(__dirname, 'src');
const destSrcDir = join(DIST_DIR, 'src');
const excludeDirs = ['scss', 'styles-legacy'];

// Copy with exclusions
function copyWithExclusions(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src);

  for (const entry of entries) {
    // Skip excluded directories
    if (excludeDirs.includes(entry)) {
      continue;
    }

    // Skip source map files in production
    if (entry.endsWith('.map')) {
      continue;
    }

    // Skip unoptimized large background image
    if (entry === 'bg-large.png') {
      continue;
    }

    const srcPath = join(src, entry);
    const destPath = join(dest, entry);

    if (statSync(srcPath).isDirectory()) {
      copyWithExclusions(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

copyWithExclusions(srcDir, destSrcDir);
console.log('  ✓ src/ (excluding SCSS sources and source maps)');

// Copy other necessary files
console.log('📋 Copying additional files...');
const additionalFiles = ['favicon.ico', 'robots.txt'];
additionalFiles.forEach(file => {
  if (existsSync(file)) {
    copyFileSync(file, join(DIST_DIR, file));
    console.log(`  ✓ ${file}`);
  }
});

console.log('');
console.log('✅ Build complete! Output directory: dist/');
console.log('');

