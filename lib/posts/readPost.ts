import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { FrontmatterData, PostData } from '../../types';
import { POSTS_DIRECTORY } from './constants';

export async function readPost(postId: string): Promise<PostData> {
  const fileBuffer = await fs.promises.readFile(getPostPath(postId));
  const file = matter(fileBuffer);

  return {
    id: postId,
    content: file.content,
    ...(file.data as FrontmatterData),
  };
}

function getPostPath(postId: string): string {
  // TODO: support `blog/[id]/index.md` and `blog/[id].md`
  return path.join(POSTS_DIRECTORY, postId, 'index.md');
}
