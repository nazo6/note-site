import type { OgImageOptions } from "note-site-common/types/meta";
import type { Assets } from ".";

export function ArticleImage(props: {
  imageOpts: OgImageOptions;
  assets: Assets;
}) {
  const { title, display, category, tags, index } = props.imageOpts;

  let bg =
    "linear-gradient(135deg, rgba(114,149,164,1) 4%, rgba(116,114,164,1) 44%, rgba(255,0,0,1) 100%)";
  if (category === "blog") {
    bg =
      "linear-gradient(135deg, rgba(164,114,164,1) 0%, rgba(121,9,108,1) 61%, rgba(255,0,0,1) 100%)";
  } else if (category === "memo") {
    bg =
      "linear-gradient(135deg, rgba(171,215,233,1) 4%, rgba(114,128,164,1) 44%, rgba(30,70,200,1) 100%)";
  }

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        backgroundImage: bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "1150px",
          height: "580px",
          boxSizing: "border-box",
          borderRadius: 16,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          backgroundColor: "#333333",
          fontWeight: 600,
          margin: 25,
          padding: 20,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 64,
            maxWidth: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {index ?? false ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={props.assets.folderIcon}
                width={60}
                height={60}
                style={{ marginRight: 20 }}
              />
              {` | ${display ?? title}`}
            </div>
          ) : (
            display ?? title
          )}
          {tags.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                fontSize: 30,
                width: "100%",
                marginTop: 20,
              }}
            >
              {tags.map((tag) => (
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#555555",
                    borderRadius: 9999,
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                  key={tag.join("/")}
                >
                  #{tag.join("/")}
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              color: "#d1d5db",
              fontSize: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={props.assets.profileImage}
              width={48}
              height={48}
              style={{ marginRight: 16, borderRadius: 4 }}
            />
            note.nazo6.dev
            {category ? (
              <>
                <div
                  style={{
                    width: "2px",
                    height: "80%",
                    marginRight: 16,
                    marginLeft: 16,
                    background: "#d1d5db",
                  }}
                />
                {category}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
