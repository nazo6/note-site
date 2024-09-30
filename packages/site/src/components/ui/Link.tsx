import { LucideExternalLink } from "lucide-react";
import NextLink from "next/link";

export function Link(props: React.ComponentProps<"a"> & { icon?: boolean }) {
  const href = props.href ?? "#";
  const icon = props.icon ?? true;
  const { icon: _, ...p } = props;
  if (href.startsWith("http")) {
    return (
      <a target="_blank" rel="noopener noreferrer" {...p} href={href}>
        {props.children}
        {icon ? (
          <span className="inline-flex items-center w-[0.9em] h-[0.9em] align-text-bottom">
            <LucideExternalLink />
          </span>
        ) : null}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <NextLink className={props.className} href={href}>
        {props.children}
      </NextLink>
    );
  }
  return <a {...p} href={href} />;
}
