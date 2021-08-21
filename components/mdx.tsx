import Image from 'next/image';
import { Children, isValidElement, ReactNode } from 'react';

interface ImgProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

const Img = ({ src, alt, width, height }: ImgProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    layout="responsive"
  />
);

interface ParagraphProps {
  children: ReactNode;
}

const Paragraph = ({ children }: ParagraphProps) => {
  // Workaround to avoid p > div > img structure (React throws an error).
  const imgChild = Children.toArray(children).find(
    (child) => isValidElement(child) && child.props.mdxType === 'img',
  );
  if (isValidElement(imgChild)) {
    return <Img {...imgChild.props} />;
  }

  return <p>{children}</p>;
};

export const mdxComponents: Record<string, ReactNode> = {
  img: Img,
  p: Paragraph,
};
