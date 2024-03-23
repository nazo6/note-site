import { Link } from "@/components/ui/Link";

export function Breadcrumbs({ path }: { path: string[] }) {
  return (
    <nav>
      <ol className="text-md flex [&>li]:after:whitespace-pre-wrap [&>li]:after:[content:'_/_']">
        <li>
          <Link className="link" href="/memo">
            memo
          </Link>
        </li>
        {path.slice(0, -1).map((p, i) => (
          <li key={p}>
            <Link
              className="link"
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
