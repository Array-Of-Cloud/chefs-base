import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

interface RevalidatePayload {
  _type?: string;
  slug?: { current?: string };
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: RevalidatePayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  const { _type, slug } = body;

  switch (_type) {
    case "siteSettings":
      // Affects every page via the root layout (theme, nav, footer).
      revalidatePath("/", "layout");
      break;
    case "product":
      revalidatePath("/products");
      revalidatePath("/");
      if (slug?.current) revalidatePath(`/products/${slug.current}`);
      break;
    case "category":
      revalidatePath("/products");
      break;
    case "post":
      revalidatePath("/blog");
      revalidatePath("/");
      if (slug?.current) revalidatePath(`/blog/${slug.current}`);
      break;
    case "certification":
      revalidatePath("/");
      revalidatePath("/about");
      break;
    default:
      revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, type: _type ?? "unknown" });
}
