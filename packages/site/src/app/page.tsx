import Meta from "@/components/Meta";
import { Link } from "@/components/ui/Link";

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

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-5 px-3 max-w-article mx-auto pt-6 pb-10">
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
      <Link href="/about" className="base-card p-2">
        about
      </Link>
    </div>
  );
}
