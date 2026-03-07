import { NextResponse } from "next/server";

const MAX_TEXT = 200;

const cleanText = (value?: string | null) =>
  value?.replace(/\s+/g, " ").trim().slice(0, MAX_TEXT) || "";

const parseMetaTags = (html: string) => {
  const tags = html.match(/<meta\s+[^>]*>/gi) || [];
  const metas: Record<string, string> = {};

  tags.forEach((tag) => {
    const attrs: Record<string, string> = {};
    const attrRegex = /([a-zA-Z_:.-]+)\s*=\s*["']([^"']+)["']/g;
    let match: RegExpExecArray | null;
    while ((match = attrRegex.exec(tag))) {
      attrs[match[1].toLowerCase()] = match[2];
    }
    const key = (attrs.property || attrs.name || "").toLowerCase();
    if (key && attrs.content) {
      metas[key] = attrs.content;
    }
  });

  return metas;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("url");

  if (!target) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": "oz-tech-link-preview/1.0",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Fetch failed" }, { status: 502 });
    }

    const html = await response.text();
    const metas = parseMetaTags(html);
    const title =
      metas["og:title"] ||
      metas["twitter:title"] ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
      "";
    const description = metas["og:description"] || metas["twitter:description"] || "";
    const rawImage =
      metas["og:image:secure_url"] ||
      metas["og:image:url"] ||
      metas["og:image"] ||
      metas["twitter:image"] ||
      "";
    const image = rawImage ? new URL(rawImage, parsed).toString() : "";

    const data = {
      url: parsed.toString(),
      title: cleanText(title),
      description: cleanText(description),
      image,
      domain: parsed.hostname.replace(/^www\./, ""),
    };

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Preview error" }, { status: 500 });
  } finally {
    clearTimeout(timeout);
  }
}
