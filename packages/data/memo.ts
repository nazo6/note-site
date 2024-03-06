import { MemoData, MemoPost } from "./type/memo";

import m from "./json/memo.json";

export const memoData: MemoData = m;

export function getPost(path: string[]): MemoPost | undefined {
  const post = memoData.posts.find((p) => p.path.join("/") === path.join("/"));
  return post;
}
