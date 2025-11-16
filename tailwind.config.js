/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Optimierung für kleinere Bundle-Größe
  corePlugins: {
    // Deaktiviere nicht benötigte Plugins
    preflight: true,
  },
  // Safelist für dynamische Klassen
  safelist: [
    // Wichtige dynamische Klassen behalten
    'animate-blob',
    'animate-float',
    'animation-delay-2000',
    'animation-delay-4000',
    'blur-lg',
    'blur-xl',
    'blur-2xl',
  ]
}



