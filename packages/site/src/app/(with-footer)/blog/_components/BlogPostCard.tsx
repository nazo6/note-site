import { Link } from "@/components/ui/Link";
import { TagChip } from "@/components/ui/TagChip";
import { Pen, RefreshCcw } from "lucide-react";
import type { BlogPost } from "note-site-data/type/blog";

export async function BlogPostCard({
  path,
  post,
}: {
  path: string[];
  post: BlogPost;
}) {
  const entirePath = ["blog", ...path];

  return (
    <div className="card">
      <Link
        href={`/${entirePath.join("/")}`}
        className="flex flex-col justify-center py-2 px-5"
      >
        <div className="text-sm pb-2 flex items-center gap-1">
          <Pen size="15px" />
          {post.frontmatter.created}
          <RefreshCcw className="ml-4" size="15px" />
          {post.frontmatter.updated}
        </div>
        <div className="text-lg font-bold pb-3">{post.title}</div>
        {post.frontmatter.description ? (
          <div className="text-sm pb-2">{post.frontmatter.description}</div>
        ) : (
          <></>
        )}
        <div className="flex gap-2 text-sm">
          {post.frontmatter.tags.map((tag) => (
            <TagChip tag={tag} key={tag.join("/")} />
          ))}
        </div>
      </Link>
    </div>
  );
}
