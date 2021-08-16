import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { Footer } from '../../components/BlogFooter';
import PostDate from '../../components/PostDate';
import Layout from '../../components/Layout';
import { mdxComponents } from '../../components/mdx';
import { BLOG_NAME } from '../../lib/constants';
import { getPostContent, getPostIds } from '../../lib/posts';
import { PostContentData } from '../../types';

interface Query extends Record<string, any> {
  id: string;
}

interface Props {
  post: PostContentData;
}

export default function Post({ post }: Props) {
  return (
    <Layout
      title={`${post.title} | ${BLOG_NAME}`}
      description={post.description}
      logoHref="/blog"
      footer={<Footer />}
    >
      <article>
        <h1 className="text-4xl font-bold border-b-2 border-gray-300 mb-1 pb-1">
          {post.title}
        </h1>
        <PostDate dateTime={post.date} />
        <section className="mt-4 prose prose-lg prose-purple">
          <MDXRemote {...post.body} components={mdxComponents as any} />
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postIds = await getPostIds();
  const paths = postIds.map((postId) => ({ params: { id: postId } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
}) => {
  const currentPost = await getPostContent(params!.id);

  return {
    props: {
      post: currentPost,
    },
  };
};
