import fs from 'fs';
import path from 'path';

import type { PostData } from '../../types';
import { readPost } from './readPost';

interface Parameters {
  limit?: number;
}

export const POSTS_DIRECTORY = path.join(process.cwd(), 'pages', 'blog');

export async function getPostIds() {
  return fs
    .readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        fs.existsSync(path.resolve(POSTS_DIRECTORY, entry.name, 'index.mdx')),
    )
    .map((entry) => entry.name);
}

export async function getPostsList({ limit }: Parameters = {}): Promise<
  PostData[]
> {
  const postIds = await getPostIds();
  const posts = await Promise.all(postIds.map(readPost));
  return sortPostsByDate(posts).slice(0, limit);
}

function sortPostsByDate(posts: PostData[]): PostData[] {
  return posts.sort(
    (a, b) =>
      new Date(b.data.meta.date).getTime() -
      new Date(a.data.meta.date).getTime(),
  );
}
