import imageSize from 'image-size';
import path from 'path';
import { Processor } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { promisify } from 'util';
import { VFile } from 'vfile';
import { IMAGE_DIRECTORY_PUBLIC } from './constants';

const sizeOf = promisify(imageSize);

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
  const img = node as ImageNode;
  return (
    img.type === 'element' &&
    img.tagName === 'img' &&
    typeof img.properties?.src === 'string'
  );
}

/**
 * Filters out non absolute paths from the public folder.
 */
function filterImageNode(node: ImageNode): boolean {
  return node.properties.src.startsWith('/');
}

function fixSrcPath(node: ImageNode): void {
  node.properties.src = path.join(IMAGE_DIRECTORY_PUBLIC, node.properties.src);
}

/**
 * Adds the image's `height` and `width` to it's properties.
 */
async function addMetadata(node: ImageNode): Promise<void> {
  const result = await sizeOf(
    path.join(process.cwd(), 'public', node.properties.src),
  );

  if (!result) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }

  node.properties.width = result.width;
  node.properties.height = result.height;
}

/**
 * This is a Rehype plugin that finds image `<img>` elements and adds the height and width to the properties.
 * Read more about Next.js image: https://nextjs.org/docs/api-reference/next/image#layout
 */
export function imageMetadata() {
  return async function transformer(tree: Node): Promise<Node> {
    const imgNodes: ImageNode[] = [];

    visit(tree, 'element', (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });

    for (const node of imgNodes) {
      fixSrcPath(node);
      await addMetadata(node);
    }

    return tree;
  };
}
