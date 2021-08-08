import fs from 'fs';
import { POSTS_DIRECTORY } from './constants';

export async function getPostIds() {
  return fs.promises.readdir(POSTS_DIRECTORY);
}
