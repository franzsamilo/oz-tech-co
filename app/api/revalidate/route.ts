import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Revalidation not configured" }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: SanityWebhookBody = {};
  try {
    body = (await request.json()) as SanityWebhookBody;
  } catch {
    /* empty body is fine — revalidate all blog paths */
  }

  revalidatePath("/blog");

  const slug = body.slug?.current;
  const paths = ["/blog"];

  if (slug) {
    if (body._type === "author") {
      revalidatePath(`/blog/author/${slug}`);
      paths.push(`/blog/author/${slug}`);
    } else {
      revalidatePath(`/blog/${slug}`);
      paths.push(`/blog/${slug}`);
    }
  }

  return NextResponse.json({ revalidated: true, paths });
}
