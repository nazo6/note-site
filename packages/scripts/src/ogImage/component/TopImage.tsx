import { Assets } from ".";

export function TopImage(props: { assets: Assets }) {
  const bg = "linear-gradient(#e66465, #9198e5)";

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
          borderRadius: 16,
          display: "flex",
          flexDirection: "row",
          backgroundColor: "rgb(55,65,81)",
          fontWeight: 600,
          margin: 25,
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <img
          alt=""
          src={props.assets.profileImage}
          width={60}
          height={60}
          style={{ marginRight: 24, borderRadius: 4 }}
        />
        <div style={{ fontSize: 40 }}>note.nazo6.dev</div>
      </div>
    </div>
  );
}
