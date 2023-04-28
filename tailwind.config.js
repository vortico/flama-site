const defaultTheme = require('tailwindcss/defaultTheme')

const colors = {
  vortico: {
    DEFAULT: '#008080',
    50: '#eefffc',
    100: '#c5fffa',
    200: '#8bfff5',
    300: '#4afef0',
    400: '#15ece2',
    500: '#00d0c9',
    600: '#00a8a5',
    700: '#008080',
    800: '#066769',
    900: '#0a5757',
    950: '#003235',
  },
  bruma: {
    DEFAULT: '#00bbd5',
    50: '#ebfeff',
    100: '#cefcff',
    200: '#a2f7ff',
    300: '#63effd',
    400: '#1cdcf4',
    500: '#00bbd5',
    600: '#0398b7',
    700: '#0a7994',
    800: '#126178',
    900: '#145165',
    950: '#063646',
  },
  bosque: {
    DEFAULT: '#9e744f',
    50: '#f7f4ef',
    100: '#ebe3d6',
    200: '#d9c8af',
    300: '#c2a682',
    400: '#b0895f',
    500: '#9e744f',
    600: '#8a5f44',
    700: '#6f4939',
    800: '#5f3f34',
    900: '#523731',
    950: '#2f1d19',
  },
  ciclon: {
    DEFAULT: '#00976e',
    50: '#ebfef6',
    100: '#d0fbe7',
    200: '#a4f6d3',
    300: '#6aebbd',
    400: '#2fd8a1',
    500: '#0abf8a',
    600: '#00976e',
    700: '#007c5e',
    800: '#03624b',
    900: '#04503f',
    950: '#012d25',
  },
  flama: {
    DEFAULT: '#E25822',
    50: '#fdf5ef',
    100: '#fbe8d9',
    200: '#f6cdb2',
    300: '#f0ac81',
    400: '#e9804e',
    500: '#e25822',
    600: '#d54821',
    700: '#b1351d',
    800: '#8d2d1f',
    900: '#72271c',
    950: '#3d110d',
  },
  background: {
    DEFAULT: '#656775',
    50: '#f5f5f6',
    100: '#e5e6e8',
    200: '#cdced4',
    300: '#aaabb6',
    400: '#808290',
    500: '#656775',
    600: '#575863',
    700: '#4a4a54',
    800: '#3f3f46',
    900: '#3a3a3f',
    950: '#242428',
  },
}
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
        brand: colors.flama,
        primary: colors.background,
        flama: colors.flama,
        ciclon: colors.ciclon,
        bosque: colors.bosque,
        bruma: colors.bruma,
        vortico: colors.vortico,
      },
      maxWidth: {
        '8xl': '90rem',
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
      sans: ['Lato', ...defaultTheme.fontFamily.sans],
      mono: ['"Fira Mono"', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addVariant }) {
      addVariant('supports-backdrop-blur', '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))')
    },
  ],
}
