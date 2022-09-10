import type { MDXRemoteProps } from 'next-mdx-remote';
import Image from 'next/image';
import { Children, isValidElement } from 'react';
import type { DetailedHTMLProps, ImgHTMLAttributes, ReactNode } from 'react';

type ImgProps = Pick<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'src' | 'alt' | 'width' | 'height'
>;

const Img = ({ src, alt, width, height }: ImgProps) =>
  src ? (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
    />
  ) : null;

interface ParagraphProps {
  children?: ReactNode;
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

export const mdxComponents: Required<MDXRemoteProps>['components'] = {
  img: Img,
  p: Paragraph,
};
