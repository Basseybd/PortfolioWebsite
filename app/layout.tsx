import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bassey's Porfolio",
  description: "An insight to Bassey's software dev experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="text-gray-400 bg-gray-900 body-font">
        <Navbar />
        <div className={inter.className}>{children}</div>
      </body>
    </html>
  );
}
