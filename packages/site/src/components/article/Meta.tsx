import { Tag } from "lucide-react";
import { Link } from "../ui/Link";
import clsx from "clsx";

function toDateStr(date: Date) {
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function ArticleMeta(props: {
  frontmatter: {
    description?: string;
    created: string;
    updated: string;
    tags: string[][];
  };
  tagClassName?: string;
}) {
  const created = new Date(props.frontmatter.created);
  const updated = new Date(props.frontmatter.updated);

  return (
    <div className="flex flex-col justify-center items-center">
      {props.frontmatter.description ? (
        <p className="my-2 text-gray-600 dark:text-gray-400">
          {props.frontmatter.description}
        </p>
      ) : (
        <></>
      )}

      <div className="mb-2 mt-4 inline-flex gap-2 rounded-md bg-gray-300 px-2 text-sm dark:bg-gray-700">
        <p>作成:{toDateStr(created)}</p>
        <p>更新:{toDateStr(updated)}</p>
      </div>
      {props.frontmatter.tags.length > 0 ? (
        <div className="my-2 flex flex-wrap items-center gap-2">
          <Tag size={15} />
          {props.frontmatter.tags.map((tag) => {
            const t = tag.join("/");
            return (
              <Link
                href={`/tag/${t}`}
                className={clsx(
                  "rounded-full border px-2 font-mono before:[content:'#'] text-sm",
                  props.tagClassName,
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
      )}
    </div>
  );
}
