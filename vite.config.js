// ============================================
// Vite Configuration
// ============================================
// Development server with HMR and cache busting

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Root directory
  root: '.',
  
  // Public directory for static assets
  publicDir: 'src',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    cors: true,
    hmr: {
      overlay: true, // Show errors as overlay
    },
    // Force reload on these file changes
    watch: {
      usePolling: true, // Better for some file systems
    },
    // Aggressive cache control headers
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    }
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Cache busting with content hashing
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  
  // Cache busting - force reload CSS in dev mode
  optimizeDeps: {
    force: true,
  },
});
