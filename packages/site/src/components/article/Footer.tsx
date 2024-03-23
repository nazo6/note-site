import { env } from "@/lib/server-env";
import { TwitterIcon } from "lucide-react";

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
    title,
  )}&url=${encodeURI(url.toString())}&hashtags=${tags
    .map((t) => t[t.length - 1])
    .join(",")}`;

  return (
    <div>
      <div className="pt-3">
        <div className="flex gap-2">
          <a
            href={twitterIntent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 border-2 border-sky-500 text-sky-700 dark:text-sky-400 hover:bg-sky-400/10 px-3 py-1 rounded-md items-center"
          >
            <TwitterIcon />
            Twitterでシェア
          </a>
        </div>
      </div>
    </div>
  );
}
