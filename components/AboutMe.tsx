import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import { GithubIcon, StackOverflowIcon, TwitterIcon } from './AboutMeIcons';
import InlineLink from './InlineLink';
import { MaybeLink } from './MaybeLink';

interface Props {
  className?: string;
  name: string;
  href?: string;
}

const AboutMe = ({ className, name, href }: Props) => (
  <div
    className={classNames(
      'flex items-center justify-center flex-wrap',
      className,
    )}
  >
    <MaybeLink href={href}>
      <Image
        priority
        src="/images/profile.jpg"
        height={144}
        width={144}
        alt={name}
        className="rounded-full flex-shrink-0"
      />
    </MaybeLink>
    <div className="mt-3 sm:mt-0 sm:ml-6">
      <MaybeLink href={href} className="hover:underline">
        <h1 className="text-3xl font-bold text-center sm:text-left">{name}</h1>
      </MaybeLink>

      <p className="mt-4 sm:mt-2">
        <em>Web Developer</em>, striving to improve in all areas
      </p>
      <p>Loving all JavaScript and React related things!</p>

      <ul className="mt-4 sm:mt-2">
        <InlineLink href="https://github.com/markogresak">
          <GithubIcon className="h-3 mr-1.5" /> Github
        </InlineLink>
        <InlineLink href="https://stackoverflow.com/users/1276128/marko-gre%C5%A1ak">
          <StackOverflowIcon className="h-3 mr-1.5" /> Stack Overflow
        </InlineLink>
        <InlineLink href="https://twitter.com/markogresak">
          <TwitterIcon className="h-3 mr-1.5" /> Twitter
        </InlineLink>
      </ul>
    </div>
  </div>
);

export default AboutMe;
