module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#E25822',
          50: '#F7D3C4',
          100: '#F5C5B2',
          200: '#F0AA8E',
          300: '#EB8F6A',
          400: '#E77346',
          500: '#E25822',
          600: '#B44418',
          700: '#833111',
          800: '#511E0B',
          900: '#1F0C04',
        },
      },
    },
    fontFamily: {
      serif: ['Montserrat', 'serif'],
      sans: ['"Fira Sans"', 'sans-serif'],
      mono: ['"Fira Mono"', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
