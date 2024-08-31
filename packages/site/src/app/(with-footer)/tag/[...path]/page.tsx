import { ArticleLayout } from "@/components/article/Layout";
import { Link } from "@/components/ui/Link";
import { getPost as getBlogPost } from "note-site-data/blog";
import { getPost as getMemoPost } from "note-site-data/memo";
import { tagData } from "note-site-data/tag";
import type { BlogPost } from "note-site-data/type/blog";
import type { MemoPost } from "note-site-data/type/memo";
import { decodePath, getTitleFromPath } from "@/lib/utils";

import { PostLinkCard, TagLinkCard } from "../_components/Card";
import Meta from "@/components/Meta";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export async function generateStaticParams() {
  if (process.env.NODE_ENV === "production") {
    return tagData.tagList.map((t) => ({
      path: t,
    }));
  }
  return tagData.tagList.map((t) => ({
    path: t.map(encodeURI),
  }));
}

export default async function TagPage({
  params,
}: { params: { path: string[] } }) {
  const path = decodePath(params.path ?? []);
  const childrenTags = tagData.tagList.filter((tag) => {
    return (
      tag.join("/").startsWith(path.join("/")) &&
      tag.join("/") !== path.join("/")
    );
  });

  childrenTags.sort((a, b) => {
    return collator.compare(a.join("/"), b.join("/"));
  });
  const tagBlogArticleList: BlogPost[] = [];
  const tagMemoArticleList: MemoPost[] = [];
  tagData.fileTags
    .filter((article) => {
      for (const tag of article.tags) {
        if (tag.join("/").startsWith(path.join("/"))) {
          return true;
        }
      }
      return false;
    })
    .forEach((article) => {
      const category = article.path[0];
      const path = article.path.slice(1);

      if (category === "blog") {
        tagBlogArticleList.push(getBlogPost(path));
      } else {
        const p = getMemoPost(path);
        if (!p) {
          throw Error(`Invalid path: ${path.join("/")}`);
        }
        tagMemoArticleList.push(p);
      }
    });

  tagBlogArticleList.sort((a, b) => {
    return (
      new Date(b.frontmatter.created).getTime() -
      new Date(a.frontmatter.created).getTime()
    );
  });
  tagMemoArticleList.sort((a, b) => {
    return (
      new Date(b.frontmatter.created).getTime() -
      new Date(a.frontmatter.created).getTime()
    );
  });

  return (
    <ArticleLayout>
      <Meta title={`${getTitleFromPath(path)} - Tag`} path={["tag", ...path]} />
      <div className="bg-content p-2">
        <div className="flex items-end pt-3">
          <ol className="text-md flex [&>li]:after:whitespace-pre-wrap [&>li]:after:[content:'_/_']">
            <li>
              <Link className="link" href="/tag">
                Tag
              </Link>
            </li>
            {path.slice(0, -1).map((p, i) => (
              <li key={p}>
                <Link
                  className="link"
                  href={path
                    .slice(0, i + 1)
                    .reduce((pre, crr) => `${pre}/${crr}`, "/tag")}
                >
                  {p}
                </Link>
              </li>
            ))}
          </ol>
          <h1 className="h1">{path[path.length - 1]}</h1>
        </div>
        {childrenTags.length > 0 ? (
          <div className="pt-4">
            <h2 className="h2">Children Tags</h2>
            <div className="flex flex-row flex-wrap gap-2">
              {childrenTags.map((tag) => (
                <div key={tag.join("/")} className="min-w-[100px]">
                  <TagLinkCard
                    path={["tag", ...tag]}
                    title={`# ${tag.join("/")}`}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {tagBlogArticleList.length + tagMemoArticleList.length > 0 ? (
          <div className="pt-4">
            <h2 className="h2">Articles</h2>
            {tagBlogArticleList.length > 0 && (
              <>
                <h3 className="h3 py-2">Blog</h3>
                <div className="flex flex-col gap-2">
                  {tagBlogArticleList.map((post) => (
                    <div key={post.path.join("/")}>
                      <PostLinkCard post={post} type="blog" />
                    </div>
                  ))}
                </div>
              </>
            )}
            {tagMemoArticleList.length > 0 && (
              <>
                <h3 className="h3 py-2">Memo</h3>
                <div className="flex flex-col gap-3">
                  {tagMemoArticleList.map((post) => (
                    <div key={post.path.join("/")}>
                      <PostLinkCard post={post} type="memo" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : null}
      </div>
    </ArticleLayout>
  );
}
