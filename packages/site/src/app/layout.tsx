import { TopBar } from "@/components/module/TopBar";

import { Providers } from "./_components/providers";

import { env } from "@/lib/server-env";
import RootLayoutClient from "./layoutClient";

import "../globals.css";
import "../markdown.css";
import "nprogress/nprogress.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="min-h-[100vh]">
        {children}
        <TopBar isPrivate={env.PRIVATE} />
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
    <html suppressHydrationWarning lang="ja">
      <body suppressHydrationWarning>
        <RootLayoutClient />
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
