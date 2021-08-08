import { PostData } from '../../types';

interface Result {
  nextId: string | undefined;
  previousId: string | undefined;
}

export function getSiblingPostIds(
  posts: PostData[],
  currentPostId: string,
): Result {
  const postIndex = posts.findIndex((post) => post.id === currentPostId);

  if (postIndex === -1) {
    return {
      nextId: undefined,
      previousId: undefined,
    };
  }

  return {
    nextId: posts[postIndex - 1]?.id,
    previousId: posts[postIndex + 1]?.id,
  };
}
