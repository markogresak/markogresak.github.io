const typography = require('@tailwindcss/typography');

module.exports = {
  mode: 'jit',
  purge: {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    options: {
      safelist: ['prose', 'nightwind', 'dark'],
    },
  },
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
    },
    nightwind: {
      transitionDuration: '300ms',
      typography: {
        color: 'gray.300',
        code: {
          color: 'gray.300',
        },
        pre: {
          backgroundColor: 'gray.800',
          color: 'gray.200',
        },
        h1: {
          color: 'gray.200',
        },
        h2: {
          color: 'gray.200',
        },
        h3: {
          color: 'gray.200',
        },
        h4: {
          color: 'gray.200',
        },
        h5: {
          color: 'gray.200',
        },
        h6: {
          color: 'gray.200',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    float: false,
  },
  plugins: [
    typography({
      modifiers: ['lg'],
    }),
    require('nightwind'),
  ],
};
