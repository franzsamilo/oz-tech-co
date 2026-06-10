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
- **Seed prints `Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN`** → the vars from Steps 2 & 4 aren't in `.env.local` (the scripts load `.env.local` automatically).
- **Webhook returns 401** → header must be exactly `Authorization: Bearer <secret>` with the same secret as the deploy env.
- **Images 404 on the site** → they're served from `cdn.sanity.io`, already allowed in `next.config.ts`; check the asset uploaded in Studio's media library.
