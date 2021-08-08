import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';
import { Footer } from '../../components/BlogFooter';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { mdxComponents } from '../../components/mdx';
import { BLOG_NAME } from '../../lib/constants';
import { getPostContent, getPostIds } from '../../lib/posts';
import { PostContentData } from '../../types';

interface Query extends ParsedUrlQuery {
  id: string;
}

interface Props {
  post: PostContentData;
}

export default function Post({ post }: Props) {
  return (
    <Layout
      title={`${post.title} | ${BLOG_NAME}`}
      logoHref="/blog"
      footer={<Footer />}
    >
      <article>
        <h1 className="text-4xl font-bold border-b-2 border-gray-300 mb-1 pb-1">
          {post.title}
        </h1>
        <Date
          className="text-gray-500 text-xs inline-block mb-4"
          dateTime={post.date}
        />
        <section className="prose prose-lg prose-purple">
          <MDXRemote {...post.body} components={mdxComponents} />
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
  const currentPost = await getPostContent(params.id);

  return {
    props: {
      post: currentPost,
    },
  };
};
