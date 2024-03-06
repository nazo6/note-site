import { Link } from "@/components/ui/Link";
import { TagChipLink } from "@/components/ui/TagChip";
import { getPost as getBlogPost } from "note-site-data/blog";
import { getPost as getMemoPost } from "note-site-data/memo";
import { BlogPost } from "note-site-data/type/blog";
import { MemoPost } from "note-site-data/type/memo";

function pad(n: number) {
  return n > 9 ? n : `0${n}`;
}

export function TagLinkCard({
  path,
  title,
}: {
  path: string[];
  title: string;
}) {
  return (
    <div className="mx-w-sm card">
      <Link href={`/${path.join("/")}`}>
        <div className="p-2">{title}</div>
      </Link>
    </div>
  );
}

type PostLinkCardProps =
  | {
      type: "memo";
      post: MemoPost;
    }
  | {
      type: "blog";
      post: BlogPost;
    };
export function PostLinkCard(props: PostLinkCardProps) {
  let categoryTag: React.ReactNode;

  if (props.type === "blog") {
    categoryTag = (
      <div className="rounded-full border px-2 bg-red-300 dark:bg-red-700">
        blog
      </div>
    );
  } else if (props.type === "memo") {
    categoryTag = (
      <div className="rounded-full border px-2 bg-blue-300 dark:bg-blue-700">
        memo
      </div>
    );
  }

  const date = new Date(props.post.frontmatter.created);

  return (
    <div className="flex items-center card px-2 py-2 gap-2">
      {categoryTag}
      <div className="flex flex-wrap items-center">
        <Link
          href={`/${props.type}/${props.post.path.join("/")}`}
          className="flex gap-2 mx-w-sm link items-center"
        >
          <div>
            <span className="rounded-md border py-0.5 px-2 bg-gray-300 dark:bg-gray-800">
              {date.getFullYear()}/{pad(date.getMonth() + 1)}
            </span>
            <span className="pl-1">{props.post.title}</span>
          </div>
        </Link>
        <div className="flex flex-wrap pl-2 gap-2">
          {props.post.frontmatter.tags.map((tag) => (
            <TagChipLink tag={tag} key={tag.join("/")} />
          ))}
        </div>
      </div>
    </div>
  );
}
