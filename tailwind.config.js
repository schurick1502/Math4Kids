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
  // Optimization for smaller bundle size
  corePlugins: {
    // Disable unused plugins
    preflight: true,
  },
  // Safelist for dynamic classes
  safelist: [
    // Keep important dynamic classes
    'animate-blob',
    'animate-float',
    'animation-delay-2000',
    'animation-delay-4000',
    'blur-lg',
    'blur-xl',
    'blur-2xl',
  ]
}
