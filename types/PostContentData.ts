import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { PostData } from './PostData';

export interface PostContentData extends PostData {
  body: MDXRemoteSerializeResult;
}
