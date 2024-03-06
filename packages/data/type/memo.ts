export type MemoFrontmatter = {
  published: boolean;
  created: string;
  updated: string;
  tags: string[][];
};
export type MemoPost = {
  path: string[];
  title: string;
  frontmatter: MemoFrontmatter;
  source: string;
};
export type MemoData = {
  posts: MemoPost[];
  paths: string[][];
  folderPaths: string[][];
};
