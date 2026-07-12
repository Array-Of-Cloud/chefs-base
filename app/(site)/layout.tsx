import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import type { CSSProperties } from "react";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlForImage } from "@/sanity/lib/image";
import { getTheme } from "@/lib/themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Chefs Base LLP";
  const title = settings?.defaultSeoTitle || siteName;
  const description =
    settings?.defaultSeoDescription ||
    "Premium retort foods for international restaurant buyers.";
  const ogImage = settings?.defaultOgImage
    ? urlForImage(settings.defaultOgImage).width(1200).height(630).url()
    : undefined;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName,
      type: "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const theme = getTheme(settings?.colorScheme);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings?.siteName ?? "Chefs Base LLP",
    url: baseUrl,
    ...(settings?.contactEmail ? { email: settings.contactEmail } : {}),
    ...(settings?.contactPhone ? { telephone: settings.contactPhone } : {}),
    ...(settings?.address ? { address: settings.address } : {}),
  };

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
      style={theme as CSSProperties}
    >
      <body className="min-h-full flex flex-col bg-surface text-on-light font-sans">
        <JsonLd data={organizationJsonLd} />
        <Navbar settings={settings} />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer settings={settings} />
        <FloatingWhatsApp settings={settings} />
      </body>
    </html>
  );
}
