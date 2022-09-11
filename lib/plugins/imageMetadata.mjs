// Output of `npx -y esbuild --target=es2022 ./lib/plugins/imageMetadata.ts`
"use strict";
import path from "node:path";
import appRoot from "app-root-path";
import imageSize from "image-size";
import { visit } from "unist-util-visit";
const IMAGE_DIRECTORY_PUBLIC = path.join("/", "images", "blog");
const PUBLIC_DIR_PATH = path.join(
  appRoot.path,
  "public",
  IMAGE_DIRECTORY_PUBLIC
);
function isImageNode(node) {
  const img = node;
  return img.type === "element" && img.tagName === "img" && typeof img.properties?.src === "string";
}
function resolveImageFilePath(src) {
  if (!path.isAbsolute(src)) {
    throw new Error(`resolveImageFilePath: Image URL is not absolute: ${src}`);
  }
  return path.join(PUBLIC_DIR_PATH, src);
}
function resolveImagePublicPath(src) {
  if (!path.isAbsolute(src)) {
    throw new Error(
      `resolveImagePublicPath: Image URL is not absolute: ${src}`
    );
  }
  return path.join(IMAGE_DIRECTORY_PUBLIC, src);
}
async function addMetadata(node) {
  const result = await new Promise(
    (resolve) => {
      imageSize(resolveImageFilePath(node.properties.src), (error, result2) => {
        if (error) {
          console.error(error);
        }
        resolve(error ? void 0 : result2);
      });
    }
  );
  if (!result) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }
  node.properties.width = result.width;
  node.properties.height = result.height;
}
function fixSrcPath(node) {
  node.properties.src = resolveImagePublicPath(node.properties.src);
}
export const imageMetadata = () => {
  return async function transformer(tree) {
    const imgNodes = [];
    visit(tree, "element", (node) => {
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
