import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlForImage } from "@/sanity/lib/image";
import { ComingSoonScreen } from "@/components/launch/ComingSoonScreen";
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

export const metadata: Metadata = {
  title: "Chefs Base LLP — Launching Soon",
  description: "Something exciting is coming from Chefs Base LLP.",
  robots: { index: false, follow: false },
};

export default async function ComingSoonPage() {
  const settings = await getSiteSettings();

  // Reachable directly by URL, not just via the middleware rewrite — once
  // the real launch has happened, send stragglers straight to the real site
  // instead of leaving this page live as a stale artifact.
  if (settings?.siteIsLive !== false && !process.env.LOCAL_LAUNCH_PREVIEW) {
    redirect("/");
  }

  const cookieStore = await cookies();
  const bypass = cookieStore.get("launch_preview")?.value;
  const canLaunch = Boolean(bypass) && Boolean(process.env.LAUNCH_PREVIEW_SECRET) && bypass === process.env.LAUNCH_PREVIEW_SECRET;

  const logoUrl = settings?.logoFullLight
    ? urlForImage(settings.logoFullLight).width(440).url()
    : undefined;

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <ComingSoonScreen canLaunch={canLaunch} logoUrl={logoUrl} />
      </body>
    </html>
  );
}
