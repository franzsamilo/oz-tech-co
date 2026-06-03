# SEO & AI Scrapeability Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the site crawlable by AI scrapers and search engines by adding server-side metadata, structured data, sitemap, and robots.txt — with zero visual changes.

**Architecture:** Split each `"use client"` page into a thin server component wrapper (exports metadata, renders the client component) and the original client component (renamed, code untouched). Add SEO infrastructure files (robots.txt, sitemap.ts, JSON-LD).

**Tech Stack:** Next.js 16 App Router, TypeScript 5, React 19

---

### Task 1: Rename Home Page Client Component

**Files:**
- Rename: `app/page.tsx` → `app/ClientHomePage.tsx`

- [ ] **Step 1: Rename the file**

```bash
cd "C:/Users/Franz Samilo/Desktop/oz-tech-co"
git mv app/page.tsx app/ClientHomePage.tsx
```

- [ ] **Step 2: Update the function name**

In `app/ClientHomePage.tsx`, change the export name from `Home` to `ClientHomePage`. This is the ONLY change — all other code stays identical:

```tsx
// Change this line (line 28):
export default function Home() {
// To:
export default function ClientHomePage() {
```

- [ ] **Step 3: Create new server component `app/page.tsx`**

Create `app/page.tsx` with metadata and a single import/render of the client component:

```tsx
import type { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";

export const metadata: Metadata = {
  title: "OZ Tech — Custom Software & AI Engineering",
  description:
    "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership. Your first project live in 4 weeks — guaranteed.",
  openGraph: {
    title: "OZ Tech — Custom Software & AI Engineering",
    description:
      "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership.",
    url: "https://www.unwiz.ai",
  },
};

export default function HomePage() {
  return <ClientHomePage />;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/ClientHomePage.tsx app/page.tsx
git commit -m "refactor: extract home page client component for SSR metadata"
```

---

### Task 2: Rename Invest Page Client Component

**Files:**
- Rename: `app/invest/page.tsx` → `app/invest/InvestClient.tsx`

- [ ] **Step 1: Rename the file**

```bash
cd "C:/Users/Franz Samilo/Desktop/oz-tech-co"
git mv app/invest/page.tsx app/invest/InvestClient.tsx
```

- [ ] **Step 2: Update the function name**

In `app/invest/InvestClient.tsx`, change the export name from `InvestLandingPage` to `InvestClient`. This is the ONLY change:

```tsx
// Change this line (line 29):
export default function InvestLandingPage() {
// To:
export default function InvestClient() {
```

- [ ] **Step 3: Create new server component `app/invest/page.tsx`**

```tsx
import type { Metadata } from "next";
import InvestClient from "./InvestClient";

export const metadata: Metadata = {
  title: "Invest in OZ Tech — Software Ownership for Every Business",
  description:
    "We're raising $100,000 to scale from 5 clients to 50. Join 4-10 investors who believe businesses should own their tools, not rent them.",
  openGraph: {
    title: "Invest in OZ Tech — Software Ownership for Every Business",
    description:
      "We're raising $100,000 to scale from 5 clients to 50.",
    url: "https://www.unwiz.ai/invest",
  },
};

export default function InvestPage() {
  return <InvestClient />;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/invest/InvestClient.tsx app/invest/page.tsx
git commit -m "refactor: extract invest page client component for SSR metadata"
```

---

### Task 3: Rename Team Page Client Component

**Files:**
- Rename: `app/team/page.tsx` → `app/team/TeamClient.tsx`

- [ ] **Step 1: Rename the file**

```bash
cd "C:/Users/Franz Samilo/Desktop/oz-tech-co"
git mv app/team/page.tsx app/team/TeamClient.tsx
```

- [ ] **Step 2: Update the function name**

In `app/team/TeamClient.tsx`, change the export name from `TeamPage` to `TeamClient`. This is the ONLY change:

```tsx
// Change this line (line 116):
export default function TeamPage() {
// To:
export default function TeamClient() {
```

- [ ] **Step 3: Create new server component `app/team/page.tsx`**

```tsx
import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Meet the Team — OZ Tech",
  description:
    "The engineering team behind OZ Tech. 5 specialists in full-stack development, systems architecture, AI integration, and high-conversion design.",
  openGraph: {
    title: "Meet the Team — OZ Tech",
    description: "The engineering team behind OZ Tech.",
    url: "https://www.unwiz.ai/team",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
```

- [ ] **Step 4: Commit**

```bash
git add app/team/TeamClient.tsx app/team/page.tsx
git commit -m "refactor: extract team page client component for SSR metadata"
```

---

### Task 4: Enhance Root Layout Metadata + JSON-LD

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the metadata export**

In `app/layout.tsx`, replace the existing `metadata` export (lines 24-33) with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.unwiz.ai"),
  title: {
    default: "OZ Tech",
    template: "%s",
  },
  description:
    "Navigating the maze of digital innovation - Where technology meets creativity",
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

Note: `template: "%s"` means child page titles pass through as-is (no suffix appended). The `default: "OZ Tech"` applies only when a child doesn't set its own title.

- [ ] **Step 2: Add JSON-LD structured data to the layout**

In `app/layout.tsx`, add the JSON-LD scripts inside the `<html>` tag, before `<body>`. The full return becomes:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
      logo: "https://www.unwiz.ai/ozlogo.png",
      description:
        "Custom software and AI engineering. Unlimited projects, one flat fee, full code ownership.",
      foundingDate: "2024",
      numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
    },
  ];

  return (
    <html lang="en">
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoldenThread />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add Open Graph, Twitter, robots metadata and JSON-LD structured data"
```

---

### Task 5: Create robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create the file**

Create `public/robots.txt` with:

```
User-agent: *
Allow: /

Sitemap: https://www.unwiz.ai/sitemap.xml
```

- [ ] **Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "feat: add robots.txt with sitemap reference"
```

---

### Task 6: Create Sitemap

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create the sitemap file**

Create `app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.unwiz.ai",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://www.unwiz.ai/invest",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.unwiz.ai/team",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add dynamic sitemap.xml for all routes"
```

---

### Task 7: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run the build**

```bash
cd "C:/Users/Franz Samilo/Desktop/oz-tech-co"
npm run build
```

Expected: Build completes with no errors. All three routes (`/`, `/invest`, `/team`) appear in the build output.

- [ ] **Step 2: Start dev server and verify pages render**

```bash
npm run dev
```

Open each page in the browser and confirm:
- `http://localhost:3000` — home page renders identically (entrance animation, all sections)
- `http://localhost:3000/invest` — password lock appears, content renders after unlock
- `http://localhost:3000/team` — team carousel renders with all animations
- `http://localhost:3000/sitemap.xml` — returns valid XML with 3 URLs
- `http://localhost:3000/robots.txt` — returns the robots directives

- [ ] **Step 3: View page source to confirm metadata**

Right-click → View Page Source on each page. Confirm:
- `<title>` tag matches per-page metadata
- `<meta name="description">` present
- `<meta property="og:title">` present
- `<meta property="og:description">` present
- `<script type="application/ld+json">` blocks present (Organization + WebSite)

- [ ] **Step 4: Final commit if any fixes needed**

If build or verification revealed issues, fix and commit. Otherwise skip this step.
