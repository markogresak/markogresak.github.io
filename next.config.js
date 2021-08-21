const withTM = require('next-transpile-modules')(['unist-util-visit']);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
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
