import { NextRequest, NextResponse } from "next/server";

/**
 * Visiting this URL once (with the correct secret) sets a cookie that does
 * two things: lets this browser see the real site while it's gated behind
 * "Coming Soon", and authorizes the launch button on that page to actually
 * work — the same link serves both "let the client preview early" and
 * "authorize this device for the ceremony click".
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.LAUNCH_PREVIEW_SECRET;

  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ error: "Invalid or missing secret." }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("launch_preview", secret, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });
  return response;
}
