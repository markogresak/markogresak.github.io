import React from 'react';
import Layout from '../components/Layout';
import { Link } from '../components/Link';
import { Logo } from '../components/Logo';
import { BLOG_NAME, NEW_ISSUE_URL } from '../lib/constants';

export default function NotFound() {
  return (
    <Layout
      className="h-screen max-w-sm"
      maxWidthStyle="max-w-sm"
      mainClassName="h-full"
      title={`Not found | ${BLOG_NAME}`}
      description={`Not found | ${BLOG_NAME}`}
      hideHeader
    >
      <div className="h-full flex flex-col justify-center text-center">
        <Link className="mb-4" href="/blog" title="Blog">
          <Logo />
        </Link>
        <p className="mb-2">
          I swear, I&apos;ve checked everywhere, and it seems I have forgotten
          where I put what you were looking for 😞
        </p>
        <p>
          If you were expecting to find a blog post or if you think there&apos;s
          a problem, please{' '}
          <Link
            href={NEW_ISSUE_URL}
            title="File a new issue"
            className="text-blue-700 dark:text-purple-400 underline"
          >
            file an issue
          </Link>{' '}
          to get this problem fixed.
        </p>
      </div>
    </Layout>
  );
}
