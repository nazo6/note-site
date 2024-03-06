import clsx from "clsx";

import { Link } from "@/components/ui/Link";

export function TagChipLink(props: { tag: string[]; className?: string }) {
  const t = props.tag.join("/");
  return (
    <Link
      href={`/tag/${t}`}
      className={clsx(
        "rounded-full border border-gray-500 px-2 font-mono before:[content:'#'] hover:bg-gray-500/50",
        props.className,
      )}
      key={t}
    >
      {t}
    </Link>
  );
}

export function TagChip(props: { tag: string[]; className?: string }) {
  const t = props.tag.join("/");
  return (
    <div
      className={clsx(
        "rounded-full border border-gray-500 px-2 font-mono before:[content:'#']",
        props.className,
      )}
      key={t}
    >
      {t}
    </div>
  );
}
