import path from 'node:path';

import appRoot from 'app-root-path';
import imageSize from 'image-size';
import type { ISizeCalculationResult } from 'image-size/dist/types/interface';
import type { Plugin } from 'unified';
import type { Node } from 'unist';
import { visit } from 'unist-util-visit';

const IMAGE_DIRECTORY_PUBLIC = path.join('/', 'images', 'blog');
const PUBLIC_DIR_PATH = path.join(
  appRoot.path,
  'public',
  IMAGE_DIRECTORY_PUBLIC,
);

/**
 * An `<img>` HAST node
 */
interface ImageNode extends Node {
  type: 'element';
  tagName: 'img';
  properties: {
    src: string;
    height?: number;
    width?: number;
  };
}

/**
 * Determines whether the given HAST node is an `<img>` element.
 */
function isImageNode(node: Node): node is ImageNode {
  const img = node as Partial<ImageNode>;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    typeof img.properties?.src === 'string'
  );
}

function resolveImageFilePath(src: string): string {
  if (!path.isAbsolute(src)) {
    throw new Error(`resolveImageFilePath: Image URL is not absolute: ${src}`);
  }
  return path.join(PUBLIC_DIR_PATH, src);
}

function resolveImagePublicPath(src: string): string {
  if (!path.isAbsolute(src)) {
    throw new Error(
      `resolveImagePublicPath: Image URL is not absolute: ${src}`,
    );
  }
  return path.join(IMAGE_DIRECTORY_PUBLIC, src);
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const result = await new Promise<ISizeCalculationResult | undefined>(
    (resolve) => {
      imageSize(resolveImageFilePath(node.properties.src), (error, result) => {
        if (error) {
          console.error(error);
        }
        resolve(error ? undefined : result);
      });
    },
  );

  if (!result) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }

  node.properties.width = result.width;
  node.properties.height = result.height;
}

function fixSrcPath(node: ImageNode): void {
  node.properties.src = resolveImagePublicPath(node.properties.src);
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export const imageMetadata: Plugin = () => {
  return async function transformer(tree: Node): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      await addMetadata(node);
      fixSrcPath(node);
    }

    return tree;
  };
};
