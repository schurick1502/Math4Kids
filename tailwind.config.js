/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#9333ea',
          pink: '#ec4899',
          blue: '#3b82f6',
          amber: '#f59e0b',
        },
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '70%': { transform: 'scale(1.15)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        rise: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fall: {
          '0%': { transform: 'translate3d(0, -10vh, 0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translate3d(var(--drift), 105vh, 0) rotate(720deg)', opacity: '0.9' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -30px, 0) rotate(8deg)' },
        },
      },
      animation: {
        pop: 'pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        shake: 'shake 0.4s ease-in-out',
        rise: 'rise 0.35s ease-out both',
        fall: 'fall var(--duration) linear var(--delay) forwards',
        drift: 'drift 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
