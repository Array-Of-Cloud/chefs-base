import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Chefs Base LLP",
  description: "How Chefs Base LLP collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return <LegalPageContent slug="privacy-policy" />;
}
