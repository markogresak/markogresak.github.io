import type { Components as MDXComponents } from '@mdx-js/react/lib';

const Img: MDXComponents['img'] = ({ src, alt, width, height }) => {
  return src ? <img src={src} alt={alt} width={width} height={height} /> : null;
};

export const mdxComponents: MDXComponents = {
  img: Img,
};
