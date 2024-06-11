/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          800: '#07090a',
          700: '#141519',
          100: '#8a919e',
        },
      },
    },
  },
  plugins: [],
}
