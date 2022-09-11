import type { Components as MDXComponents } from '@mdx-js/preact/lib';
import Image from 'next/image';
// import { isValidElement, toChildArray } from 'preact';

const Img: MDXComponents['img'] = ({ src, alt, width, height }) =>
  src ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
    />
  ) : null;

const Paragraph: MDXComponents['p'] = ({ children }) => {
  // Workaround to avoid p > div > img structure (React throws an error).
  // const imgChild = toChildArray(children).find(
  //   (child) => isValidElement(child) && (child.props as any).mdxType === 'img',
  // );
  // if (isValidElement(imgChild)) {
  //   return <Img {...(imgChild.props as any)} />;
  // }

  return (
    <p>
      <>{children}</>
    </p>
  );
};

export const mdxComponents: MDXComponents = {
  img: Img,
  p: Paragraph,
};
