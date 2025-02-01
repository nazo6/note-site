import Meta from "@/components/Meta";
import { ArticleContent } from "@/components/article/Content";
import { ArticleFooter } from "@/components/article/Footer";
import { ArticleLayout } from "@/components/article/Layout";
import { ArticleTitle } from "@/components/article/Title";
import { Link } from "@/components/ui/Link";
import { blogData, getPost } from "note-site-data/blog";
import { parseMarkdown } from "@/lib/markdown";
import { decodePath } from "@/lib/utils";
import { ArticleMeta } from "@/components/article/Meta";

export async function generateStaticParams() {
  return blogData.paths.map((p) => ({ path: p }));
}

export default async function Page(props: { params: Promise<{ path: string[] }> }) {
  const params = await props.params;
  const path = decodePath(params.path);
  const entirePath = ["blog", ...path];
  const post = getPost(path);
  const content = await parseMarkdown(post.source, entirePath);

  return (
    <ArticleLayout>
      <Meta
        title={post.title}
        path={entirePath}
        og={{
          type: "article",
          image: {
            title: post.title,
            category: "blog",
            tags: post.frontmatter.tags ?? [],
          },
        }}
        created={post?.frontmatter.created}
        updated={post?.frontmatter.updated}
        description={post?.frontmatter.description}
        canonical={
          post.frontmatter.zenn_published
            ? `https://zenn.dev/nazo6/articles/${path[path.length - 1]}`
            : undefined
        }
      />
      <div className="flex flex-col items-center pb-4 pt-4">
        <ArticleTitle className="decoration-red-400/50 pt-10 pb-8">
          {post.title}
        </ArticleTitle>
        <ArticleMeta
          frontmatter={post.frontmatter}
          tagClassName="border-red-500 hover:bg-red-500/50"
        />
      </div>
      <ArticleContent toc={content.headings}>
        {post.frontmatter.published && post.frontmatter.zenn_published && (
          <div className="flex justify-center my-3 p-1 bg-sky-500/10">
            この記事は、
            <Link
              href={`https://zenn.dev/nazo6/articles/${path[path.length - 1]}`}
              className="link"
            >
              Zenn
            </Link>
            にも投稿しています。
          </div>
        )}
        {content.content}
      </ArticleContent>
      <ArticleFooter
        title={post.title}
        path={entirePath}
        tags={post.frontmatter.tags}
      />
    </ArticleLayout>
  );
}
