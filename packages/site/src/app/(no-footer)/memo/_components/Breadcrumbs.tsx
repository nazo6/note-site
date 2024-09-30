import { Link } from "@/components/ui/Link";

export function Breadcrumbs({ path }: { path: string[] }) {
  return (
    <nav>
      <ol className="mt-2 text-md flex [&>li]:after:whitespace-pre-wrap [&>li:not(:last-of-type)]:after:[content:'_/_'] [&>li]:after:mx-1">
        <li>
          <Link className="" href="/memo">
            memo
          </Link>
        </li>
        {path.slice(0, -1).map((p, i) => (
          <li key={p}>
            <Link
              className=""
              href={path
                .slice(0, i + 1)
                .reduce((pre, crr) => `${pre}/${crr}`, "/memo")}
            >
              {p}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
