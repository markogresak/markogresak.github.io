import type { GetStaticProps } from 'next';

import PostItem from '../../components/PostItem';
import { BLOG_NAME } from '../../lib/constants';
import { getPostsList } from '../../lib/posts';
import type { AppPageProps, PostData } from '../../types';

interface Props {
  posts: PostData[];
}

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} className="mt-10" />
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps<
  Props & AppPageProps
> = async () => {
  const posts = await getPostsList();

  return {
    props: {
      posts,
      title: BLOG_NAME,
      description: `${BLOG_NAME} | All posts`,
    },
  };
};
