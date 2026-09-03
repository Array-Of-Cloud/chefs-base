import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Cookie Policy | Chefs Base LLP",
  description: "How Chefs Base LLP uses cookies on this website.",
};

export default function CookiePolicyPage() {
  return <LegalPageContent slug="cookie-policy" />;
}
