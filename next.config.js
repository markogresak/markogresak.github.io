import nextMDX from '@next/mdx';
import withPreact from 'next-plugin-preact';

import { imageMetadata } from './lib/plugins/imageMetadata.mjs';

const withMDX = nextMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [imageMetadata],
    providerImportSource: '@mdx-js/preact',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'tsx'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    esmExternals: false,
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

export default withPreact(withMDX(nextConfig));
