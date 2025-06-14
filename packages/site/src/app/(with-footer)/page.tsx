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
    <Link
      href={href}
      className="w-full py-2
        bg-gray-200/20
        border border-slate-700 
        transition-all duration-300 ease-in-out 
        hover:shadow-2xl hover:shadow-sky-500/30
        hover:-translate-y-1
        hover:border-sky-500
        focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75
        group
    "
    >
      <div
        className="flex flex-col items-center px-4 gap-3
      "
      >
        <h3 className="text-2xl font-bold group-hover:text-sky-400 transition-colors duration-300">
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const content = await parseMarkdown(metaData.specialPages.about, ["about"]);
  return (
    <div className="py-10 flex flex-col items-center gap-5 px-3 max-w-article mx-auto pb-10">
      <Meta
        literalTitle
        title={"nazo6 note"}
        path={[]}
        og={{
          type: "top",
        }}
      />

      <Card href="/memo" title="/memo" description="あんまり長くない記事" />
      <Card
        href="/blog"
        title="/blog"
        description="ブログ記事。大半はZennにも投稿してます。"
      />
      <Card href="/tag" title="/tag" description="タグ一覧" />

      {content.content}
    </div>
  );
}
