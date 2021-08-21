import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactNode } from 'react';
import { NAME } from '../lib/constants';
import AboutMe from './AboutMe';
import { Logo } from './Logo';
import { MaybeLink } from './MaybeLink';

const ColorMode = dynamic(() => import('./ColorMode'), { ssr: false });

interface Props {
  children: ReactNode;
  className?: string;
  description: string;
  footer?: ReactNode;
  hideHeader?: boolean;
  home?: boolean;
  logoHref?: string;
  mainClassName?: string;
  maxWidthStyle?: string;
  title: string;
}

export default function Layout({
  children,
  className,
  description,
  footer,
  hideHeader,
  home,
  logoHref,
  mainClassName,
  maxWidthStyle = 'max-w-2xl',
  title,
}: Props) {
  return (
    <div
      className={`mx-auto px-6 lg:px-8 pt-8 lg:pt-10 pb-12 lg:pb-14 text-gray-700 ${maxWidthStyle}${
        className ? ` ${className}` : ''
      }`}
    >
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {!hideHeader && (
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
      <main className={mainClassName}>{children}</main>
      {footer && <footer>{footer}</footer>}
      <ColorMode />
    </div>
  );
}
