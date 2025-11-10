#!/usr/bin/env node

/**
 * Cache Buster Script
 * Adds timestamp query parameters to CSS links in index.html
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPath = join(__dirname, 'index.html');
const timestamp = Date.now();

try {
  let html = readFileSync(indexPath, 'utf-8');
  
  // Replace CSS links with timestamp query parameter
  html = html.replace(
    /href="([^"]*\.css)(\?v=\d+)?"/g,
    `href="$1?v=${timestamp}"`
  );
  
  writeFileSync(indexPath, html, 'utf-8');
  console.log(`✅ Cache busted! Timestamp: ${timestamp}`);
  console.log(`📝 Updated: index.html`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}

