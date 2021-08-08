import { FrontmatterData } from './FrontmatterData';

export interface PostData extends FrontmatterData {
  id: string;
  content: string;
}
