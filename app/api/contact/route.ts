import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/resend";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  productInterest?: string | string[];
  quantity?: string;
  message?: string;
  website?: string; // honeypot — real users never fill this
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots tend to fill every field they find, including this one,
  // which is hidden from real users via CSS. Pretend success and bail.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const { name, company, email, phone, country, productInterest, quantity, message } = body;

  if (!name || !company || !email || !country) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  await sendContactEmail({
    name,
    company,
    email,
    phone,
    country,
    productInterest: Array.isArray(productInterest)
      ? productInterest.join(", ")
      : productInterest,
    quantity,
    message,
  });

  return NextResponse.json({ success: true });
}
