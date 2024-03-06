import { Link } from "@/components/ui/Link";
import { TagChip } from "@/components/ui/TagChip";
import { getPost } from "note-site-data/blog";

export async function BlogPostCard({
  path,
  title,
}: {
  path: string[];
  title: string;
}) {
  const entirePath = ["blog", ...path];
  const post = getPost(path);

  return (
    <div className="card">
      <Link
        href={`/${entirePath.join("/")}`}
        className="flex flex-col justify-center py-2 px-5"
      >
        <div className="text-lg">{title}</div>
        <div className="flex gap-2 text-sm">
          {post.frontmatter.tags.map((tag) => (
            <TagChip tag={tag} key={tag.join("/")} />
          ))}
        </div>
      </Link>
    </div>
  );
}
