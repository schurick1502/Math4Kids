import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Wichtig für Capacitor/Android
  build: {
    outDir: 'dist',
    // Performance-Optimierungen
    minify: 'terser', // Bessere Komprimierung als esbuild
    terserOptions: {
      compress: {
        drop_console: true, // Entfernt console.log in Production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Entfernt weitere Console-Aufrufe
        passes: 2, // Mehrfache Optimierung
      },
      format: {
        comments: false, // Entfernt Kommentare
      },
    },
    // Bessere Sourcemaps für Production-Debugging (optional)
    sourcemap: false, // Ausgeschaltet für kleinere Bundle-Größe
    rollupOptions: {
      output: {
        // Code-Splitting für bessere Performance
        manualChunks: (id) => {
          // React Vendor Chunk
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Icons Chunk (lucide-react kann groß sein)
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // Alle anderen node_modules in einen Chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimierte Dateinamen für Caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // Compact output für kleinere Dateien
        compact: true,
      },
    },
    // Erhöhte Chunk-Warnungsgrenze (für große Icons)
    chunkSizeWarningLimit: 1000,
    // CSS Code-Splitting
    cssCodeSplit: true,
  },
  // Optimierung für Development
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    // Pre-bundling für schnellere Entwicklung
    force: false,
  },
  // Performance-Optimierungen
  server: {
    // Komprimierung für Development-Server
    compress: true,
  },
  // Preload-Module für bessere Performance
  esbuild: {
    // Entfernt console.log auch in Development
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },
})



