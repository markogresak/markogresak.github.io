import Link from 'next/link';

import type { PostData } from '../types';
import PostDate from './PostDate';

interface Props {
  className?: string;
  post: PostData;
}

const PostItem = ({ className, post }: Props) => (
  <article className={className}>
    <header className="mb-1">
      <h2 className="text-xl text-blue-700 dark:text-purple-400 hover:underline">
        <Link href={`/blog/${post.id}`}>
          <a href={`/blog/${post.id}`}>{post.data.meta.title}</a>
        </Link>
      </h2>
      <PostDate dateTime={post.data.meta.date} />
    </header>
    {post.data.meta.description && (
      <section className="text-gray-600 dark:text-gray-300">
        <p>{post.data.meta.description}</p>
      </section>
    )}
  </article>
);

export default PostItem;
