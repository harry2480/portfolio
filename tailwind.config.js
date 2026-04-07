/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans JP"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', '"Helvetica Neue"', 'Arial'],
        'oswald': ['Oswald', '"Noto Sans JP"', 'sans-serif'],
        'inter': ['Inter', '"Noto Sans JP"', 'sans-serif'],
        'archivo': ['"Archivo Narrow"', '"Noto Sans JP"', 'sans-serif'],
        'playfair': ['"Playfair Display"', '"Noto Sans JP"', 'serif'],
        'poppins': ['Poppins', '"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#050505',
          gray: '#1a1a1a',
          silver: '#e0e0e0',
          accent: '#FF0033',
          blue: '#0033FF',
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #202020 1px, transparent 1px), linear-gradient(to bottom, #202020 1px, transparent 1px)",
      }
    }
  },
  plugins: [],
}
module.exports = config 
