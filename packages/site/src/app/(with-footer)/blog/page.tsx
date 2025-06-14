import { ArticleLayout } from "@/components/article/Layout";
import { blogData, getPost } from "note-site-data/blog";

import { BlogPostCard } from "./_components/BlogPostCard";
import Meta from "@/components/Meta";
import { ArticleTitle } from "@/components/article/Title";

function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}

export default async function BlogIndexPage() {
  const posts = blogData.posts;
  posts.sort((a, b) => {
    return (
      new Date(b.frontmatter.created).getTime() -
      new Date(a.frontmatter.created).getTime()
    );
  });
  const postCategorized: Map<string, string[][]> = new Map();
  posts.forEach((post) => {
    const date = new Date(post.frontmatter.created);
    const category = `${pad(date.getFullYear())}/${pad(date.getMonth() + 1)}`;
    if (!postCategorized.has(category)) {
      postCategorized.set(category, []);
    }
    postCategorized.get(category)?.push([post.frontmatter.slug]);
  });

  return (
    <ArticleLayout>
      <Meta
        title={"blog"}
        path={["blog"]}
        og={{
          type: "article",
          image: {
            title: "blog",
            category: "blog",
            tags: [],
          },
        }}
      />
      <ArticleTitle className="decoration-red-400/50 py-12 text-center">
        ブログ記事一覧
      </ArticleTitle>
      <div className="bg-content p-2 gap-5 flex flex-col">
        {Array.from(postCategorized).map(([category, paths]) => (
          <div key={category} className="flex flex-col gap-5">
            {paths.map((path) => {
              return (
                <div key={path.join("/")}>
                  <BlogPostCard path={path} post={getPost(path)} />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </ArticleLayout>
  );
}

export const metadata = {
  description: "nazo6のブログです。主にプログラミングのこととかを書きます。",
};
