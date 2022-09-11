import nextMDX from '@next/mdx';

import { imageMetadata } from './lib/plugins/imageMetadata.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [imageMetadata],
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['mdx', 'tsx'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    // runtime: 'experimental-edge',
    serverComponents: true,
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

export default withMDX(nextConfig);
