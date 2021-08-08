const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const IMAGES_DIRECTORY_PUBLIC = path.join(
  process.cwd(),
  'public',
  'images',
  'blog',
);

const IMAGES_SRC = path.join(
  process.cwd(),
  'content',
  'blog',
  '**',
  '*.{jpg,png}',
);

async function main() {
  await fs.rm(IMAGES_DIRECTORY_PUBLIC, { recursive: true, force: true });
  await fs.mkdir(IMAGES_DIRECTORY_PUBLIC);
  const imagePaths = await glob(IMAGES_SRC);
  await Promise.all(
    imagePaths.map(async (imagePath) => {
      const imageName = path.basename(imagePath);
      const destPath = path.join(IMAGES_DIRECTORY_PUBLIC, imageName);
      await fs.copyFile(imagePath, destPath);
    }),
  );
}

main();
