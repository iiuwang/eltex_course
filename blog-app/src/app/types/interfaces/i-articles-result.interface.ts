import { Post } from "../post";

export interface IArticlesResult {
  items: Post[];
  total: number;
  allPosts: Post[];
}