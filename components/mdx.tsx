import type { MDXProviderComponentsProp } from '@mdx-js/react';
import Image from 'next/image';
import { Children, isValidElement } from 'react';

const Img = ({ src, alt, width, height }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    layout="responsive"
  />
);

const Paragraph = ({ children }) => {
  // Workaround to avoid p > div > img structure (React throws an error).
  const imgChild = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.mdxType === 'img',
  );
  if (isValidElement(imgChild)) {
    return mdxComponents.img(imgChild.props);
  }

  return <p>{children}</p>;
};

export const mdxComponents: MDXProviderComponentsProp = {
  img: Img,
  p: Paragraph,
};
