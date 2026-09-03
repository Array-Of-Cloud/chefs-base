import { NextRequest, NextResponse } from "next/server";

const BYPASS_COOKIE = "launch_preview";

// Lightweight, dependency-free fetch — middleware runs on every matched
// request, so this avoids pulling in the full Sanity client just to read
// one boolean. CDN-backed with a short cache: fast for the general public,
// while the bypass cookie below always guarantees the ceremony device sees
// the real site regardless of any propagation lag here.
async function isSiteLive(): Promise<boolean> {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const query = encodeURIComponent('*[_type=="siteSettings"][0]{siteIsLive}');
    const res = await fetch(
      `https://${projectId}.apicdn.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`,
      { next: { revalidate: 10 } },
    );
    if (!res.ok) return true; // fail open — never let a fetch hiccup gate the live site
    const data = await res.json();
    // Defaults to live if the field is ever missing, same reasoning.
    return data?.result?.siteIsLive !== false;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const bypass = request.cookies.get(BYPASS_COOKIE)?.value;
  if (bypass && process.env.LAUNCH_PREVIEW_SECRET && bypass === process.env.LAUNCH_PREVIEW_SECRET) {
    return NextResponse.next();
  }

  const live = await isSiteLive();
  if (!live) {
    const url = request.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!studio|api|coming-soon|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
