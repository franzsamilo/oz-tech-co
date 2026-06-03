# SEO & AI Scrapeability Fix

**Date:** 2026-04-05
**Constraint:** Zero visual changes — not a single pixel of design moves.
**Domain:** https://www.unwiz.ai/

## Problem

All three pages (`/`, `/invest`, `/team`) are `"use client"` top-level components. Non-JS crawlers and AI scrapers see an empty page. No per-page metadata, no Open Graph tags, no sitemap, no robots.txt, no structured data.

## Solution: Server Component Wrappers + Metadata Layer

### 1. Page Restructuring

Each page gets split into a server component (page.tsx) and a client component (renamed current code). The server component exports metadata and renders the client component with zero changes to internals.

| Current File | Renamed To | New Server page.tsx |
|---|---|---|
| `app/page.tsx` | `app/ClientHomePage.tsx` | Imports & renders `<ClientHomePage />`, exports metadata |
| `app/invest/page.tsx` | `app/invest/InvestClient.tsx` | Imports & renders `<InvestClient />`, exports metadata |
| `app/team/page.tsx` | `app/team/TeamClient.tsx` | Imports & renders `<TeamClient />`, exports metadata |

Rules:
- Client files keep `"use client"` directive and ALL existing code untouched
- Only change: `export default function` name to match new filename (cosmetic)
- Server page.tsx files are thin: metadata export + single component render

### 2. Per-Page Metadata

**Root layout (`app/layout.tsx`)** — enhanced with:
- `metadataBase: new URL("https://www.unwiz.ai")`
- Default Open Graph: `type: "website"`, `siteName: "OZ Tech"`, `locale: "en_US"`
- Default Twitter card: `card: "summary_large_image"`
- Keep existing title/description as defaults

**Home page (`app/page.tsx`)**:
```ts
export const metadata: Metadata = {
  title: "OZ Tech — Custom Software & AI Engineering",
  description: "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership. Your first project live in 4 weeks — guaranteed.",
  openGraph: {
    title: "OZ Tech — Custom Software & AI Engineering",
    description: "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership.",
    url: "https://www.unwiz.ai",
  },
};
```

**Invest page (`app/invest/page.tsx`)**:
```ts
export const metadata: Metadata = {
  title: "Invest in OZ Tech — Software Ownership for Every Business",
  description: "We're raising $100,000 to scale from 5 clients to 50. Join 4-10 investors who believe businesses should own their tools, not rent them.",
  openGraph: {
    title: "Invest in OZ Tech — Software Ownership for Every Business",
    description: "We're raising $100,000 to scale from 5 clients to 50.",
    url: "https://www.unwiz.ai/invest",
  },
};
```

**Team page (`app/team/page.tsx`)**:
```ts
export const metadata: Metadata = {
  title: "Meet the Team — OZ Tech",
  description: "The engineering team behind OZ Tech. 5 specialists in full-stack development, systems architecture, AI integration, and high-conversion design.",
  openGraph: {
    title: "Meet the Team — OZ Tech",
    description: "The engineering team behind OZ Tech.",
    url: "https://www.unwiz.ai/team",
  },
};
```

### 3. robots.txt

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://www.unwiz.ai/sitemap.xml
```

### 4. Sitemap

Create `app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.unwiz.ai", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://www.unwiz.ai/invest", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.unwiz.ai/team", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
```

### 5. JSON-LD Structured Data

Add to root layout (`app/layout.tsx`) as a `<script type="application/ld+json">` in `<head>`:

**Organization schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OZ Tech",
  "url": "https://www.unwiz.ai",
  "logo": "https://www.unwiz.ai/ozlogo.png",
  "description": "Custom software and AI engineering. Unlimited projects, one flat fee, full code ownership.",
  "foundingDate": "2024",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 }
}
```

**WebSite schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "OZ Tech",
  "url": "https://www.unwiz.ai"
}
```

### 6. Root Layout Metadata Enhancement

Update `app/layout.tsx` metadata:
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://www.unwiz.ai"),
  title: {
    default: "OZ Tech",
    template: "%s | OZ Tech",
  },
  description: "Navigating the maze of digital innovation - Where technology meets creativity",
  icons: {
    icon: [{ url: "/ozlogo.png", type: "image/png" }],
    apple: "/ozlogo.png",
  },
  openGraph: {
    type: "website",
    siteName: "OZ Tech",
    locale: "en_US",
    images: [{ url: "/ozlogo.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

Note: Using `title.template` means page-specific titles like "Meet the Team" don't need to append "| OZ Tech" manually — but since we're setting full titles per-page with branding already included, we use `title` directly in child pages (which overrides the template).

Actually, to keep it clean: child pages will set `title` as a plain string which fully overrides the layout default. No template needed for 3 pages.

## Files Changed

| File | Action |
|---|---|
| `app/page.tsx` | Rename to `app/ClientHomePage.tsx` |
| `app/page.tsx` | New server component (metadata + import ClientHomePage) |
| `app/invest/page.tsx` | Rename to `app/invest/InvestClient.tsx` |
| `app/invest/page.tsx` | New server component (metadata + import InvestClient) |
| `app/team/page.tsx` | Rename to `app/team/TeamClient.tsx` |
| `app/team/page.tsx` | New server component (metadata + import TeamClient) |
| `app/layout.tsx` | Enhanced metadata + JSON-LD script |
| `public/robots.txt` | New file |
| `app/sitemap.ts` | New file |

## Files NOT Changed

- All section components in `components/sections/`
- All data files in `data/`
- `globals.css`
- `next.config.ts`
- Any component internals, animations, or styling

## Verification

1. `npm run build` must pass
2. `npm run dev` → all three pages render identically to current state
3. View page source → metadata visible in `<head>`
4. `/sitemap.xml` returns valid XML
5. `/robots.txt` returns valid directives
