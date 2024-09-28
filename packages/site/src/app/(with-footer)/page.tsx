import Meta from "@/components/Meta";
import { Link } from "@/components/ui/Link";
import { metaData } from "note-site-data/meta";
import { parseMarkdown } from "@/lib/markdown";
import { ArticleTitle } from "@/components/article/Title";

function Card({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={href} className="w-full py-2 base-card">
      <div className="flex flex-col items-center px-4 gap-3">
        <h3 className="h3 col-span-1">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const content = await parseMarkdown(metaData.specialPages.about, ["about"]);
  return (
    <div className="flex flex-col items-center gap-5 px-3 max-w-article mx-auto pb-10">
      <Meta
        literalTitle
        title={"nazo6 note"}
        path={[]}
        og={{
          type: "top",
        }}
      />
      {content.content}

      <div className="border-t-2 w-full text-center py-2">
        <ArticleTitle className="decoration-gray-400">コンテンツ</ArticleTitle>
      </div>

      <Card href="/memo" title="/memo" description="あんまり長くない記事" />
      <Card
        href="/blog"
        title="/blog"
        description="ブログ記事。大半はZennにも投稿してます。"
      />
      <Card href="/tag" title="/tag" description="タグ一覧" />
    </div>
  );
}
