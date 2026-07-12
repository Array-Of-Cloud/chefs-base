import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Not Found | Chefs Base LLP",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center justify-center gap-6 bg-surface px-6 py-32 text-center font-sans text-on-light">
        <span className="font-serif text-6xl italic text-accent">404</span>
        <h1 className="font-serif text-3xl italic text-on-light">Page Not Found</h1>
        <p className="max-w-md text-on-light/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-on-dark transition-colors hover:bg-primary-hover"
        >
          Back to Home
        </Link>
      </body>
    </html>
  );
}
