export type BlogFrontmatter = {
  published: boolean;
  created: string;
  updated: string;
  tags: string[][];
  slug: string;
  zenn_published: boolean;
  zenn_type?: string;
  zenn_topics?: string[];
  zenn_emoji?: string;
};
export type BlogPost = {
  /// Path in website
  path: string[];
  title: string;
  frontmatter: BlogFrontmatter;
  source: string;
};

export type BlogData = {
  posts: BlogPost[];
  paths: string[][];
};
