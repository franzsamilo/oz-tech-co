/**
 * Seeds the first Field Notes post into Sanity.
 *
 * Uploads every image referenced by `data/blogSampleContent.ts` from /public to
 * Sanity assets, then re-publishes the sample post as a real Sanity document
 * using the enhanced image schema (alt + caption + ratio + frame).
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/seed-sanity-posts.ts
 *
 * Create a token with Editor permissions at https://sanity.io/manage.
 * Re-running is safe — documents and assets are upserted by stable IDs.
 */
import { createReadStream, existsSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";
import { samplePosts } from "../data/blogSampleContent";
import type { PortableTextBlock } from "@portabletext/types";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-04-05",
  token,
  useCdn: false,
});

const publicDir = resolve(process.cwd(), "public");

type UrlImageValue = {
  _type: "urlImage";
  _key?: string;
  url: string;
  alt?: string;
  caption?: string;
  ratio?: "wide" | "tall" | "square" | "auto";
  frame?: "photo" | "screenshot";
};

function isUrlImage(block: PortableTextBlock): block is PortableTextBlock & UrlImageValue {
  return (block as { _type?: string })._type === "urlImage";
}

const uploadedAssetIds = new Map<string, string>();

async function uploadLocalAsset(publicUrl: string): Promise<string> {
  const cached = uploadedAssetIds.get(publicUrl);
  if (cached) return cached;

  if (!publicUrl.startsWith("/")) {
    throw new Error(
      `Cannot seed remote URL into Sanity assets: ${publicUrl}. Use a local /public path.`
    );
  }

  const absPath = join(publicDir, publicUrl.replace(/^\/+/, ""));
  if (!existsSync(absPath)) {
    throw new Error(`Asset not found on disk: ${absPath}`);
  }

  const filename = basename(absPath);
  const stream = createReadStream(absPath);
  const asset = await client.assets.upload("image", stream, {
    filename,
    label: filename,
  });

  uploadedAssetIds.set(publicUrl, asset._id);
  console.log(`  ↑ uploaded ${publicUrl}`);
  return asset._id;
}

async function transformBody(body: PortableTextBlock[]): Promise<PortableTextBlock[]> {
  const out: PortableTextBlock[] = [];
  for (const block of body) {
    if (isUrlImage(block)) {
      const assetId = await uploadLocalAsset(block.url);
      out.push({
        _type: "image",
        _key: block._key,
        asset: { _type: "reference", _ref: assetId },
        alt: block.alt,
        caption: block.caption,
        ratio: block.ratio ?? "wide",
        frame: block.frame ?? "photo",
      } as unknown as PortableTextBlock);
      continue;
    }
    out.push(block);
  }
  return out;
}

async function seedPost(post: (typeof samplePosts)[number]) {
  console.log(`\nSeeding post: ${post.title}`);

  const authorId = `author-${post.author?.slug ?? "unknown"}`;
  // Verify the author exists so the reference resolves in Studio.
  const author = await client.getDocument(authorId);
  if (!author) {
    console.warn(
      `  ! author "${authorId}" not found — run seed-sanity-authors.ts first.`
    );
  }

  let coverAssetId: string | undefined;
  if (post.coverImageUrl) {
    coverAssetId = await uploadLocalAsset(post.coverImageUrl);
  }

  const body = await transformBody(post.body);

  const doc = {
    _id: `post-${post.slug}`,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    featured: post.featured ?? false,
    tags: post.tags ?? [],
    author: { _type: "reference", _ref: authorId },
    coverImage: coverAssetId
      ? {
          _type: "image",
          asset: { _type: "reference", _ref: coverAssetId },
        }
      : undefined,
    body,
  };

  await client.createOrReplace(doc);
  console.log(`  ✓ saved post-${post.slug}`);
}

async function main() {
  for (const post of samplePosts) {
    await seedPost(post);
  }
  console.log("\nDone. Open /studio to edit the post.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
