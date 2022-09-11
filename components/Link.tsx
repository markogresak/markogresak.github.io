import NextLink from 'next/link';
import type { ComponentChildren } from 'preact';

export interface LinkProps {
  children: ComponentChildren;
  href: string;
  className?: string;
  inCurrentTab?: boolean;
  title?: string;
}

const newTabProps = {
  target: '_blank',
  rel: 'nofollow noopener noreferrer',
};

export const Link = ({
  children,
  className,
  href,
  inCurrentTab,
}: LinkProps) => {
  const isInternalLink = href.indexOf('/') === 0;

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a className={className}>
          <>{children}</>
        </a>
      </NextLink>
    );
  }

  return (
    <a href={href} className={className} {...(!inCurrentTab && newTabProps)}>
      <>{children}</>
    </a>
  );
};
