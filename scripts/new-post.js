const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const kebabCase = require('lodash.kebabcase')

;(async () => {
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
  ])

  const filePath = path.resolve(
    __dirname,
    'content',
    'blog',
    kebabCase(response.title),
    'index.md',
  )

  console.log(
    `Attempting to create a new post entry at ${path.relative(
      __dirname,
      filePath,
    )}`,
  )

  if (fs.existsSync(filePath)) {
    throw new Error(`File for title "${response.title}" already exists!`)
  }

  const postMetadata = [
    `---`,
    `title: '${response.title}'`,
    `description: '${response.description}'`,
    `date: '${getDateString()}'`,
    `---`,
    ``, // final newline
  ]

  await fs.promises.mkdir(path.dirname(filePath))
  await fs.promises.writeFile(filePath, postMetadata.join('\n'))
  console.log(`Post created successfully!`)
})()

function getDateString(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`
}
