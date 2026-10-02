import type React from "react";
import type { Metadata, Viewport } from "next";
import "@fontsource/libre-caslon-display/400.css";
import "@fontsource/libre-caslon-text/400.css";
import "@fontsource/libre-caslon-text/400-italic.css";
import "@fontsource/libre-caslon-text/700.css";
import "@fontsource/fragment-mono/400.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { portrait, site } from "@/lib/content";

const title = "Bassey Duke | AI-focused Senior Software Engineer";
const description =
  "Senior software engineer in New York building AI features and production systems with TypeScript, React, Node.js, and AWS. Photographer on the side. Open to AI contract and part-time work.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    title,
    description,
    url: site.url,
    siteName: "Bassey Duke",
    type: "website",
    images: [{ url: portrait.srcSmall, width: 1200, height: 1200, alt: portrait.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [portrait.srcSmall] },
};

export const viewport: Viewport = {
  themeColor: "#201B18",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
