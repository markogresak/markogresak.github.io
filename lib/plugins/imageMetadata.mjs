// Output of `npx esbuild --minify ./lib/plugins/imageMetadata.ts`
"use strict";
import imageSize from "image-size";
import path from "path";
import { visit } from "unist-util-visit";
import { promisify } from "util";
const sizeOf = promisify(imageSize);
function isImageNode(node) {
  var _a;
  const img = node;
  return img.type === "element" && img.tagName === "img" && typeof ((_a = img.properties) == null ? void 0 : _a.src) === "string";
}
function filterImageNode(node) {
  return node.properties.src.startsWith("/");
}
async function addMetadata(node) {
  const result = await sizeOf(
    path.join(process.cwd(), "public", node.properties.src)
  );
  if (!result) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }
  node.properties.width = result.width;
  node.properties.height = result.height;
}
export function imageMetadata() {
  return async function transformer(tree) {
    const imgNodes = [];
    visit(tree, "element", (node) => {
      if (isImageNode(node) && filterImageNode(node)) {
        imgNodes.push(node);
      }
    });
    for (const node of imgNodes) {
      await addMetadata(node);
    }
    return tree;
  };
}
