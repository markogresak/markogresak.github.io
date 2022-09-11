import { existsSync, promises } from 'fs';
import { prompt } from 'inquirer';
import kebabCase from 'lodash.kebabcase';
import { dirname, relative, resolve } from 'path';

(async () => {
  const response = await prompt([
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
    __dirname,
    'pages',
    'blog',
    kebabCase(response.title),
    'index.mdx',
  );

  console.log(
    `Attempting to create a new post entry at ${relative(__dirname, filePath)}`,
  );

  if (existsSync(filePath)) {
    throw new Error(`File for title "${response.title}" already exists!`);
  }

  const postMetadata = [
    `import PostPage from '../../../components/PostPage';`,
    ``,
    `export const meta = {`,
    ` title: "${response.title}"`,
    ` description: "${response.description}"`,
    ` date: "${getDateString()}"`,
    `};`,
    ```export default ({ children }) => <PostPage meta={meta}>{children}</PostPage>;```, // final newline
  ];

  await promises.mkdir(dirname(filePath));
  await promises.writeFile(filePath, postMetadata.join('\n'));
  console.log(`Post created successfully!`);
})();

function getDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}
