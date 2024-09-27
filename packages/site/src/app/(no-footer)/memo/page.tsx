import Meta from "@/components/Meta";
import { ArticleContent } from "@/components/article/Content";
import { ArticleFooter } from "@/components/article/Footer";
import { ArticleLayout } from "@/components/article/Layout";
import { metaData } from "note-site-data/meta";
import { parseMarkdown } from "@/lib/markdown";
import { ArticleTitle } from "@/components/article/Title";

const post = metaData.specialPages.memo_index;

export default async function MemoIndexPage() {
  const entirePath = ["memo"];
  const content = await parseMarkdown(post, entirePath);

  return (
    <ArticleLayout>
      <Meta
        title={"memo"}
        path={entirePath}
        og={{
          type: "article",
          image: {
            title: "memo",
            category: "memo",
            tags: [],
          },
        }}
      />
      <div className="pt-2">
        <ArticleTitle className="decoration-blue-500/30 py-3 text-center">
          Memo
        </ArticleTitle>
      </div>
      <ArticleContent>
        {content.content}
        <ArticleFooter title={"memo"} path={["memo"]} tags={[]} />
      </ArticleContent>
    </ArticleLayout>
  );
}
