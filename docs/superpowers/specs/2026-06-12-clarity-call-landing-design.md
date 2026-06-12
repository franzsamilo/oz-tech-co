# Clarity Call landing page — design

**Date:** 2026-06-12
**Status:** Approved (proceed-to-build)
**Route:** `/clarity`

## Goal

A dedicated, distraction-free landing page whose only job is to convert a visitor into a booked Clarity Call. The page presents the existing Civy/GHL booking widget as the centerpiece of a "16:9 poster" composition — bold, framed, theatrical — so the booking experience feels like an intentional brand moment instead of a generic embed.

## Why a separate page?

The Clarity Call widget currently lives as a tab inside `ClientApplicationSection.tsx` on `/`, three-quarters of the way down a 17-section scroll. That makes it impossible to share a clean, focused URL when:

- Pitching the call from a 1:1 DM or email
- Linking from podcast/show notes or ad creative
- Using as a destination for retargeting traffic

A dedicated, hand-off-ready URL (`/clarity`) gives Franz and the team a single link they can paste anywhere that lands the visitor directly on the booking widget with zero scroll, zero nav, zero competing CTAs.

## Architecture

Single Next.js App Router route. Two files:

- `app/clarity/page.tsx` — server component. Owns `metadata` (title, description, OG) and JSON-LD `Service` schema. Renders `<ClarityPage />`.
- `app/clarity/ClarityPage.tsx` — client component. Owns the visual composition, entrance motion, and the booking iframe + `next/script` embed.

One small edit to existing file:

- `components/SiteChrome.tsx` — extend the existing `/studio` chrome-suppression branch to also suppress on `/clarity`. The `GoldenThread` nav rail and `BlogFloatingCTA` are conversion-distractions on this page.

No new shared components, no new data files, no copy moved into `/data`. The page is small enough that inlining copy in the component is the right call — the content is unlikely to be reused elsewhere.

## The "16:9 poster" composition

**Desktop (≥ lg, ~1024px+)**

The viewport is filled with the `--oz-dark-green` field. Centered inside it is a single 16:9 framed canvas that fits within the viewport (sized via `min(90vw, calc(90vh * 16 / 9))` so it letterboxes gracefully at any window dimension). The canvas has a hairline mint inner frame (`rgba(93, 243, 194, 0.25)`) and a subtle radial mint glow behind it.

The canvas is split horizontally into two panes:

- **Left rail (~42%)** — pure typography. From top to bottom: mono kicker, italic display headline, body lead paragraph, three trust bullets stacked, signature line.
- **Right pane (~58%)** — the booking widget, sitting inside a white card with a hairline mint border and soft shadow. The card has its own 16:9-ish aspect ratio inside the larger canvas.

No scroll. The poster IS the page.

**Tablet (md, 640px – 1023px)**

Drop the 16:9 framing. The canvas becomes a single column: typography stacked on top, booking widget below, both inside a max-width container. Some vertical scroll is acceptable here.

**Mobile (< md)**

Compressed hero (just kicker + shortened title + one-line lead), then the booking widget at min(900px, 85vh) height. The trust bullets and signature collapse into a single small footer line below the widget. Vertical scroll is fine; the calendar must be reachable in one thumb-flick.

## Type & color

All tokens already exist in `app/globals.css` and `app/layout.tsx`.

| Role | Token | Style |
|---|---|---|
| Kicker | `--font-geist-mono` | 10–12px, uppercase, `letter-spacing: 0.35em`, color `--oz-button` (yellow) |
| Headline | `--font-syne` | clamp(2.5rem, 6vw, 5.5rem), italic, 800, white, tight leading (`1.02`) |
| Lead body | `--font-dm-sans` | 16–18px, `rgba(255,255,255,0.75)`, 500 weight |
| Trust bullets | `--font-geist-mono` | 10–11px, uppercase, `letter-spacing: 0.25em`, color `--oz-mint` |
| Signature | `--font-dm-sans` italic | 14px, `rgba(255,255,255,0.6)` |

Background: `--oz-dark-green`. Glow: `radial-gradient(ellipse at 70% 50%, rgba(93,243,194,0.12), transparent 60%)`. Grain: lighter version of `.grainy-bg` to avoid overwhelming the calendar.

## Copy (working draft)

- **Kicker:** `CLARITY CALL · 30 MIN · FREE`
- **Headline (italic):** *Bring your idea. Leave with a build plan.*
- **Lead:** A no-pressure call with the OZ Tech founders. We listen to where you're stuck, sketch the path forward, and tell you straight whether we're the right team to ship it.
- **Trust bullets (mono caps):**
  - `NO SALES PITCH`
  - `FOUNDER-LED`
  - `WALK AWAY WITH CLARITY — EVEN IF WE DON'T WORK TOGETHER`
- **Signature:** *— Franz & the OZ Tech team*

Easy to tune later; copy is inline in the component.

## Booking embed

Reuses the existing Civy/GHL booking widget URL from `ClientApplicationSection.tsx:120`:

```
https://connect.civy.ph/widget/booking/6wcV7lvcjOxdBntDuIGj
```

And the existing embed script:

```
https://connect.civy.ph/js/form_embed.js
```

Loaded via `next/script` with `strategy="afterInteractive"`. The iframe lives inside a white rounded card (`rounded-2xl`, hairline mint border, soft shadow) so the widget visually "lands" as the bright stage in the dark poster.

## Motion

No 5.2-second entrance gate. This page is a destination for high-intent visitors arriving from a shared link — the existing client-page intro overlay would add 5s of friction before they can book.

Instead:
- Left rail uses the existing `.oz-hero-entrance` stagger (kicker → headline → lead → bullets → signature) on mount.
- Right pane (calendar card) fades up with a ~400ms delay so the widget loads while the typography is still settling.
- `prefers-reduced-motion` honored via existing CSS (already handled in `.oz-hero-entrance` reduced-motion block).

## Chrome suppression

`SiteChrome.tsx` currently early-returns plain children on `/studio`. Extend the check:

```ts
const suppressChrome = pathname?.startsWith("/studio") || pathname?.startsWith("/clarity");
if (suppressChrome) return <>{children}</>;
```

This removes `GoldenThread` (top nav) and `BlogFloatingCTA` (floating blog CTA) from `/clarity`. The page becomes a clean conversion surface with no escape hatches — CCD principle from `CLAUDE.md`.

## Metadata & SEO

- `title`: "Book a Clarity Call — OZ Tech"
- `description`: "30 minutes with the OZ Tech founders. Bring your idea, leave with a build plan. No sales pitch."
- OG image: reuse `/ozlogo.png` (existing default)
- JSON-LD: a `Service` schema describing the Clarity Call (free, 30 min, virtual)
- Add `/clarity` to `app/sitemap.ts` so it gets indexed and discoverable

## Out of scope (deliberately YAGNI)

- A/B testing the headline
- Tracking pixels beyond what the existing layout/scripts already inject
- Custom calendar UI (reusing the embed is the whole point)
- Multiple "themes" of the poster
- Animations beyond the simple stagger fade-up
- A "back to main site" CTA inside the poster — adding it would re-introduce the distraction we just removed

## Acceptance checks

- `npm run build` passes (TypeScript + Next.js)
- `npm run lint` clean
- Page loads at `localhost:3000/clarity` with no nav rail, no floating CTA
- Desktop: poster sits centered with letterbox margins, iframe scrolls vertically inside the card if needed
- Mobile: kicker + headline + lead visible above the fold, iframe fully tappable
- `prefers-reduced-motion`: typography appears immediately, no animation
