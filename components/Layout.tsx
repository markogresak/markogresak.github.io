import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { ReactNode } from 'react';

import { NAME } from '../lib/constants';
import type { AppPageProps } from '../types';
import AboutMe from './AboutMe';
import { Logo } from './Logo';
import { MaybeLink } from './MaybeLink';

const ColorMode = dynamic(() => import('./ColorMode'), { ssr: false });

interface Props extends AppPageProps {
  children: ReactNode;
  footer?: ReactNode;
  logoHref?: string;
  home?: boolean;
  centeredBlock?: boolean;
}

export default function Layout({
  children,
  footer,
  home,
  logoHref,
  title,
  description,
  centeredBlock,
}: Props) {
  return (
    <div
      className={`mx-auto px-6 lg:px-8 pt-8 lg:pt-10 pb-12 lg:pb-14 text-gray-700 dark:text-gray-200 ${
        centeredBlock ? 'max-w-sm h-screen' : 'max-w-2xl'
      }`}
    >
      <>
        <Head>
          <title>{title}</title>
          <meta name="og:title" content={title} />
          <meta name="description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        {!centeredBlock && (
          <header className="mb-8">
            {home ? (
              <AboutMe name={NAME} />
            ) : (
              <MaybeLink href={logoHref}>
                <Logo />
              </MaybeLink>
            )}
          </header>
        )}
        <main className={centeredBlock ? 'h-full' : undefined}>
          <>{children}</>
        </main>
        {footer && (
          <footer>
            <>{footer}</>
          </footer>
        )}
        <ColorMode />
      </>
    </div>
  );
}
