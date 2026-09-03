import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | Chefs Base LLP",
  description: "The terms and conditions governing use of the Chefs Base LLP website.",
};

export default function TermsPage() {
  return <LegalPageContent slug="terms-and-conditions" />;
}
