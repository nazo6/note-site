import { Footer } from "@/components/module/Footer";

export default function FooterLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <div className="pt-header mb-auto">{children}</div>
      <Footer />
    </div>
  );
}
