import { Tweet } from "react-tweet";
import { LinkCard } from "./LinkCard";
// import { Gist } from "./Embed/Gist";

export function Embed(props: { url: string }) {
  const url = new URL(props.url);
  if (url.hostname === "twitter.com") {
    const id = url.pathname.split("/").pop();
    if (id) {
      return <Tweet id={id} />;
    }
  } else if (
    url.hostname === "www.youtube.com" ||
    url.hostname === "youtu.be"
  ) {
    const id =
      url.hostname === "youtu.be"
        ? url.pathname.substring(1)
        : url.searchParams.get("v");
    if (id) {
      return (
        <div className="aspect-video lg:px-2 py-2">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      );
    }
  } else if (url.hostname === "gist.github.com") {
    const user = url.pathname.split("/")[1];
    const id = url.pathname.split("/")[2];

    return (
      <div className="py-2">
        {/* <Gist gist={`${user}/${id}`} titleClass="hidden" /> */}
      </div>
    );
  }

  return <LinkCard url={props.url} />;
}
