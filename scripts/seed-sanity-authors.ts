/**
 * Seeds author documents in Sanity from data/teamMembers.ts, uploading each
 * member's photo from /public so authors arrive complete — no manual Studio
 * uploads needed.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/seed-sanity-authors.ts
 *
 * Create a token at https://sanity.io/manage with Editor permissions.
 * Re-running is safe — documents are upserted by stable IDs and Sanity
 * dedupes identical asset uploads by content hash.
 */
import { createReadStream, existsSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "next-sanity";
import { teamMembers } from "../data/teamMembers";

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

async function uploadPhoto(publicUrl: string): Promise<string | null> {
  if (!publicUrl.startsWith("/")) {
    console.warn(`  ! skipping non-local photo: ${publicUrl}`);
    return null;
  }
  const absPath = join(publicDir, publicUrl.replace(/^\/+/, ""));
  if (!existsSync(absPath)) {
    throw new Error(`Photo not found on disk: ${absPath}`);
  }
  const asset = await client.assets.upload("image", createReadStream(absPath), {
    filename: basename(absPath),
  });
  console.log(`  ↑ uploaded ${publicUrl}`);
  return asset._id;
}

async function seed() {
  for (const member of teamMembers) {
    console.log(`\nSeeding author: ${member.name}`);
    const photoAssetId = await uploadPhoto(member.image);

    const doc = {
      _id: `author-${member.slug}`,
      _type: "author",
      name: member.name,
      slug: { _type: "slug", current: member.slug },
      role: member.title,
      bio: member.bio,
      motto: member.motto,
      ...(photoAssetId
        ? {
            photo: {
              _type: "image",
              asset: { _type: "reference", _ref: photoAssetId },
            },
          }
        : {}),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ saved author-${member.slug}`);
  }

  console.log("\nDone. Next: npm run seed:sanity-posts (or run as part of npm run seed:sanity).");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
