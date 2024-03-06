import { Sidebar } from "./Sidebar";
import { LayoutClient } from "./layoutClient";

export default function MemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient sidebar={<Sidebar />}>{children}</LayoutClient>;
}
