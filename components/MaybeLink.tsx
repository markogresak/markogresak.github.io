import type { LinkProps } from './Link';
import { Link } from './Link';

interface Props extends Omit<LinkProps, 'href'> {
  href?: string;
}

export const MaybeLink = ({ children, href, ...props }: Props) => {
  if (!href) {
    return <>{children}</>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
