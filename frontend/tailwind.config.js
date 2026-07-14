/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626', // Red
          dark: '#991B1B',
          light: '#FCA5A5',
        },
        secondary: {
          DEFAULT: '#1F2937', // Dark Gray
          dark: '#111827',
          light: '#374151',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
