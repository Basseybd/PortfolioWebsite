import type React from "react";
import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bassey Duke, Senior Software Engineer",
  description:
    "Senior Software Engineer with 7+ years across fintech, consulting, and healthcare. Modernizing frontend platforms and shipping AI infrastructure at Capital One.",
  openGraph: {
    title: "Bassey Duke, Senior Software Engineer",
    description:
      "Senior Software Engineer with 7+ years across fintech, consulting, and healthcare. Modernizing frontend platforms and shipping AI infrastructure at Capital One.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-cream font-sans text-primary antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
