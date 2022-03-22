const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './.contentlayer/generated/**/*.{js,ts,jsx,tsx,json}',
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
        primary: colors.zinc,
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.primary.600'),
            hr: {
              borderColor: theme('colors.primary.300'),
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '2rem',
              '> li': {
                position: 'relative',
                paddingLeft: '1.5rem',
                marginLeft: '-1.5rem',
              },
              '> li::before': {
                content: '""',
                width: '0.75em',
                height: '0.125em',
                position: 'absolute',
                top: 'calc(0.875em - 0.0625em)',
                left: 0,
                borderRadius: '999px',
                backgroundColor: theme('colors.primary.300'),
              },
            },
            ol: {
              '> li::marker': {
                color: theme('colors.primary.300'),
              },
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: 'none',
              scrollMarginTop: '7rem',
              '&:hover': {
                color: theme('colors.brand.500'),
              },
              code: {
                color: 'inherit',
                fontWeight: 'inherit',
              },
              strong: {
                color: 'inherit',
                fontWeight: 'inherit',
              },
            },
            strong: {
              color: theme('colors.primary.700'),
              fontWeight: theme('fontWeight.semibold'),
            },
            blockQuote: {
              borderColor: theme('colors.primary.300'),
              color: theme('colors.primary.400'),
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
              thead: {
                borderBottomColor: theme('colors.primary.300'),
                borderBottomWidth: '2px',
                th: {
                  paddingTop: 0,
                  fontWeight: theme('fontWeight.semibold'),
                  color: theme('colors.primary.700'),
                },
              },
              tbody: {
                tr: {
                  borderBottomColor: theme('colors.primary.300'),
                },
                'tr:last-child': {
                  borderBottomWidth: '2px',
                },
                code: {
                  fontSize: theme('fontSize.xs')[0],
                },
              },
            },
            figure: {
              figcaption: {
                textAlign: 'center',
                fontStyle: 'italic',
              },
              '> figcaption': {
                marginTop: `${12 / 14}em`,
              },
            },
            '.prose-toc': {
              color: theme('colors.primary.500'),
              a: {
                color: theme('colors.primary.500'),
                '&:hover': {
                  color: theme('colors.primary.900'),
                },
              },
              ol: {
                listStyleType: 'none',
                padding: 0,
                marginTop: '1rem',
              },
              '> ol': {
                '> li': {
                  padding: 0,
                  marginTop: '1rem',
                  '> a': {
                    fontWeight: theme('fontWeight.semibold'),
                  },
                },
                ol: {
                  marginTop: 0,
                  '> li': {
                    position: 'relative',
                    marginLeft: '1rem',
                    padding: 0,

                    '&::before': {
                      content: '""',
                      display: 'inline-block',
                      width: '0.4rem',
                      height: '0.4rem',
                      borderRight: '0.15rem solid',
                      borderTop: '0.15rem solid',
                      transform: 'rotate(45deg)',
                      marginRight: '0.75rem',
                    },

                    '> a': {
                      fontWeight: theme('fontWeight.normal'),
                    },
                  },
                  ol: {
                    display: 'none',
                  },
                },
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.primary.400'),
            hr: {
              borderColor: theme('colors.primary.600'),
            },
            a: {
              color: theme('colors.primary.200'),
              '&:hover': {
                color: theme('colors.brand.500'),
              },
            },
            strong: {
              color: theme('colors.primary.200'),
            },
            table: {
              thead: {
                borderBottomColor: theme('colors.primary.600'),
                th: {
                  color: theme('colors.primary.200'),
                },
              },
              tbody: {
                tr: {
                  borderBottomColor: theme('colors.primary.600'),
                },
              },
            },
            blockQuote: {
              borderColor: theme('colors.primary.600'),
              color: theme('colors.primary.500'),
            },
            ul: {
              '> li::before': {
                backgroundColor: theme('colors.primary.600'),
              },
            },
            ol: {
              '> li::marker': {
                color: theme('colors.primary.600'),
              },
            },
            '.prose-toc': {
              color: theme('colors.primary.400'),
              a: {
                color: theme('colors.primary.400'),
                '&:hover': {
                  color: theme('colors.primary.200'),
                },
              },
            },
          },
        },
      }),
    },
    fontFamily: {
      serif: ['Montserrat', ...defaultTheme.fontFamily.serif],
      sans: ['"Fira Sans"', ...defaultTheme.fontFamily.sans],
      mono: ['"Fira Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addVariant }) {
      addVariant(
        'supports-backdrop-blur',
        '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))'
      )
    },
  ],
}
