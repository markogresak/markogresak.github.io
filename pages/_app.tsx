import '../styles/globals.css';

import { MDXProvider } from '@mdx-js/react';
import type { AppProps } from 'next/app';

import { Footer } from '../components/BlogFooter';
import Layout from '../components/Layout';
import { mdxComponents } from '../components/mdxComponents';
import type { AppPageProps } from '../types';

const BLOG_PATHNAME = '/blog';
const ERROR_PAGES = ['/404', '/500'];

export default function App({
  Component,
  pageProps: { title, description, ...pageProps },
  router,
}: AppProps<AppPageProps>) {
  const isHomePage = router.asPath === '/';
  const isBlogIndexPage = router.asPath === BLOG_PATHNAME;
  const isBlogPage = router.asPath.startsWith(`${BLOG_PATHNAME}/`);
  const isErrorPage = ERROR_PAGES.includes(router.asPath);

  return (
    <Layout
      title={title}
      description={description}
      centeredBlock={isErrorPage}
      footer={isBlogIndexPage || isBlogPage ? <Footer /> : undefined}
      logoHref={isBlogPage ? BLOG_PATHNAME : undefined}
      home={isHomePage}
    >
      {isBlogPage ? (
        <MDXProvider components={mdxComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </Layout>
  );
}
