import clsx from "clsx";
import type { MDXRemoteProps } from "next-mdx-remote";

import { CodeBlock } from "./CodeBlock";
import { Embed } from "./Embed";
import { Link } from "./Link";
import { Typography } from "./Typography";
import { Image } from "./Image";

export const components: MDXRemoteProps["components"] = {
  h1: (props) => <Typography {...props} variant="h1" />,
  h2: (props) => <Typography {...props} variant="h2" />,
  h3: (props) => <Typography {...props} variant="h3" />,
  h4: (props) => <Typography {...props} variant="h4" />,
  h5: (props) => <Typography {...props} variant="h5" />,
  h6: (props) => <Typography {...props} variant="h6" />,
  a: (props) => <Link {...props} href={props.href ?? ""} />,
  table: (props) => (
    <div className="overflow-x-auto p-1">
      <table className="my-2 w-full min-w-[450px]" {...props} />
    </div>
  ),
  p: (props) => <div {...props} className={clsx("pt-4", props.className)} />,
  pre: (props) => <CodeBlock {...props} />,
  summary: (props) => (
    <summary {...props} className={clsx("pt-4", props.className)} />
  ),
  details: (props) => (
    <details {...props} className={clsx("pt-4", props.className)} />
  ),
  Embed: (props) => <Embed {...props} />,
  img: (props) => <Image {...props} />,
};
