#!/usr/bin/env node

/**
 * SCSS Watcher with Auto Cache Busting
 * Watches CSS file and automatically updates index.html with new timestamps
 */

import { watch } from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cssPath = join(__dirname, 'src/css/main.css');

console.log('👀 Watching CSS file for changes...');
console.log('📂 File:', cssPath);
console.log('🔄 Auto cache-busting enabled\n');

let debounceTimer;

watch(cssPath, (eventType) => {
  if (eventType === 'change') {
    // Debounce to avoid multiple rapid updates
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`\n🔄 CSS changed! Busting cache...`);
      exec('node cache-bust.js', (error, stdout, stderr) => {
        if (error) {
          console.error('❌ Error:', error.message);
          return;
        }
        if (stderr) {
          console.error('⚠️  Warning:', stderr);
        }
        console.log(stdout);
        console.log('👀 Still watching for changes...\n');
      });
    }, 300);
  }
});

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopped watching. Goodbye!');
  process.exit(0);
});

