import classNames from 'classnames';
import Head from 'next/head';
import React, { PropsWithChildren, ReactNode } from 'react';
import AboutMe from './AboutMe';
import ColorMode from './ColorMode';
import { Logo } from './Logo';
import { MaybeLink } from './MaybeLink';

export const name = 'Marko Grešak';

interface Props {
  className?: string;
  home?: boolean;
  title: string;
  description: string;
  footer?: ReactNode;
  logoHref?: string;
}

export default function Layout({
  children,
  className,
  home,
  title,
  description,
  footer,
  logoHref,
}: PropsWithChildren<Props>) {
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
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
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
