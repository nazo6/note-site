import { Footer } from "@/components/module/Footer";

export default function FooterLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-header mb-auto">{children}</div>
      <Footer />
    </div>
  );
}
