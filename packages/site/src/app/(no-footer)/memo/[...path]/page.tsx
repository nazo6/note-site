import clsx from "clsx";
import { FolderOpen } from "lucide-react";

import { ArticleContent } from "@/components/article/Content";
import { ArticleFooter } from "@/components/article/Footer";
import { ArticleLayout } from "@/components/article/Layout";
import { ArticleTags } from "@/components/article/Tags";
import { ArticleTimeInfo } from "@/components/article/TimeInfo";
import { ArticleTitle } from "@/components/article/Title";
import { getPost, memoData } from "note-site-data/memo";
import { parseMarkdown } from "@/lib/markdown";
import { decodePath } from "@/lib/utils";

import { Breadcrumbs } from "../_components/Breadcrumbs";
import { FolderPageTree } from "../_components/FolderPageTree";
import Meta from "@/components/Meta";

type Props = {
  params: { path: string[] | null };
};

export async function generateStaticParams() {
  // In dev server, nextjs complains if url is not encoded,
  // but in production, ENAMETOOLONG error occurs if url is encoded.
  if (process.env.NODE_ENV === "production") {
    return [...memoData.paths, ...memoData.folderPaths].map((p) => ({
      path: p,
    }));
  }
  return [...memoData.paths, ...memoData.folderPaths].map((p) => ({
    path: p.map(encodeURI),
  }));
}

export default async function Page({ params }: Props) {
  const path = decodePath(params.path ?? []);
  const entirePath = ["memo", ...path];
  const post = getPost(path);
  const isIndex = memoData.folderPaths.some(
    (p) => p.join("/") === path.join("/"),
  );
  let content = null;
  if (post) {
    content = await parseMarkdown(post.source, entirePath);
  }

  const pageTitle = post?.title ?? path.join("/");

  return (
    <ArticleLayout>
      <Meta
        title={pageTitle}
        path={entirePath}
        og={{
          type: "article",
          image: {
            title: pageTitle,
            index: isIndex,
            category: "memo",
            tags: post?.frontmatter.tags ?? [],
          },
        }}
        index={!isIndex}
        created={post?.frontmatter.created}
        updated={post?.frontmatter.updated}
      />
      {post && content ? (
        <>
          <Breadcrumbs path={path} />
          <div className="flex flex-col items-center">
            <ArticleTitle className="decoration-blue-500/30 py-5">
              {!post.frontmatter.published ? <span>🔒</span> : null}
              {post.title}
            </ArticleTitle>
            <ArticleTimeInfo
              updated={new Date(post.frontmatter.updated)}
              created={new Date(post.frontmatter.created)}
            />
            <ArticleTags
              tags={post.frontmatter.tags}
              className="border-blue-500 hover:bg-blue-500/50"
            />
          </div>
          <ArticleContent toc={content.headings}>
            {content.content}
            <ArticleFooter
              title={post.title}
              path={entirePath}
              tags={post.frontmatter.tags}
            />
          </ArticleContent>
        </>
      ) : (
        <></>
      )}
      {isIndex ? (
        <aside className={clsx({ "mt-2 border-t border-gray-500": post })}>
          <IndexPage path={path} />
        </aside>
      ) : null}
    </ArticleLayout>
  );
}

function IndexPage({ path }: { path: string[] }) {
  return (
    <>
      <Breadcrumbs path={path} />
      <ArticleContent>
        <ArticleTitle className="decoration-blue-500/30 flex gap-2 items-center py-3">
          <FolderOpen />/{path.length === 0 ? "memo" : path.join("/")}
        </ArticleTitle>
        <FolderPageTree path={path} />
      </ArticleContent>
    </>
  );
}
