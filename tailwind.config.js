const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: colors.orange
      }
    },
    fontFamily: {
      sans: '"Lato", sans-serif'
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
