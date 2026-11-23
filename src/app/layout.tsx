import type { Metadata } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Blobs } from "@/components/blobs";
import { Footer, Nav } from "@/components/nav";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/content/site";
import "./globals.css";

const head = Fraunces({ variable: "--font-head", subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"] });
const body = Nunito({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.intro,
  openGraph: { title: site.name, description: site.intro, type: "website" },
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${head.variable} ${body.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
        <Blobs />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
