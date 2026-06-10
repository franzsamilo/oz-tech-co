# Blog CMS Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the end-to-end Field Notes blog CMS so the only remaining user effort is creating the Sanity project and pasting API keys.

**Architecture:** The existing three-layer design stays: embedded Studio (`/studio`) → Sanity Content Lake → `lib/blog/data.ts` auto-switch (Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, bundled sample content otherwise) → `/blog` pages. This plan finishes uncommitted schema/renderer/seed work, polishes Studio authoring (`@sanity/code-input` + custom desk structure), makes seeds upload all images (author photos included), and documents go-live in a runbook.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, sanity v5, next-sanity v12, @sanity/code-input (new), tsx for scripts.

**Spec:** `docs/superpowers/specs/2026-06-10-blog-cms-completion-design.md`

**Important execution notes:**
- **Run in the current working tree on branch `feat--tested-UI` — do NOT create a worktree.** The working tree carries uncommitted changes (schema, types, renderer, seed script) that Task 2 verifies and commits. An isolated worktree would not contain them.
- No test framework is configured in this repo (per CLAUDE.md) and none is to be added. Verification = ESLint + `tsc --noEmit` + `next build` + dev-server HTTP checks + seed-script error-path runs. Each task states exact commands and expected output.
- No Sanity API keys exist locally (`.env.local` has none). Everything in this plan is verifiable without keys; true publish-flow verification happens later when the user follows the runbook.
- Windows environment: npm scripts run under cmd.exe where `&&` chaining works. When running one-off commands, prefer the Bash tool.

---

### Task 1: Hygiene — ignore and remove dev.log

**Files:**
- Modify: `.gitignore`
- Delete: `dev.log` (stray dev-server log at repo root, confirmed disposable in spec)

- [ ] **Step 1: Check current .gitignore for a logs section**

Run: `grep -n "log" .gitignore`
Expected: may or may not match. If `dev.log` already covered by a pattern (e.g. `*.log`), skip Step 2.

- [ ] **Step 2: Add dev.log to .gitignore**

Append to `.gitignore` (with the Edit tool, after the last line, or inside an existing logs section if one exists):

```gitignore
# local dev server log
dev.log
```

- [ ] **Step 3: Delete the stray file**

Run: `rm dev.log`
Expected: no output. `git status` no longer shows `dev.log` as untracked.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore stray dev.log"
```

Expected: 1 file changed. Note: `.claude/settings.local.json` is modified in the tree — never stage it in any task in this plan.

---

### Task 2: Verify and commit the in-progress CMS work

The working tree already contains finished-but-uncommitted work. This task verifies it and commits it untouched. Contents being committed:

- `sanity/schemas/post.ts` — body image members gain `caption`, `ratio` (wide/tall/square/auto radio), `frame` (photo/screenshot radio) fields + an image preview block.
- `lib/sanity/types.ts` — new `SanityImageRatio`, `SanityImageFrame` types; `SanityImageAsset` gains `caption?`, `ratio?`, `frame?`.
- `components/blog/PortableTextBody.tsx` — new shared `renderArticleImage()` used by both the Sanity `image` type and the sample-content `urlImage` type, so CMS-authored images get the identical editorial treatment (aspect-ratio classes, screenshot browser-chrome frame, figcaption).
- `package.json` — adds `"seed:sanity-posts": "tsx scripts/seed-sanity-posts.ts"`.
- `scripts/seed-sanity-posts.ts` (untracked, new) — uploads all 8 `/public/blog1` images to Sanity assets and recreates post #1 as document `post-basic-design-is-a-writing-problem` with stable IDs; idempotent.

**Files:**
- Commit (no edits): `sanity/schemas/post.ts`, `lib/sanity/types.ts`, `components/blog/PortableTextBody.tsx`, `package.json`, `scripts/seed-sanity-posts.ts`

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: exit 0, no errors (warnings acceptable only if pre-existing).

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0, no output. (tsconfig includes `scripts/**` via `**/*.ts`, so the seed script is covered.)

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: exit 0. Route list includes `/blog`, `/blog/[slug]`, `/blog/author/[slug]`, `/studio/[[...tool]]`, `/api/revalidate`. `/blog/basic-design-is-a-writing-problem` appears as a prerendered (SSG) path.

- [ ] **Step 4: Verify seed script error path (no keys present)**

Run: `npx tsx scripts/seed-sanity-posts.ts`
Expected: prints `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.` and exits with code 1. No stack trace.

- [ ] **Step 5: Commit**

```bash
git add sanity/schemas/post.ts lib/sanity/types.ts components/blog/PortableTextBody.tsx package.json scripts/seed-sanity-posts.ts
git commit -m "feat: rich image fields (caption/ratio/frame) in CMS schema + unified article image renderer + post seed script"
```

---

### Task 3: Studio authoring polish — @sanity/code-input + custom desk structure

**Files:**
- Modify: `package.json` (dependency added by npm install)
- Modify: `sanity/schemas/post.ts:139-166` (replace hand-rolled code object with plugin type)
- Modify: `sanity.config.ts` (register plugin + desk structure)

- [ ] **Step 1: Install the plugin**

Run: `npm install @sanity/code-input`
Expected: installs latest version with no peer-dependency errors against `sanity@^5`. If npm reports an unresolvable peer conflict, STOP and report back — do not force-install.

- [ ] **Step 2: Replace the code member in the post schema**

In `sanity/schemas/post.ts`, replace this entire array member (currently lines 139–166):

```ts
        defineArrayMember({
          type: "object",
          name: "code",
          title: "Code block",
          fields: [
            defineField({
              name: "language",
              title: "Language",
              type: "string",
              options: {
                list: [
                  "typescript",
                  "javascript",
                  "bash",
                  "json",
                  "html",
                  "css",
                  "text",
                ],
              },
            }),
            defineField({
              name: "code",
              title: "Code",
              type: "text",
            }),
          ],
        }),
```

with the plugin's `code` type (same stored shape: `_type: "code"`, `language`, `code` — `PortableTextBody` and the seed script need no changes):

```ts
        defineArrayMember({
          type: "code",
          title: "Code block",
          options: {
            language: "typescript",
            languageAlternatives: [
              { title: "TypeScript", value: "typescript" },
              { title: "JavaScript", value: "javascript" },
              { title: "Bash", value: "bash" },
              { title: "JSON", value: "json" },
              { title: "HTML", value: "html" },
              { title: "CSS", value: "css" },
              { title: "Plain text", value: "text" },
            ],
            withFilename: false,
          },
        }),
```

- [ ] **Step 3: Register the plugin and desk structure in sanity.config.ts**

Replace the full contents of `sanity.config.ts` with:

```ts
import { defineConfig } from "sanity";
import { structureTool, type StructureResolver } from "sanity/structure";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion, dataset, projectId } from "./sanity/env";

const structure: StructureResolver = (S) =>
  S.list()
    .title("Field Notes")
    .items([
      S.listItem()
        .title("Posts")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Posts")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem()
        .title("Authors")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Authors")),
    ]);

export default defineConfig({
  name: "oz-tech-field-notes",
  title: "OZ Tech — Field Notes",
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  basePath: "/studio",
  plugins: [structureTool({ structure }), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
```

- [ ] **Step 4: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0. If `StructureResolver` is not exported from `sanity/structure` in the installed version, import it from `sanity/structure` as a type of the resolver param instead: `const structure = (S: import("sanity/structure").StructureBuilder) => ...` — but try the shown import first; it is the documented v5 export.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: exit 0, same route list as Task 2 Step 3.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json sanity/schemas/post.ts sanity.config.ts
git commit -m "feat: syntax-highlighted code editing and Posts/Authors desk structure in Studio"
```

---

### Task 4: Author seed uploads photos + combined seed command

**Files:**
- Modify: `scripts/seed-sanity-authors.ts` (full rewrite below)
- Modify: `package.json` (add `seed:sanity` script)

Author photos come from `data/teamMembers.ts` `image` fields — all local `/public` paths (`/members/Cris.png`, `/members/Jed.png`, `/members/Louie.png`, `/members/Matthew L..png`, `/blog1/franz-author.jpg`). Note `Matthew L..png` contains a space and double dot — `createReadStream` + `basename` handle it; do not special-case it.

- [ ] **Step 1: Rewrite scripts/seed-sanity-authors.ts**

Replace the full contents of `scripts/seed-sanity-authors.ts` with:

```ts
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

  console.log("\nDone. Next: npm run seed:sanity-posts (or it runs as part of npm run seed:sanity).");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Add the combined seed script to package.json**

In `package.json` scripts, after the `"seed:sanity-posts"` line, add:

```json
    "seed:sanity": "npm run seed:sanity-authors && npm run seed:sanity-posts"
```

(Resulting scripts block contains `seed:sanity-authors`, `seed:sanity-posts`, and `seed:sanity`.)

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0.

- [ ] **Step 4: Verify error paths (no keys present)**

Run: `npx tsx scripts/seed-sanity-authors.ts`
Expected: `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.`, exit code 1.

Run: `npm run seed:sanity`
Expected: same message from the authors script, chain stops (posts script does not run), non-zero exit.

- [ ] **Step 5: Commit**

```bash
git add scripts/seed-sanity-authors.ts package.json
git commit -m "feat: author seed uploads photos; add combined seed:sanity command"
```

---

### Task 5: Go-live runbook + .env.example pointer

**Files:**
- Create: `docs/SANITY-GO-LIVE.md`
- Modify: `.env.example` (header comment points at the runbook)

- [ ] **Step 1: Create docs/SANITY-GO-LIVE.md**

Full contents:

```markdown
# Field Notes — Sanity Go-Live Runbook

Everything is built and verified. Follow these steps once (about 10 minutes) and
the blog is live, editable at `/studio`, with post #1 served from Sanity.

The site falls back to bundled sample content until Step 2 is done — nothing
breaks if you stop halfway.

## 1. Create the Sanity project (free)

1. Go to https://www.sanity.io/manage and sign in (GitHub login works).
2. Create a new project — name it e.g. `OZ Tech Field Notes`.
3. When asked for a dataset, create one named `production` (public/default ACL).
4. Copy the **Project ID** shown on the project page (an 8-char string like `ab12cd34`).

## 2. Set environment variables

**Local — `.env.local`** (create lines if missing):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your project id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-05
```

**Production — Vercel** (Project → Settings → Environment Variables, all environments):

| Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | your project id |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-04-05` |
| `SANITY_REVALIDATE_SECRET` | a long random string — generate one with `openssl rand -hex 32` (you'll reuse it in Step 5) |

Redeploy after saving (Vercel → Deployments → Redeploy) so the build picks them up.

> Deploying somewhere other than Vercel? Set the same four variables in that
> host's environment configuration instead.

## 3. Allow the Studio origins (CORS)

Sanity blocks browser requests from unknown origins, so the embedded Studio
needs yours allow-listed:

1. sanity.io/manage → your project → **API** tab → **CORS origins** → Add origin.
2. Add `http://localhost:3000` — check **Allow credentials**.
3. Add `https://www.unwiz.ai` — check **Allow credentials**.

## 4. Seed the content (authors + post #1)

1. sanity.io/manage → your project → **API** tab → **Tokens** → Add token.
   Name it `seed script`, permissions **Editor**. Copy the token (shown once).
2. Add to `.env.local`:

   ```
   SANITY_API_WRITE_TOKEN=<the token>
   ```

3. Run:

   ```
   npm run seed:sanity
   ```

   Expected output: each team member uploads a photo and saves
   (`✓ saved author-...`), then the post seed uploads the 8 `/public/blog1`
   images and prints `✓ saved post-basic-design-is-a-writing-problem`.
   Re-running is safe (stable IDs; identical uploads dedupe).

4. The write token is only needed for seeding. You can delete it from
   `.env.local` (and revoke it in sanity.io/manage) afterwards if you like.

## 5. Instant updates on publish (webhook)

Without this, edits still go live within 60 seconds (ISR). With it, instantly:

1. sanity.io/manage → your project → **API** tab → **Webhooks** → Create webhook.
2. Name: `revalidate unwiz.ai` — URL: `https://www.unwiz.ai/api/revalidate`
3. Dataset: `production`. Trigger on: **Create**, **Update**, **Delete**.
4. Filter: `_type == "post" || _type == "author"`
5. Projection: `{_type, slug}`
6. HTTP method: `POST`. HTTP headers — add header
   `Authorization` = `Bearer <SANITY_REVALIDATE_SECRET from Step 2>`.
7. Save.

## 6. Verify

- [ ] `npm run dev` → open http://localhost:3000/studio → Studio loads, sidebar
      shows **Posts** and **Authors**, post #1 and 5 authors are there.
- [ ] http://localhost:3000/blog → post #1 renders **without** the
      "Sample posts — connect Sanity" banner (content now comes from Sanity).
- [ ] Edit post #1 in Studio (change a word), **Publish** → production
      `https://www.unwiz.ai/blog/basic-design-is-a-writing-problem` shows the
      edit (instantly with the webhook, otherwise within 60s).

## Writing a new post (day-to-day)

1. Open `/studio` → **Posts** → New.
2. Title, slug (Generate), excerpt (≤280 chars), cover image, author, tags,
   publish date. Toggle **Featured** to pin it to the top of `/blog`.
3. Body supports everything post #1 uses:
   - **Styles:** Normal, H2, H3, Quote (pull-quote treatment).
   - **Inline marks:** bold, italic, inline code, links.
   - **Image blocks:** upload, then set Alt text, optional Caption, Aspect
     ratio (Wide 16:9 / Tall 4:5 / Square / Auto) and Frame style — *Photo*
     (soft editorial card) or *Screenshot* (paper card with browser chrome —
     use for app/UI shots).
   - **Code blocks:** syntax-highlighted editor; pick the language.
4. **Publish.** The site updates instantly (webhook) or within 60s.

## Troubleshooting

- **Studio shows a CORS error** → Step 3 origin missing or "Allow credentials" unchecked.
- **Seed prints `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN`** → `.env.local` vars from Steps 2 & 4 not set in the shell environment; `npm run seed:sanity` loads `.env.local` only if your shell does — if needed run e.g. `npx dotenv-cli -e .env.local -- npm run seed:sanity` or set the vars inline.
- **Webhook returns 401** → header must be exactly `Authorization: Bearer <secret>` with the same secret as the deploy env.
- **Images 404 on the site** → they're served from `cdn.sanity.io`, already allowed in `next.config.ts`; check the asset uploaded in Studio's media library.
```

- [ ] **Step 2: Sanity-check the runbook's env-loading caveat**

The seed scripts read `process.env` directly; tsx does not auto-load `.env.local`.
Check whether `next-sanity`/`tsx` invocation needs the dotenv hint to stay in the runbook (it does — keep the Troubleshooting bullet). Then ALSO make the seed scripts self-sufficient so the happy path "set it in .env.local and run npm run seed:sanity" works on Windows without extra tooling: at the top of BOTH `scripts/seed-sanity-authors.ts` and `scripts/seed-sanity-posts.ts`, before reading `process.env`, add:

```ts
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
```

`@next/env` ships with Next.js (already a dependency) and loads `.env.local`
exactly the way Next does. Place these as the FIRST import + statement in each
script (env vars must be loaded before the `const projectId = ...` reads).
With this in place, simplify the runbook Troubleshooting bullet to:

```markdown
- **Seed prints `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN`** → the vars from Steps 2 & 4 aren't in `.env.local` (the scripts load `.env.local` automatically).
```

- [ ] **Step 3: Update .env.example header**

In `.env.example`, replace the first 6 comment lines (the `# Sanity CMS (Field Notes blog)` block) with:

```
# Sanity CMS (Field Notes blog)
# Full go-live steps: docs/SANITY-GO-LIVE.md
```

Keep all variable lines unchanged.

- [ ] **Step 4: Typecheck + error-path re-run**

Run: `npx tsc --noEmit`
Expected: exit 0.

Run: `npx tsx scripts/seed-sanity-posts.ts`
Expected: still the clean `Missing ...` error, exit 1 (no Sanity vars exist in `.env.local`).

- [ ] **Step 5: Commit**

```bash
git add docs/SANITY-GO-LIVE.md .env.example scripts/seed-sanity-authors.ts scripts/seed-sanity-posts.ts
git commit -m "docs: Sanity go-live runbook; seeds load .env.local automatically"
```

---

### Task 6: Final verification sweep

**Files:** none modified — verification only.

- [ ] **Step 1: Lint**

Run: `npm run lint`
Expected: exit 0.

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: exit 0; `/blog/basic-design-is-a-writing-problem` listed as prerendered.

- [ ] **Step 3: Start dev server in background**

Run (Bash tool, run_in_background): `npm run dev`
Wait for `Ready` in output (typically <15s).

- [ ] **Step 4: Verify /blog renders post #1 from fallback**

Run: `curl -s http://localhost:3000/blog`
Expected markers in HTML:
- `Sample posts` (the connect-Sanity banner — proves fallback mode)
- `writing problem` (post #1 title text)
- `/blog/basic-design-is-a-writing-problem` (featured card link)

- [ ] **Step 5: Verify the post page end-to-end rendering**

Run: `curl -s http://localhost:3000/blog/basic-design-is-a-writing-problem`
Expected markers:
- `figcaption` (captioned images render)
- `Mentoria homepage` (first screenshot's caption text)
- `min read` (reading-time byline block)
- `Want this team building for you?` (closing CTA)
- `BlogPosting` (JSON-LD)

- [ ] **Step 6: Verify /studio route does not crash unconfigured**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/studio`
Expected: `200`. (Client-side it shows Sanity's "configure project" state until keys exist — the route must not 500.)

- [ ] **Step 7: Stop the dev server, confirm clean tree**

Stop the background process. Run: `git status`
Expected: only `.claude/settings.local.json` modified (never committed); branch `feat--tested-UI` ahead of origin by the plan's commits.

- [ ] **Step 8: Report**

Summarize: commits created, verification results, and that the user's remaining work is exactly `docs/SANITY-GO-LIVE.md`.

---

## Self-review notes (already applied)

- Spec coverage: §1 in-progress work → Task 2; §2 Studio polish → Task 3; §3 seeding → Task 4; §4 runbook + .env.example → Task 5; §5 cleanup → Task 1; spec Verification section → Tasks 2–6 steps.
- Stored code-block shape (`_type: "code"`, `language`, `code`) is identical before/after the plugin swap — renderer (`components/blog/PortableTextBody.tsx`) and seed script untouched by Task 3.
- `loadEnvConfig` is added to BOTH seed scripts in Task 5 Step 2 and committed in Task 5 Step 5.
- Author doc field names (`name/slug/role/bio/motto/photo`) match `sanity/schemas/author.ts`.
