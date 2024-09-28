import { env } from "@/lib/server-env";
import { SiX } from "@icons-pack/react-simple-icons";

export function ArticleFooter({
  path,
  title,
  tags,
}: {
  path: string[];
  title: string;
  tags: string[][];
}) {
  const url = new URL(env.BASE_URL);
  url.pathname = path.join("/");
  const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${title} - nazo6 note`,
  )}&url=${encodeURI(url.toString())}&hashtags=${tags
    .map((t) => t[t.length - 1])
    .join(",")}`;

  return (
    <div className="pb-5">
      <div className="border-t my-5" />
      <div className="pt-3">
        <div className="flex gap-2 justify-center">
          <a
            href={twitterIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 border-2 border-gray-500 hover:bg-gray-800 bg-black text-white px-3 py-1 rounded-md items-center"
          >
            <SiX />
            Xでシェア
          </a>
        </div>
      </div>
    </div>
  );
}
