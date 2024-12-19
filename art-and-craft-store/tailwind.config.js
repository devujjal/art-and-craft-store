/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(340px, 1fr))',
      },

      screens: {
        'xs': { 'max': '374px' }, // Custom screen size for less than 350px
      },

    },
    fontFamily: {
      "yan": ['"Yanone Kaffeesatz", sans-serif'],
      "raj": ['"Rajdhani", sans-serif']
    }
  },
  plugins: [],
}

