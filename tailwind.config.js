const defaultTheme = require('tailwindcss/defaultTheme')

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
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.zinc.600'),
            hr: {
              borderColor: theme('colors.zinc.100'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            h2: {
              letterSpacing: '-0.025em',
              marginBottom: `${16 / 24}em`,
            },
            h3: {
              letterSpacing: '-0.025em',
              marginTop: '2.4em',
              lineHeight: '1.4',
            },
            'h4, h5, h6': {
              marginTop: '2em',
              fontSize: '1.125em',
            },
            'h2 small, h3 small, h4 small, h5 small, h6 small': {
              fontFamily: theme('fontFamily.mono').join(', '),
              color: theme('colors.zinc.500'),
              fontWeight: 500,
            },
            'h2 small': {
              fontSize: theme('fontSize.lg')[0],
              ...theme('fontSize.lg')[1],
            },
            'h3 small': {
              fontSize: theme('fontSize.base')[0],
              ...theme('fontSize.base')[1],
            },
            'h4 small, h5 small, h6 small': {
              fontSize: theme('fontSize.sm')[0],
              ...theme('fontSize.sm')[1],
            },
            'h2, h3, h4, h5, h6': {
              'scroll-margin-top': 'var(--scroll-mt)',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: 0,
              '> li': {
                position: 'relative',
                paddingLeft: '1.5rem',
                marginLeft: '2rem',
              },
              '> li::before': {
                content: '""',
                width: '0.75em',
                height: '0.125em',
                position: 'absolute',
                top: 'calc(0.875em - 0.0625em)',
                left: 0,
                borderRadius: '999px',
                backgroundColor: theme('colors.zinc.300'),
              },
            },
            a: {
              fontWeight: theme('fontWeight.semibold'),
              textDecoration: 'none',
              borderBottom: 'none',
              '&:hover': {
                borderBottomWidth: '2px',
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
              color: theme('colors.zinc.900'),
              fontWeight: theme('fontWeight.semibold'),
            },
            code: {
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
            },
            pre: {
              backgroundColor: theme('colors.white'),
              color: theme('colors.zinc.700'),
              borderRadius: theme('borderRadius.xl'),
              padding: theme('padding.5'),
              boxShadow: theme('boxShadow.md'),
              display: 'flex',
              marginTop: `${20 / 14}em`,
              marginBottom: `${32 / 14}em`,
              '+ pre': {
                marginTop: `${-16 / 14}em`,
              },
              code: {
                flex: 'none',
                minWidth: '100%',
              },
            },
            'p + pre': {
              marginTop: `${-4 / 14}em`,
            },
            table: {
              fontSize: theme('fontSize.sm')[0],
              lineHeight: theme('fontSize.sm')[1].lineHeight,
            },
            thead: {
              color: theme('colors.zinc.700'),
              borderBottomColor: theme('colors.zinc.200'),
              th: {
                paddingTop: 0,
                fontWeight: theme('fontWeight.semibold'),
              },
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.zinc.100'),
              },
              'tr:last-child': {
                borderBottomWidth: '1px',
              },
              code: {
                fontSize: theme('fontSize.xs')[0],
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
              a: {
                color: theme('colors.zinc.700'),
                '&:hover': {
                  color: theme('colors.zinc.900'),
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
            color: theme('colors.zinc.400'),
            'h1, h2, h3, h4, h5, h6, thead th': {
              color: theme('colors.zinc.200'),
            },
            'h1 small, h2 small, h3 small, h4 small, h5 small, h6 small': {
              color: theme('colors.zinc.400'),
            },
            code: {
              color: theme('colors.zinc.200'),
            },
            hr: {
              borderColor: theme('colors.zinc.200'),
              opacity: '0.05',
            },
            a: {
              color: theme('colors.zinc.200'),
              border: 'none',
            },
            strong: {
              color: theme('colors.zinc.200'),
            },
            thead: {
              color: theme('colors.zinc.300'),
              border: 'none',
            },
            'tbody tr': {
              border: 'none',
            },
            blockQuote: {
              color: theme('colors.zinc.50'),
            },
            pre: {
              backgroundColor: theme('colors.zinc.700'),
              color: theme('colors.zinc.50'),
              boxShadow: theme('boxShadow.md'),
            },
            '.prose-toc a': {
              color: theme('colors.zinc.400'),
              '&:hover': {
                color: theme('colors.zinc.300'),
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
