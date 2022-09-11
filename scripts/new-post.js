import { existsSync, promises as fs } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

import appRoot from 'app-root-path';
import inquirer from 'inquirer';
import kebabCase from 'lodash.kebabcase';

(async () => {
  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter new blog post title:',
      validate: (value) => value.trim().length > 0,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description:',
      default: '',
    },
  ]);

  const filePath = resolve(
    appRoot.path,
    'pages',
    'blog',
    kebabCase(response.title),
    'index.mdx',
  );

  console.log(
    `Attempting to create a new post entry at ${relative(
      appRoot.path,
      filePath,
    )}`,
  );

  if (existsSync(filePath)) {
    throw new Error(`File for title "${response.title}" already exists!`);
  }

  const postMetadata = [
    `import PostPage from '../../../components/PostPage';`,
    ``,
    `export const meta = {`,
    ` title: "${response.title}",`,
    ` description: "${response.description}",`,
    ` date: "${getDateString()}",`,
    `};`,
    ``,
    `export default ({ children }) => <PostPage meta={meta}>{children}</PostPage>;`,
    ``, // final newline
  ];

  await fs.mkdir(dirname(filePath));
  await fs.writeFile(filePath, postMetadata.join('\n'));
  console.log(`Post created successfully!`);
})();

function getDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}
