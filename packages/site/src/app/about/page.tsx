import Meta from "@/components/Meta";
import { metaData } from "note-site-data/meta";
import { parseMarkdown } from "@/lib/markdown";

export default async function AboutPage() {
  const content = await parseMarkdown(metaData.specialPages.about, ["about"]);
  return (
    <div className="flex justify-center pb-3 px-3 max-w-article mx-auto mb-10 bg-content">
      <Meta
        title={"about"}
        path={["about"]}
        og={{
          type: "top",
        }}
      />
      {content.content}
    </div>
  );
}
