const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: colors.violet,
      },
      screens: {
        print: { raw: 'print' },
      },
      typography: ({ theme }) => ({
        purple: {
          css: {
            '--tw-prose-links': theme('colors.gray[900]'),
            '--tw-prose-invert-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': theme('colors.gray[800]'),
            '--tw-prose-invert-pre-code': theme('colors.gray[200]'),
            '--tw-prose-invert-headings': theme('colors.gray[200]'),
            '--tw-prose-invert-links': theme('colors.gray[200]'),
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    float: false,
  },
  plugins: [require('@tailwindcss/typography')],
};
