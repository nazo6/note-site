import clsx from "clsx";

export function ArticleTitle(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={clsx(
        "text-3xl font-bold underline decoration-[0.3rem] underline-offset-[-0.5px] [text-decoration-skip-ink:none]",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
}
