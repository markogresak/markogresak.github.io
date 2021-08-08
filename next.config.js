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
    optimizeCss: true,
  },
};

module.exports = withTM(nextConfig);
