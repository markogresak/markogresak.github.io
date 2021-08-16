import { PostData } from '../../types';
import { getPostIds } from './getPostIds';
import { readPost } from './readPost';

interface Parameters {
  limit?: number;
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
