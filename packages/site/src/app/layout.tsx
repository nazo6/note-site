import { TopBar } from "@/components/module/TopBar";

import { Providers } from "./_components/providers";

import { env } from "@/lib/server-env";

import "../globals.css";
import "../markdown.css";
import "nprogress/nprogress.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-[100vh]">
        <TopBar isPrivate={env.PRIVATE} />
        {children}
      </div>
    </Providers>
  );
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ja" className="text-[16.5px]">
      <body suppressHydrationWarning className="dark:bg-[#1B1D21]">
        <Layout>{children}</Layout>
        {!env.DEV && env.ANALYTICS_ENABLED ? (
          <>
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${env.GA_MEASUREMENT_ID}`}
              defer
            />
            <script
              // biome-ignore lint/security/noDangerouslySetInnerHtml: We need to set this for Google Analytics
              dangerouslySetInnerHTML={{
                __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${env.GA_MEASUREMENT_ID}');`,
              }}
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
