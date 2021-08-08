import { PropsWithChildren } from 'react';
import { Link, LinkProps } from './Link';

interface Props extends Omit<LinkProps, 'href'> {
  href?: string;
}

export const MaybeLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<Props>) => {
  if (!href) {
    return <>{children}</>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
