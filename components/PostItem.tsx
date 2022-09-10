import Link from 'next/link';
import { PostData } from '../types';
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
          <a href={`/blog/${post.id}`}>{post.title}</a>
        </Link>
      </h2>
      <PostDate dateTime={post.date} />
    </header>
    {post.description && (
      <section className="text-gray-600 dark:text-gray-300">
        <p>{post.description}</p>
      </section>
    )}
  </article>
);

export default PostItem;
