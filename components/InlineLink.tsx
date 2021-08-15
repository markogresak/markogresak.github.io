import classNames from 'classnames';
import React from 'react';
import { Link, LinkProps } from './Link';

const InlineLink = ({ children, className, ...props }: LinkProps) => (
  <li className={classNames('inline text-sm leading-none', className)}>
    <Link {...props} className="inline-flex hover:underline">
      {children}
    </Link>
  </li>
);

export default InlineLink;
