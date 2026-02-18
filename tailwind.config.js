/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'royal-gold': '#D4AF37', // Metallic Gold
        'imperial-gold': '#FFD700', // Bright Gold
        'antique-gold': '#AA8C30', // Darker Gold
        'royal-purple': '#4B0082', // Deep Indigo/Purple
        'neon-purple': '#9D00FF', // Vibrant Purple
        'velvet-red': '#800020', // Burgundy
        'crimson-red': '#DC143C', // Bright Red
        'rich-black': '#050505', // True black
        'charcoal': '#121212',
        'off-white': '#FAF9F6',
        'noble-white': '#DEDEDE',
        'bronze': '#CD7F32',
        'neon-green': '#39FF14',
        'deep-saffron': '#FF9933',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'pattern-mandala': "url('https://www.transparenttextures.com/patterns/black-scales.png')", // Subtle texture placeholder
      }
    },
  },
  plugins: [],
}
