const typography = require('@tailwindcss/typography');
const mdx = require('@mdx-js/mdx');

module.exports = {
  // mode: 'jit',
  purge: {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    options: {
      safelist: ['prose', 'nightwind', 'dark'],
      extractors: [
        {
          extensions: ['mdx'],
          extractor: (content) => {
            content = mdx.sync(content);

            // Capture as liberally as possible, including things like `h-(screen-1.5)`
            const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

            // Capture classes within other delimiters like .block(class="w-1/2") in Pug
            const innerMatches =
              content.match(/[^<>"'`\s.(){}[\]#=%]*[^<>"'`\s.(){}[\]#=%:]/g) ||
              [];

            return broadMatches.concat(innerMatches);
          },
        },
      ],
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
