/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
        'sans': ['"Noto Sans JP"', 'sans-serif'],
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
export default config
