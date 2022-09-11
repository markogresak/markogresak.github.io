import { existsSync, promises as fs, readdirSync } from 'node:fs';
import path from 'node:path';

import { compile } from '@mdx-js/mdx';
import appRoot from 'app-root-path';
import prettier from 'prettier';

import type { PostData, PostPageData } from '../../types';

const POSTS_DIRECTORY = path.join(appRoot.path, 'pages', 'blog');
const POSTS_FILE = path.join(appRoot.path, 'lib', 'posts.ts');
const COMPILED_FILE = (postId: string) =>
  path.join(appRoot.path, 'scripts', `compiled-${postId}.mjs`);

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

async function readPostFile(
  postId: string,
): Promise<Partial<PostData> | undefined> {
  const compiledFilePath = COMPILED_FILE(postId);
  try {
    const fileContents = await fs.readFile(
      path.join(POSTS_DIRECTORY, postId, 'index.mdx'),
      'utf-8',
    );
    const normalizedFile = fileContents
      .split('\n')
      .filter((line) => !line.trim().startsWith('import '))
      .join('\n');
    const compiled = await compile(normalizedFile);
    if (typeof compiled.value !== 'string') {
      throw new Error('compile returned value which is not a string');
    }
    await fs.writeFile(compiledFilePath, compiled.value);
    return await import(compiledFilePath);
  } finally {
    if (existsSync(compiledFilePath)) {
      await fs.unlink(compiledFilePath);
    }
  }
}

async function readPost(postId: string): Promise<PostData> {
  const post = await readPostFile(postId);
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

async function getPostIds() {
  return readdirSync(POSTS_DIRECTORY, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(path.resolve(POSTS_DIRECTORY, entry.name, 'index.mdx')),
    )
    .map((entry) => entry.name);
}

async function getPostsList(): Promise<PostData[]> {
  const postIds = await getPostIds();
  const posts = await Promise.all(postIds.map(readPost));
  return posts.sort(
    (a, b) =>
      new Date(b.data.meta.date).getTime() -
      new Date(a.data.meta.date).getTime(),
  );
}

async function main() {
  const posts = await getPostsList();
  const prettierConfig = await prettier.resolveConfig(process.cwd());
  const postsStringified = JSON.stringify(posts, null, 2);
  const contents = prettier.format(
    [
      `import type { PostData } from '../types';`,
      ``,
      `export const allPosts: PostData[] = ${postsStringified};`,
      ``,
    ].join('\n'),
    {
      ...prettierConfig,
      parser: 'babel',
    },
  );
  await fs.writeFile(POSTS_FILE, contents, 'utf-8');
}

main();
