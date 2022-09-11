import type { ComponentChildren } from 'preact';

import type { PostMeta } from '../types';
import PostDate from './PostDate';

interface Props {
  children: ComponentChildren;
  meta: PostMeta;
}

export default function PostPage({ children, meta }: Props) {
  return (
    <article>
      <h1 className="text-4xl font-bold border-b-2 border-gray-300 dark:border-gray-600 mb-1 pb-1">
        {meta.title}
      </h1>
      <PostDate dateTime={meta.date} />
      <section className="mt-4 prose dark:prose-invert prose-lg prose-purple">
        <>{children}</>
      </section>
    </article>
  );
}
