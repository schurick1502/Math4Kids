import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Important for Capacitor/Android
  build: {
    outDir: 'dist',
    // Performance optimizations
    minify: 'terser', // Better compression than esbuild
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Removes additional console calls
        passes: 2, // Multiple optimization passes
      },
      format: {
        comments: false, // Removes comments
      },
    },
    // Better sourcemaps for production debugging (optional)
    sourcemap: false, // Disabled for smaller bundle size
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: (id) => {
          // React Vendor Chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Icons Chunk (lucide-react can be large)
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // All other node_modules in one chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimized filenames for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Compact output for smaller files
        compact: true,
      },
    },
    // Increased chunk warning limit (for large icons)
    chunkSizeWarningLimit: 1000,
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimization for development
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    // Pre-bundling for faster development
    force: false,
  },
  // Performance optimizations
  server: {
    // Compression for development server
    compress: true,
  },
  // Preload modules for better performance
  esbuild: {
    // Removes console.log also in development
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})
