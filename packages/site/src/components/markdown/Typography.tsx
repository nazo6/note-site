import React from "react";

import clsx from "clsx";
import { Link as LinkIcon } from "lucide-react";

export function Typography(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {
    variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  },
) {
  const iconSizes = {
    h1: 20,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
  };
  return React.createElement(
    props.variant,
    {
      ...props,
      className: clsx(props.className, "group", props.variant),
    },
    <>
      {props.children}
      <a
        href={`#${props.id}`}
        className="pl-1 text-gray-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hidden group-hover:inline-block"
      >
        <LinkIcon size={iconSizes[props.variant]} />
      </a>
    </>,
  );
}
