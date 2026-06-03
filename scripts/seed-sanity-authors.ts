/**
 * Seeds author documents in Sanity from data/teamMembers.ts
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=xxx npx tsx scripts/seed-sanity-authors.ts
 *
 * Create a token at https://sanity.io/manage with Editor permissions.
 */
import { createClient } from "next-sanity";
import { teamMembers } from "../data/teamMembers";

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

async function seed() {
  for (const member of teamMembers) {
    const doc = {
      _id: `author-${member.slug}`,
      _type: "author",
      name: member.name,
      slug: { _type: "slug", current: member.slug },
      role: member.title,
      bio: member.bio,
      motto: member.motto,
    };

    await client.createOrReplace(doc);
    console.log(`✓ ${member.name}`);
  }

  console.log("\nDone. Upload photos in Studio (/studio) for each author.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
