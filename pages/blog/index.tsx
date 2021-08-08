import { GetStaticProps } from 'next';
import React from 'react';
import { Footer } from '../../components/BlogFooter';
import Layout from '../../components/Layout';
import PostItem from '../../components/PostItem';
import { BLOG_NAME } from '../../lib/constants';
import { getPostsList } from '../../lib/posts';
import { PostData } from '../../types';

interface Props {
  posts: PostData[];
}

export default function BlogIndex({ posts }: Props) {
  return (
    <Layout title={BLOG_NAME} footer={<Footer />}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} className="mt-10" />
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostsList();

  return {
    props: {
      posts,
    },
  };
};
