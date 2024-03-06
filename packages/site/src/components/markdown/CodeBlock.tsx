import { Code as CodeC } from "bright";
import theme from "./codehikeTheme";

CodeC.lineNumbers = false;
CodeC.theme = theme;

interface Code {
  props: { className: string; children: string };
  type: string;
}
type Props = {
  children?: Code | React.ReactNode;
};
function isCodeBlock(children: any): children is Code {
  return children.type === "code";
}

export async function CodeBlock({ children }: Props) {
  if (!children || !isCodeBlock(children)) {
    return null;
  }
  const match = /language-(\w+)(:?.*)/.exec(children.props.className || "");
  const language = (match?.[1] ? match[1] : "").toLowerCase();
  const fileName = match?.[2] ? match[2].slice(1) : null;

  let code = children.props.children;
  if (code.endsWith("\n")) {
    code = code.slice(0, -1);
  }

  return (
    <div className="flex flex-col text-sm" suppressHydrationWarning>
      <CodeC title={fileName ?? undefined} lang={language}>
        {code}
      </CodeC>
    </div>
  );
}
