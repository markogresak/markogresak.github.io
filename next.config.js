const withTM = require('next-transpile-modules')(['unist-util-visit']);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  // For next.js v11.1.0 and critters v0.0.10, css optimization breaks
  // nightwind dark mode style.
  experimental: {
    optimizeCss: {
      preload: 'default',
      reduceInlineStyles: true,
      fonts: true,
      inlineFonts: true,
      pruneSource: true,
      mergeStylesheets: true,
      compress: true,
    },
  },
};

module.exports = withTM(nextConfig);
