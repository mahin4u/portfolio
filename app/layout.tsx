import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSiteConfig } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s · ${site.shortName}`,
    },
    description: site.description,
    keywords: [
      site.name,
      "portfolio",
      "supply chain",
      "stock trading",
      "photography",
      "Belgium",
      "Bangladesh",
    ],
    authors: [{ name: site.name }],
    openGraph: {
      type: "website",
      title: `${site.name} — ${site.role}`,
      description: site.description,
      url: site.url,
      siteName: site.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteConfig();
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
      </body>
    </html>
  );
}
