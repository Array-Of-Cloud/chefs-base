import { Resend } from "resend";

const PLACEHOLDER_KEY = "placeholder_add_later";

interface ContactEmailInput {
  name: string;
  company: string;
  email: string;
  phone?: string;
  country: string;
  productInterest?: string;
  quantity?: string;
  message?: string;
}

function isResendConfigured() {
  const key = process.env.RESEND_API_KEY;
  return Boolean(key) && key !== PLACEHOLDER_KEY;
}

function logSubmission(input: ContactEmailInput) {
  console.log("--- RFQ submission (Resend not configured — logging only) ---");
  console.log(JSON.stringify(input, null, 2));
  console.log("---------------------------------------------------------------");
}

/**
 * Always resolves successfully so the contact form can be exercised end-to-end
 * before a real Resend key exists — falls back to a console log if the key is
 * missing/placeholder, or if the actual send fails for any reason.
 */
export async function sendContactEmail(input: ContactEmailInput) {
  if (!isResendConfigured()) {
    logSubmission(input);
    return { delivered: false };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const contactEmail = process.env.CONTACT_EMAIL;

    await resend.emails.send({
      from: "Chefs Base Website <onboarding@resend.dev>",
      to: contactEmail ? [contactEmail] : [],
      replyTo: input.email,
      subject: `New RFQ from ${input.company}`,
      text: [
        `Name: ${input.name}`,
        `Company / Restaurant: ${input.company}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone || "—"}`,
        `Country: ${input.country}`,
        `Product interest: ${input.productInterest || "—"}`,
        `Estimated monthly quantity: ${input.quantity || "—"}`,
        "",
        "Message:",
        input.message || "—",
      ].join("\n"),
    });

    return { delivered: true };
  } catch (error) {
    console.error("Resend send failed, falling back to console log:", error);
    logSubmission(input);
    return { delivered: false };
  }
}
