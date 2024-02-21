/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        floralwhite: '#EEEDEB', // Existing customization
        customcolor: '#E1CCBE', // Added dark blue color
      },
      
    },
  },
  plugins: [],
}
