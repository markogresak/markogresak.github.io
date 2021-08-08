import Link from 'next/link';
import React from 'react';
import { PostData } from '../types';
import Date from './Date';

interface Props {
  className?: string;
  post: PostData;
}

const PostItem = ({ className, post }: Props) => (
  <article className={className}>
    <header className="mb-1">
      <h2 className="text-xl text-blue-700 dark:text-purple-400 hover:underline">
        <Link href={`/blog/${post.id}`}>
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </Link>
      </h2>
      <Date dateTime={post.date} className="text-gray-500 text-xs block" />
    </header>
    {post.description && (
      <section className="text-gray-600">
        <p>{post.description}</p>
      </section>
    )}
  </article>
);

export default PostItem;
