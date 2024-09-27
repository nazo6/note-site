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
          <span className="inline-flex items-center">
            <LucideExternalLink
              size={14}
              className="inline align-text-bottom"
            />
          </span>
        ) : null}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <NextLink className={props.className} href={encodeURI(href)}>
        {props.children}
      </NextLink>
    );
  }
  return <a {...p} href={href} />;
}
