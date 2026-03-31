# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Local dev server (localhost:3000)
npm run build    # TypeScript + Next.js production build
npm run start    # Production server
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

**Single-app Next.js 16 project** (App Router, React 19, TypeScript 5) — a landing page site for OZ Tech with three audience-specific pages:

- **`/` (client)** — Main landing page with 17+ sections building toward an application CTA. Has a session-based 5.2s entrance animation (tracked via sessionStorage).
- **`/invest`** — Password-protected investor page (localStorage flag). 12+ sections covering investment thesis.
- **`/team`** — Team showcase with GSAP-driven carousel and Framer Motion transitions.

### Key directories

- **`app/`** — Next.js App Router pages and API routes
- **`components/sections/`** — Page sections (each page composes these sequentially)
- **`components/`** — Shared components (forms, animations, 3D elements)
- **`data/`** — Page content/copy as TypeScript objects (`clientPageContent.ts`, `seedPageContent.ts`)
- **`context/`** — Design docs and reference materials (not code)
- **`lib/utils.ts`** — `cn()` utility (clsx + tailwind-merge)

### API Routes

- **`/api/ghl-contact`** — POST: submits form data to GoHighLevel CRM
- **`/api/link-preview`** — GET: scrapes OG metadata from URLs

### Animation Stack

Three animation libraries coexist with distinct roles:
- **GSAP** — Complex timeline animations (PillNav, TargetCursor, team carousel)
- **Framer Motion (`motion`)** — React state-driven transitions (AnimatePresence, page reveals)
- **Three.js / @react-three/fiber** — 3D elements (ProfileCard with face-api.js detection, Card.glb model)

### Styling

Tailwind CSS 4 with custom brand CSS variables defined in `app/globals.css`:
- `--oz-dark-green` (#021f0d), `--oz-mint` (#5df3c2), `--oz-medium-green` (#006c40)
- `--oz-button` (#effc5f), `--oz-accent-red` (#fe5858)
- Custom font: Pragmatica (display & body)
- shadcn/ui configured with "new-york" style and Lucide icons

### Path Alias

`@/*` maps to the project root (e.g., `@/components/...`, `@/lib/utils`).

## Design Principles (CCD)

All pages follow Conversion-Centered Design per `context/CCD-Guide.md`:
- Hero sections must fill full viewport (min-height: 100vh) with manifesto-level copy
- One dominant CTA per section; remove navigation that distracts from conversion
- Sections should feel like distinct "screens" (80-120% viewport height)
- Z-pattern layout for minimal pages, F-pattern for text-heavy sections
- Mobile-first: headline + CTA above the fold, lazy-load below-fold assets
