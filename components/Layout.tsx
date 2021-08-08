import classNames from 'classnames';
import Head from 'next/head';
import nightwind from 'nightwind/helper';
import React, { PropsWithChildren, ReactNode, useEffect } from 'react';
import AboutMe from './AboutMe';
import ColorMode from './ColorMode';
import { Logo } from './Logo';
import { MaybeLink } from './MaybeLink';

export const name = 'Marko Grešak';

interface Props {
  bodyClassName?: string;
  className?: string;
  home?: boolean;
  title?: string;
  footer?: ReactNode;
  logoHref?: string;
}

export default function Layout({
  bodyClassName = 'bg-gray-50',
  children,
  className,
  home,
  title,
  footer,
  logoHref,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    if (typeof bodyClassName === 'string') {
      const classes = bodyClassName.split(/\s+/);
      document.body.classList.add(...classes);
      return () => document.body.classList.remove(...classes);
    }
  }, [bodyClassName]);

  return (
    <div
      className={classNames(
        'max-w-2xl mx-auto mt-5 mb-10 px-4 py-2 lg:px-8 lg:py-4 text-gray-700',
        className,
      )}
    >
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <script dangerouslySetInnerHTML={{ __html: nightwind.init() }} />
      </Head>
      <header>
        {home ? (
          <AboutMe name={name} />
        ) : (
          <MaybeLink href={logoHref}>
            <Logo />
          </MaybeLink>
        )}
      </header>
      <main className="mt-8">{children}</main>
      {footer && <footer>{footer}</footer>}
      <ColorMode />
    </div>
  );
}
