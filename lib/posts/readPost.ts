import type { PostData } from '../../types';
import type { PostPageData } from '../../types/PostData';

const validatePost = (value: unknown) => {
  return [
    {
      key: 'meta.date',
      ok: typeof (value as Partial<PostPageData>)?.meta?.date === 'string',
    },
    {
      key: 'meta.description',
      ok:
        typeof (value as Partial<PostPageData>)?.meta?.description === 'string',
    },
    {
      key: 'meta.title',
      ok: typeof (value as Partial<PostPageData>)?.meta?.title === 'string',
    },
  ];
};

const isValidPostPageData = (value: unknown): value is PostPageData => {
  return validatePost(value).every((v) => v.ok);
};

const getPostErrors = (value: unknown) => {
  validatePost(value)
    .filter((v) => !v.ok)
    .map((v) => v.key)
    .join(', ');
};

export async function readPost(postId: string): Promise<PostData> {
  // TODO: support `blog/[id]/index.mdx` and `blog/[id].mdx`
  // const post = (await import(
  //   `../../pages/blog/${postId}/index.mdx`
  // )) as Partial<PostPageData>;
  const post = {
    meta: {
      date: '2022-09-11',
      description: 'desc',
      title: 'title',
    },
  };

  if (!isValidPostPageData(post)) {
    const invalidFields = getPostErrors(post);
    throw new Error(
      `readPost: ${postId} does not contain valid fields: ${invalidFields}`,
    );
  }

  return {
    id: postId,
    data: {
      meta: post.meta,
    },
  };
}
