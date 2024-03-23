import { tagData } from "note-site-data/tag";
import { ArticleLayout } from "@/components/article/Layout";
import { TagLinkCard } from "./_components/Card";
import Meta from "@/components/Meta";

export default async function TagIndexPage() {
  const tagList = tagData.tagList.map((t) => t.join("/"));
  tagList.sort(
    new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: "base",
    }).compare,
  );

  return (
    <ArticleLayout>
      <Meta
        title="Tags"
        path={["tag"]}
        og={{
          type: "article",
        }}
      />
      <div className="bg-content px-2 pb-5">
        <h1 className="h1 pt-4">Tags</h1>
        <div className="flex flex-wrap gap-2 pt-4">
          {tagList.map((tag) => {
            return (
              <div key={tag}>
                <TagLinkCard
                  title={`# ${tag}`}
                  path={["tag", ...tag.split("/")]}
                />
              </div>
            );
          })}
        </div>
      </div>
    </ArticleLayout>
  );
}
