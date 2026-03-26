import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Headless CMS | Next.js + WordPress",
  description: "A premium headless CMS experience built with Next.js and WordPress REST API",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allCategories = await getCategories();
  const categories = allCategories.filter((cat: any) => cat.slug !== 'uncategorized');

  return (
    <html lang="en">
      <body>
        <Header categories={categories} />
        <main className="min-h-[80vh] flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
