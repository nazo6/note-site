import clsx from "clsx";
import { Tag } from "lucide-react";
import { Link } from "@/components/ui/Link";

export function ArticleTags(props: { tags: string[][]; className?: string }) {
  return props.tags.length > 0 ? (
    <div className="my-2 flex flex-wrap items-center gap-2">
      <Tag size={18} />
      {props.tags.map((tag) => {
        const t = tag.join("/");
        return (
          <Link
            href={`/tag/${t}`}
            className={clsx(
              "rounded-full border px-2 font-mono before:[content:'#']",
              props.className,
            )}
            key={t}
          >
            {t}
          </Link>
        );
      })}
    </div>
  ) : (
    <></>
  );
}
