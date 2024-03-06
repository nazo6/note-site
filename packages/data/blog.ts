import { BlogData, BlogPost } from "./type/blog";

import b from "./json/blog.json";

export const blogData: BlogData = b;

export function getPost(path: string[]): BlogPost {
  const post = blogData.posts.find((p) => p.path.join("/") === path.join("/"));
  if (!post) {
    throw Error(`Invalid blog post path: ${path.join("/")}`);
  }

  return post;
}
