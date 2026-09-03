// One-off script to seed the Privacy Policy, Terms & Conditions, and Cookie
// Policy legalPage documents with real, accurate content.
// Run with: node --env-file=.env.local scripts/seed-legal-pages.mjs
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

let key = 0;
const nextKey = () => `k${key++}`;
const h2 = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "h2",
  children: [{ _type: "span", _key: nextKey(), text }],
});
const p = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "normal",
  children: [{ _type: "span", _key: nextKey(), text }],
});
const bullet = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "normal",
  listItem: "bullet",
  level: 1,
  children: [{ _type: "span", _key: nextKey(), text }],
});

const LAST_UPDATED = "2026-09-03";
const CONTACT_EMAIL = "info@chefs-base.com";
const ADDRESS = "Door No. 110F, Ottupara, Pulikkal, Malappuram, Kerala 673634, India";

const privacyPolicy = [
  p(
    "Chefs Base LLP (\"Chefs Base\", \"we\", \"us\", or \"our\") is a food-service company based in Kerala, India. This policy explains what personal data we collect through this website, why we collect it, and how it is handled.",
  ),
  h2("What We Collect"),
  p(
    "When you submit an enquiry through our \"Request a Quote\" form, we collect the information you provide, which may include:",
  ),
  bullet("Your name"),
  bullet("Company or restaurant name"),
  bullet("Email address"),
  bullet("Phone number (optional)"),
  bullet("Country"),
  bullet("Product interest and estimated order quantity"),
  bullet("Any message you choose to include"),
  p(
    "We do not use tracking cookies, advertising cookies, or analytics tools that collect personal data about your browsing activity on this site. See our Cookie Policy for details on the cookies we do use.",
  ),
  h2("Why We Collect It"),
  p(
    "We use the information you submit solely to respond to your enquiry, provide pricing and product information, and manage the resulting business relationship. We do not use it for unrelated marketing, and we do not sell or rent your personal data to third parties.",
  ),
  h2("How It's Processed"),
  p(
    "Enquiry submissions are sent by email using Resend, a third-party transactional email service, to our team's inbox. We do not maintain a separate marketing database of enquiry submissions beyond the emails themselves. Resend processes this data on our behalf as a service provider and is bound by its own data protection obligations.",
  ),
  h2("International Transfers"),
  p(
    "Our team and infrastructure are primarily based in India, with some service providers (including our website hosting and email delivery providers) operating servers in other countries, including within the European Union and the United States. By submitting your information, you consent to this processing.",
  ),
  h2("Data Retention"),
  p(
    "We retain enquiry data for as long as reasonably necessary to respond to your enquiry and manage any resulting business relationship, after which it is deleted or anonymized.",
  ),
  h2("Your Rights"),
  p(
    "Depending on your location, you may have the right to access, correct, or request deletion of your personal data, object to our processing of it, or lodge a complaint with your local data protection authority (for example, the Information Commissioner's Office in the UK). To exercise any of these rights, contact us using the details below.",
  ),
  h2("Contact Us"),
  p(`If you have questions about this policy or how your data is handled, contact us at ${CONTACT_EMAIL} or write to us at ${ADDRESS}.`),
  h2("Changes to This Policy"),
  p(
    "We may update this policy from time to time to reflect changes in our practices or for legal reasons. The \"last updated\" date at the top of this page reflects the most recent revision.",
  ),
];

const termsAndConditions = [
  p(
    "These terms and conditions (\"Terms\") govern your use of the Chefs Base LLP website. By accessing or using this site, you agree to these Terms.",
  ),
  h2("Use of This Website"),
  p(
    "This website is provided for informational purposes, to showcase our products and services, and to allow prospective customers to make enquiries. You agree to use this site only for lawful purposes.",
  ),
  h2("Product Information"),
  p(
    "Product descriptions, images, and specifications on this site are provided for illustrative and informational purposes. Actual products, packaging, and specifications may vary and are subject to confirmation at the time of order. Shelf life, storage, and technical details are provided as general guidance and should be confirmed directly with us for any commercial order.",
  ),
  h2("Enquiries Are Not Orders"),
  p(
    "Submitting an enquiry or \"Request a Quote\" form through this website does not constitute a binding order or contract. All orders, pricing, and supply terms are subject to a separate agreement between Chefs Base LLP and the customer.",
  ),
  h2("Intellectual Property"),
  p(
    "All content on this website — including text, images, logos, and branding — is owned by or licensed to Chefs Base LLP and may not be reproduced, distributed, or used without our prior written permission.",
  ),
  h2("Limitation of Liability"),
  p(
    "This website is provided \"as is\" without warranties of any kind, express or implied. To the fullest extent permitted by law, Chefs Base LLP is not liable for any indirect, incidental, or consequential loss arising from your use of this website.",
  ),
  h2("Governing Law"),
  p(
    "These Terms are governed by the laws of India, and any disputes arising from them are subject to the exclusive jurisdiction of the courts of Kerala, India.",
  ),
  h2("Changes to These Terms"),
  p(
    "We may update these Terms from time to time. Continued use of this website after any changes constitutes acceptance of the revised Terms.",
  ),
  h2("Contact Us"),
  p(`Questions about these Terms can be sent to ${CONTACT_EMAIL} or ${ADDRESS}.`),
];

const cookiePolicy = [
  p(
    "This policy explains what cookies are, which ones this website uses, and why.",
  ),
  h2("What Are Cookies"),
  p(
    "Cookies are small text files stored on your device by your browser. They can be used for things like remembering your preferences, keeping you signed in, or tracking your activity across websites.",
  ),
  h2("Cookies We Use"),
  p(
    "This website currently uses exactly one cookie, which is strictly necessary for a specific feature to function and is not used for tracking, advertising, or analytics:",
  ),
  bullet(
    "launch_preview — a temporary access cookie used only during our pre-launch phase, to allow authorized team members to preview the site and use the launch feature before the public release. It does not track your activity and is not shared with any third party.",
  ),
  h2("What We Don't Use"),
  p(
    "We do not currently use analytics cookies, advertising cookies, or any third-party tracking scripts on this website. If this changes in the future — for example, if we add privacy-friendly analytics to understand site traffic — we will update this policy to reflect it.",
  ),
  h2("Managing Cookies"),
  p(
    "Since the only cookie on this site is strictly necessary and not used for tracking, there's nothing to opt out of. You can still view, manage, or delete cookies at any time through your browser's settings if you'd like.",
  ),
  h2("Contact Us"),
  p(`Questions about this policy can be sent to ${CONTACT_EMAIL}.`),
];

async function main() {
  const pages = [
    { id: "legal-privacy-policy", slugValue: "privacy-policy", title: "Privacy Policy", body: privacyPolicy },
    { id: "legal-terms-and-conditions", slugValue: "terms-and-conditions", title: "Terms & Conditions", body: termsAndConditions },
    { id: "legal-cookie-policy", slugValue: "cookie-policy", title: "Cookie Policy", body: cookiePolicy },
  ];

  for (const page of pages) {
    await client.createOrReplace({
      _id: page.id,
      _type: "legalPage",
      title: page.title,
      slug: { _type: "slug", current: page.slugValue },
      lastUpdated: LAST_UPDATED,
      body: page.body,
    });
    console.log(`  Created: ${page.title}`);
  }

  console.log("\nLegal pages seeded.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
