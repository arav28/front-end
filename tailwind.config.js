/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        floralwhite: '#EEEDEB', 
        customcolor: '#E1CCBE', 
      },
      
    },
  },
  plugins: [],
}
