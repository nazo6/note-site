import type React from "react";

import { Link as LinkUi } from "@/components/ui/Link";

export async function Link(
  props: { href?: string } & Omit<
    React.ComponentProps<typeof LinkUi>,
    "href" | "ref"
  >,
) {
  return <LinkUi {...props} className="link" />;
}
