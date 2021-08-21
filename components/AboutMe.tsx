import Image from 'next/image';
import { GithubIcon, StackOverflowIcon, TwitterIcon } from './AboutMeIcons';
import { Link } from './Link';
import { MaybeLink } from './MaybeLink';

interface Props {
  name: string;
  href?: string;
}

const AboutMe = ({ name, href }: Props) => (
  <div className="flex items-center justify-center flex-wrap">
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
        <li className="inline text-sm leading-none">
          <Link
            href="https://github.com/markogresak"
            className="inline-flex hover:underline"
          >
            <GithubIcon className="h-3 mr-1.5" /> Github
          </Link>
        </li>

        <li className="inline text-lg leading-none select-none opacity-30 mx-1.5">
          |
        </li>

        <li className="inline text-sm leading-none">
          <Link
            href="https://stackoverflow.com/users/1276128/marko-gre%C5%A1ak"
            className="inline-flex hover:underline"
          >
            <StackOverflowIcon className="h-3 mr-1.5" /> Stack Overflow
          </Link>
        </li>

        <li className="inline text-lg leading-none select-none opacity-30 mx-1.5">
          |
        </li>

        <li className="inline text-sm leading-none">
          <Link
            href="https://twitter.com/markogresak"
            className="inline-flex hover:underline"
          >
            <TwitterIcon className="h-3 mr-1.5" /> Twitter
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default AboutMe;
