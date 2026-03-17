import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QuntamLayerAI | Neo Minimal Engineering",
  description:
    "We build premium, scalable, and secure full-stack systems for enterprise clients. AI, Cloud, DevSecOps, and API engineering.",
  keywords: ["enterprise development", "full-stack", "AI engineering", "cloud architecture", "Next.js", "Node.js"],
  openGraph: {
    title: "QuntamLayerAI | Neo Minimal Engineering",
    description: "Premium enterprise-grade engineering for high-value clients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
