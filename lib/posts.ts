import type { PostData } from '../types';

export const allPosts: PostData[] = [
  {
    id: 'react-with-type-script-in-2019',
    data: {
      meta: {
        title: 'React with TypeScript in 2019',
        description:
          'An update after almost 4 years of using React with TypeScript.',
        date: '2019-09-01',
      },
    },
  },
  {
    id: 'using-elm-instead-of-react-and-typescript',
    data: {
      meta: {
        title: 'Using Elm instead of React and TypeScript',
        description:
          'Recently I republished a post about TypeScript and React. It got me thinking about recent elm experience and how it could be the better choice.',
        date: '2016-10-18',
      },
    },
  },
  {
    id: 'lets-encrypt',
    data: {
      meta: {
        title: "Let's Encrypt!",
        description:
          "The Let's Encrypt project became available in public beta a while ago and it’s finally a great solution for free SSL certificates.",
        date: '2016-01-16',
      },
    },
  },
  {
    id: 'typescript-with-react-and-jsx',
    data: {
      meta: {
        title: 'Typescript with React and JSX',
        description:
          "TypeScript introduced 1.6 beta on their blog in early September 2015, announcing they're adding JSX support. I decided to convert my project. Here is what I've learned.",
        date: '2015-09-10',
      },
    },
  },
];
