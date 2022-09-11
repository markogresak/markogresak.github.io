import type { GetStaticProps } from 'next';

import { Link } from '../components/Link';
import PostItem from '../components/PostItem';
import { NAME } from '../lib/constants';
import { getPostsList } from '../lib/posts';
import type { AppPageProps, PostData } from '../types';

interface Props {
  posts: PostData[];
}

export default function Home({ posts }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold border-b border-gray-300 dark:border-gray-600">
        My latest blog posts
      </h2>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} className="mt-10" />
      ))}
      <div className="mt-10">
        <Link href="/blog" className="text-blue-700 dark:text-purple-400 group">
          <span className="leading-none group-hover:underline">
            Read older posts
          </span>
          <span className="ml-1">→</span>
        </Link>
      </div>
    </section>
  );
}

export const getStaticProps: GetStaticProps<
  Props & AppPageProps
> = async () => {
  const posts = await getPostsList({ limit: 3 });
  return {
    props: {
      posts,
      title: NAME,
      description: `${NAME} | Web Developer`,
    },
  };
};
