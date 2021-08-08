import { serialize } from 'next-mdx-remote/serialize';
import { PostContentData } from '../../types';
import { imageMetadata } from './imageMetadata';
import { readPost } from './readPost';

export async function getPostContent(postId: string): Promise<PostContentData> {
  const post = await readPost(postId);
  const body = await serialize(post.content, {
    scope: post as Record<string, any>,
    mdxOptions: {
      rehypePlugins: [imageMetadata],
    },
  });

  return {
    body,
    ...post,
  };
}
