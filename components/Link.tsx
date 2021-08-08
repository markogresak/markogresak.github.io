import NextLink from 'next/link';
import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  inCurrentTab?: boolean;
}

const newTabProps = {
  target: '_blank',
  rel: 'nofollow noopener noreferrer',
};

export const Link = ({
  children,
  href,
  inCurrentTab,
  ...props
}: PropsWithChildren<LinkProps>) => {
  const isInternalLink = href.indexOf('/') === 0;

  if (isInternalLink) {
    return (
      <NextLink href={href}>
        <a {...props}>{children}</a>
      </NextLink>
    );
  }

  return (
    <a href={href} {...props} {...(!inCurrentTab && newTabProps)}>
      {children}
    </a>
  );
};
