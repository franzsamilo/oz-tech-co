# Blog CMS Completion — Design Spec

**Date:** 2026-06-10
**Branch:** `feat--tested-UI`
**Goal:** Finish the end-to-end Field Notes blog CMS so the only remaining user effort is creating the Sanity project and pasting API keys.

## Context

The Field Notes blog shipped in commit `ec3c0c0` with a Sanity-backed architecture and a
design-rich first post ("Basic design isn't a taste problem. It's a writing problem.")
rendered from bundled sample content (`data/blogSampleContent.ts`). Uncommitted work on
`feat--tested-UI` extends the image schema (caption/ratio/frame) and unifies the
Portable Text renderer so Studio-authored posts get the identical editorial treatment.

No Sanity project has been created yet — `.env.local` has no Sanity keys, so the site
runs entirely on the sample-content fallback. The user wants the system finished so a
post like post #1 (framed screenshots, captions, code blocks, pull quotes, inline
marks, links) can be authored entirely through the CMS, with API keys as the final and
only manual step. Draft preview is explicitly out of scope (phase 2).

## What already exists (kept as-is)

- **Data layer auto-switch** — `lib/blog/data.ts` uses Sanity when
  `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, sample content otherwise. No fallback removal.
- **Blog UI** — index, post page, author pages, all components. Already renders post #1.
- **Embedded Studio** — `app/studio/[[...tool]]/page.tsx` + `sanity.config.ts` at `/studio`.
- **Schemas** — `post` (rich body) and `author`.
- **Revalidate webhook** — `app/api/revalidate/route.ts` (Bearer-secret protected).
- **Infra** — `cdn.sanity.io` in `next.config.ts` remotePatterns; `.env.example` documents keys.
- **Post seed** — `scripts/seed-sanity-posts.ts` uploads all 8 `/public/blog1` images and
  recreates post #1 as a Sanity document with stable IDs (idempotent; Sanity dedupes
  asset uploads by content hash).

## Changes

### 1. Finish and commit in-progress work

- `sanity/schemas/post.ts` — image members gain alt/caption/ratio/frame fields + preview (done, uncommitted).
- `lib/sanity/types.ts` — `SanityImageRatio`, `SanityImageFrame`, extended `SanityImageAsset` (done, uncommitted).
- `components/blog/PortableTextBody.tsx` — shared `renderArticleImage` used by both Sanity
  `image` blocks and sample `urlImage` blocks (done, uncommitted).
- `package.json` — `seed:sanity-posts` script entry (done, uncommitted).

### 2. Studio authoring polish

- **`@sanity/code-input`** (new dependency, latest version compatible with sanity v5):
  replace the hand-rolled `{language, code}` object member in `sanity/schemas/post.ts`
  (lines ~139–166) with the plugin's `code` type. Stored shape is unchanged
  (`_type: "code"`, `language`, `code`), so `PortableTextBody` and the seed script need
  no data changes. Register `codeInput()` in `sanity.config.ts` plugins. Language list:
  typescript, javascript, bash, json, html, css, text.
- **Custom desk structure** in `sanity.config.ts`: sidebar shows "Posts" (ordered
  newest-first) and "Authors" instead of the generic document-type list.

### 3. Seeding pipeline

- `scripts/seed-sanity-authors.ts` — add photo upload using the same `uploadLocalAsset`
  pattern as the post seed. Author photos come from `data/teamMembers.ts` image paths
  under `/public`. Authors arrive in Sanity complete; no manual Studio uploads.
- New npm script: `"seed:sanity": "tsx scripts/seed-sanity-authors.ts && tsx scripts/seed-sanity-posts.ts"`.
  Individual scripts remain.
- Seed scripts fail fast with a clear message when env keys are missing (existing
  behavior, kept) and name the missing file when a local asset is absent.

### 4. Go-live runbook

New file `docs/SANITY-GO-LIVE.md` — the single document the user follows at the end:

1. Create free project at sanity.io/manage (dataset `production`).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` (+ dataset/api-version defaults) in `.env.local`
   and in the deploy host's env vars (written Vercel-flavored; site lives at
   https://www.unwiz.ai).
3. Add CORS origins in Sanity dashboard: `http://localhost:3000`, `https://www.unwiz.ai`.
4. Create an Editor API token → `SANITY_API_WRITE_TOKEN` (local only) → `npm run seed:sanity`.
5. Create publish webhook → `POST https://www.unwiz.ai/api/revalidate` with
   `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`; set the same secret in deploy env.
6. Verify: `/studio` loads and shows Posts/Authors; `/blog` shows post #1 from Sanity
   (sample banner disappears); editing + publishing in Studio updates the site.

`.env.example` updated to point at the runbook.

### 5. Cleanup & hygiene

- Add `dev.log` to `.gitignore` (and delete the stray file).
- Commit all work on `feat--tested-UI`.

## Error handling

- Unconfigured Sanity → sample-content fallback with "connect Sanity" banner (existing).
- Seed without env keys → explicit message, exit 1, no partial writes.
- Seed with missing image file → error naming the path before any document writes.
- Webhook without/with wrong secret → 500 "not configured" / 401 (existing).

## Out of scope

- Draft preview / visual editing (phase 2 — `SANITY_API_READ_TOKEN` stays documented but unused).
- Hosted Studio, additional posts, comments, search, RSS.

## Verification (all local, no keys required)

1. `npm run lint` and `npm run build` pass.
2. Dev server: `/blog` and `/blog/basic-design-is-a-writing-problem` render post #1
   pixel-identical from fallback (headings, framed screenshots with captions, css code
   block, pull quote, mixed-mark paragraphs, author byline, related/CTA sections).
3. `/studio` route loads without crashing when unconfigured.
4. `npx tsx scripts/seed-sanity-posts.ts` (no env) → clean "missing env" error.
5. `npx tsx scripts/seed-sanity-authors.ts` (no env) → clean "missing env" error.
6. TypeScript: seed scripts typecheck (`npx tsc --noEmit` via build).

True end-to-end (Studio publish → live site) is verified by the user after adding keys,
following `docs/SANITY-GO-LIVE.md`.
