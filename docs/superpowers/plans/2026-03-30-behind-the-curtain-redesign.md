# "Behind the Curtain" Visual Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul all visual aspects of the OZ Tech landing site (client, invest, team pages) with a Wizard of Oz narrative journey — dark forest → yellow brick road → emerald city → behind the curtain — while preserving all content and section order.

**Architecture:** Foundation-first approach. We build the design system (fonts, CSS variables, utility classes, golden thread component) first, then rewrite globals.css, then update each page's shell and sections in order. Each task produces a visually coherent intermediate state.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, GSAP (existing), Syne + DM Sans (Google Fonts via next/font)

**Spec:** `docs/superpowers/specs/2026-03-30-behind-the-curtain-redesign.md`

---

## File Structure

### New files
- `components/GoldenThread.tsx` — The scroll-linked vertical gold line + horizontal branches + mobile dot indicator
- `components/SectionDivider.tsx` — Gradient transition bands between dark/light sections
- `lib/animations.ts` — Shared Framer Motion variants (rise, reveal, slide, stagger)

### Major rewrites
- `app/globals.css` — Strip removed classes, rewrite entrance overlay, add new card/badge/animation utilities
- `app/layout.tsx` — Add Syne + DM Sans fonts, mount GoldenThread
- `app/page.tsx` — Update shell classes, entrance overlay markup, insert SectionDividers, reduce entrance timer

### Section component updates (style-only changes — no content changes)
All 16 client sections, Footer, and invest/team page sections get class/style updates to match the new card system, badge system, typography, and animation patterns.

---

## Task 1: Typography & Font Setup

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css` (`:root` font variables only)

- [ ] **Step 1: Add Syne and DM Sans to layout.tsx**

Replace the current font imports and add Syne + DM Sans alongside Geist Mono:

```tsx
import { Geist_Mono } from "next/font/google";
import { Syne, DM_Sans } from "next/font/google";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
```

Update the `<body>` className to:
```tsx
className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
```

Remove the `Geist` (sans) import — DM Sans replaces it.

- [ ] **Step 2: Update CSS font variables**

In `app/globals.css`, replace the `:root` font variables:

```css
/* Brand Typography */
--font-brand-display: var(--font-syne), "Segoe UI", Arial, sans-serif;
--font-brand-body: var(--font-dm-sans), "Segoe UI", Arial, sans-serif;
```

Update the `@theme inline` block:
```css
--font-sans: var(--font-brand-body);
--font-mono: var(--font-geist-mono);
--font-display: var(--font-brand-display);
--font-heading: var(--font-brand-display);
```

- [ ] **Step 3: Verify fonts load**

Run: `npm run dev`

Open browser, inspect any heading element — computed font should show Syne. Body text should show DM Sans. Badge/stat text should show Geist Mono.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: add Syne + DM Sans fonts, replace Pragmatica/Geist Sans"
```

---

## Task 2: CSS Foundation — Clean & Rebuild globals.css

**Files:**
- Modify: `app/globals.css`

This is the largest single task. We strip removed classes, rewrite the entrance overlay, and add the new design system utilities. Content is broken into sub-steps.

- [ ] **Step 1: Remove deprecated CSS classes**

Delete the following class blocks entirely from `globals.css`:

- `.hacker-bg` and its `::before`, `::after` pseudo-elements (lines ~1294–1358)
- `@keyframes hackerScan`, `@keyframes hackerGlow`, `@keyframes hackerMatrix` (lines ~1360–1391)
- `.tech-magic-glow` and `@keyframes pulse-glow` (lines ~1122–1143)
- `.orange-glow` and `.orange-glow-text` (lines ~643–654)
- `.cracked-maze` and its `::before` (lines ~1084–1120)
- `.cracked-text` and its `::before`, `::after` (lines ~1053–1082)
- `@keyframes crack` (lines ~1026–1051)
- `.cracked-border` and its `::before` (lines ~1244–1281)
- `.distorted-text` and `@keyframes distort` (lines ~1146–1170)
- `.section-transition-start`, `.section-transition-middle`, `.section-transition-end` (lines ~1212–1241)
- `.font-tech` and `.font-cracked` (lines ~1011–1023)
- `.asymmetric-grid` and its media queries (lines ~1172–1189)
- `.offset-section` and `.offset-section-alt` and their media query (lines ~1192–1209)

- [ ] **Step 2: Remove scroll-snap CSS**

Delete from `globals.css`:

- The `scroll-snap-type: y mandatory;` line from `html` (line ~503)
- The `.snap-y`, `.snap-mandatory`, `.snap-start`, `.snap-always` classes (lines ~506–521)
- The `@media (max-width: 640px)` block that contains scroll-snap overrides (lines ~523–543)
- The `scroll-snap-align` and `scroll-snap-stop` properties from `.section-viewport` (lines ~358–363)

Replace `.section-viewport` with:
```css
.section-viewport {
  min-height: 100svh;
  min-height: 100dvh;
}
```

Keep `scroll-behavior: smooth;` and `-webkit-overflow-scrolling: touch;` on `html`.

- [ ] **Step 3: Strip hero layered pseudo-elements**

Remove the following (they get replaced by a single radial glow in the hero component):

- `.oz-hero-magic` and its `::before`, `::after` (lines ~861–889)
- `.oz-hero-aurora` and its `::after` (lines ~891–902)
- `.oz-hero-bg` and its `::before` (lines ~961–976)
- `.oz-hero-gradient` (lines ~904–909)

- [ ] **Step 4: Rewrite entrance overlay CSS**

Replace the entire entrance overlay system (`.oz-entrance-overlay` through all its variants and keyframes, roughly lines 176–352) with:

```css
/* Entrance Overlay */
.oz-entrance-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--oz-dark-green);
  pointer-events: none;
}

.oz-entrance-overlay--client,
.oz-entrance-overlay--invest {
  z-index: 100;
  animation: ozEntranceFade 4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.oz-entrance-glow {
  position: absolute;
  inset: -20%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(93, 243, 194, 0.4), transparent 70%);
  animation: ozEntranceGlowExpand 3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  pointer-events: none;
}

.oz-entrance-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #f8fff9;
  padding: 24px;
}

.oz-entrance-kicker {
  font-family: var(--font-geist-mono);
  font-size: 10px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--oz-button);
  font-weight: 600;
  opacity: 0;
  animation: ozFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
}

.oz-entrance-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-family: var(--font-brand-display);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0.4rem 0;
  color: white;
  opacity: 0;
  animation: ozFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
  position: relative;
}

.oz-entrance-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 0;
  background: var(--oz-button);
  animation: ozDrawLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1.2s forwards;
}

.oz-entrance-subtitle {
  font-size: clamp(0.9rem, 2.2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  opacity: 0;
  animation: ozFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 1.6s forwards;
}

@keyframes ozEntranceFade {
  0% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; }
}

@keyframes ozEntranceGlowExpand {
  0% { transform: scale(0.3); opacity: 0; }
  20% { opacity: 1; }
  75% { opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 0; }
}

@keyframes ozFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ozDrawLine {
  from { width: 0; }
  to { width: 80px; }
}

@media (prefers-reduced-motion: reduce) {
  .oz-entrance-overlay--client,
  .oz-entrance-overlay--invest {
    animation: none;
    opacity: 0;
    visibility: hidden;
  }

  .oz-entrance-glow,
  .oz-entrance-kicker,
  .oz-entrance-title,
  .oz-entrance-title::after,
  .oz-entrance-subtitle {
    animation: none !important;
    opacity: 1;
  }
}
```

- [ ] **Step 5: Add new design system utility classes**

Append to `globals.css`:

```css
/* ===== DESIGN SYSTEM: "Behind the Curtain" ===== */

/* Section spacing tiers */
.oz-section-primary {
  @apply py-24 md:py-32;
}

.oz-section-secondary {
  @apply py-20 md:py-28;
}

.oz-section-tertiary {
  @apply py-16 md:py-24;
}

/* Consistent container padding */
.oz-container {
  @apply px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto w-full;
}

/* Forest Card (dark sections) */
.oz-forest-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (hover: hover) {
  .oz-forest-card:hover {
    border-color: rgba(93, 243, 194, 0.3);
    transform: translateY(-2px);
  }
}

/* City Card (light sections) */
.oz-city-card {
  background: white;
  border: 1px solid rgba(2, 31, 13, 0.06);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(2, 31, 13, 0.04);
  transition: border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (hover: hover) {
  .oz-city-card:hover {
    border-color: rgba(0, 108, 64, 0.2);
    transform: translateY(-2px);
  }
}

/* Gem Card (highlight moments) */
.oz-gem-card {
  position: relative;
  background: linear-gradient(145deg, #021f0d 0%, #04301b 45%, #006c40 100%);
  border: 1px solid #5df3c2;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  box-shadow:
    inset 0 0 22px rgba(93, 243, 194, 0.18),
    0 20px 60px rgba(2, 31, 13, 0.45);
}

/* Gold left accent border */
.oz-gold-accent {
  border-left: 3px solid var(--oz-button);
}

/* Emerald left accent border */
.oz-emerald-accent {
  border-left: 3px solid var(--oz-mint);
}

/* Red left accent border */
.oz-red-accent {
  border-left: 3px solid var(--oz-accent-red);
}

/* Badge variants */
.oz-badge {
  @apply inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold uppercase;
  font-family: var(--font-geist-mono);
  font-size: 10px;
  letter-spacing: 0.25em;
}

@media (min-width: 768px) {
  .oz-badge {
    font-size: 12px;
  }
}

.oz-badge-gold {
  background: rgba(239, 252, 95, 0.1);
  border: 1px solid rgba(239, 252, 95, 0.2);
  color: var(--oz-button);
}

.oz-badge-green {
  background: rgba(0, 108, 64, 0.08);
  border: 1px solid rgba(0, 108, 64, 0.15);
  color: var(--oz-medium-green);
}

/* Entrance animation types */
.oz-anim-rise {
  opacity: 0;
  transform: translateY(24px);
}

.oz-anim-rise.oz-visible {
  animation: ozRise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.oz-anim-reveal {
  opacity: 0;
  clip-path: inset(50% 50% 50% 50%);
}

.oz-anim-reveal.oz-visible {
  animation: ozReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.oz-anim-slide {
  opacity: 0;
  transform: translateX(-20px);
}

.oz-anim-slide.oz-visible {
  animation: ozSlide 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes ozRise {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ozReveal {
  to { opacity: 1; clip-path: inset(0% 0% 0% 0%); }
}

@keyframes ozSlide {
  to { opacity: 1; transform: translateX(0); }
}

/* Hero background glow (single, slow) */
.oz-hero-glow {
  position: relative;
  overflow: hidden;
}

.oz-hero-glow::before {
  content: '';
  position: absolute;
  width: 900px;
  height: 600px;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse, rgba(93, 243, 194, 0.15), transparent 70%);
  animation: ozHeroGlow 12s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes ozHeroGlow {
  0% { opacity: 0.5; transform: translateX(-50%) scale(0.9); }
  100% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
}

/* Gold underline draw effect */
.oz-gold-underline {
  position: relative;
  display: inline-block;
}

.oz-gold-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: var(--oz-button);
  transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.oz-gold-underline.oz-visible::after {
  width: 64px;
}

/* Section dark-to-light and light-to-dark gradient dividers */
.oz-divider-dark-to-light {
  height: 120px;
  background: linear-gradient(to bottom, var(--oz-dark-green), #f9fafb);
  position: relative;
}

.oz-divider-light-to-dark {
  height: 120px;
  background: linear-gradient(to bottom, #f9fafb, var(--oz-dark-green));
  position: relative;
}

.oz-divider-dark-line {
  height: 1px;
  width: 60%;
  margin: 0 auto;
  background: var(--oz-button);
  opacity: 0.4;
}

/* Standardized hero entrance stagger */
.oz-hero-entrance > * {
  opacity: 0;
  transform: translateY(18px);
  animation: ozHeroRise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.oz-hero-entrance > *:nth-child(1) { animation-delay: 0.05s; }
.oz-hero-entrance > *:nth-child(2) { animation-delay: 0.13s; }
.oz-hero-entrance > *:nth-child(3) { animation-delay: 0.21s; }
.oz-hero-entrance > *:nth-child(4) { animation-delay: 0.29s; }
.oz-hero-entrance > *:nth-child(5) { animation-delay: 0.37s; }
.oz-hero-entrance > *:nth-child(6) { animation-delay: 0.45s; }

@keyframes ozHeroRise {
  0% { opacity: 0; transform: translateY(18px) scale(0.99); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .oz-anim-rise, .oz-anim-reveal, .oz-anim-slide,
  .oz-hero-entrance > * {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
  }
  .oz-hero-glow::before {
    animation: none;
  }
}
```

- [ ] **Step 6: Update button classes**

Replace `.oz-btn-primary` box-shadow (the current triple-layer glow) with a softer single glow:

```css
.oz-btn-primary {
  @apply inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none bg-[#effc5f] text-[#021f0d] hover:bg-[#d7e851];
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(239, 252, 95, 0.25);
  font-family: var(--font-brand-body);
}

@media (hover: hover) {
  .oz-btn-primary:hover {
    box-shadow: 0 0 32px rgba(239, 252, 95, 0.35);
  }
}
```

- [ ] **Step 7: Update body background**

Replace the body background (lines ~116–124) — remove the noise texture SVG, simplify:

```css
body {
  background-color: var(--oz-dark-green);
  color: white;
}
```

The page shells (`oz-landing-shell`) will handle their own backgrounds since the hero is now dark.

- [ ] **Step 8: Verify CSS compiles and dev server runs**

Run: `npm run dev`

The site will look broken at this point (sections still have old classes) — that's expected. Verify no CSS compilation errors in terminal.

- [ ] **Step 9: Commit**

```bash
git add app/globals.css
git commit -m "feat: rewrite globals.css — new design system, remove deprecated classes"
```

---

## Task 3: Golden Thread Component

**Files:**
- Create: `components/GoldenThread.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create GoldenThread component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function GoldenThread() {
  const threadRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inDarkSection, setInDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollTop / docHeight);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isDark = entry.target.getAttribute("data-theme") === "dark";
            setInDarkSection(isDark);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = document.querySelectorAll("section[data-theme]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop thread */}
      <div
        ref={threadRef}
        className="fixed left-10 top-0 w-[2px] h-full z-50 hidden md:block pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, #effc5f ${scrollProgress * 100}%, rgba(239,252,95,0.08) ${scrollProgress * 100}%)`,
          boxShadow: inDarkSection
            ? "0 0 8px rgba(239,252,95,0.3)"
            : "none",
          opacity: inDarkSection ? 1 : 0.4,
          transition: "opacity 0.6s ease, box-shadow 0.6s ease",
        }}
      />

      {/* Mobile dot indicator */}
      <MobileDots scrollProgress={scrollProgress} />
    </>
  );
}

function MobileDots({ scrollProgress }: { scrollProgress: number }) {
  const acts = [
    { label: "Arrival", position: 0 },
    { label: "Road", position: 0.25 },
    { label: "City", position: 0.5 },
    { label: "Curtain", position: 0.75 },
  ];

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:hidden pointer-events-none">
      {acts.map((act, i) => (
        <div
          key={act.label}
          className="w-1.5 h-1.5 rounded-full transition-all duration-500"
          style={{
            background:
              scrollProgress >= act.position ? "#effc5f" : "rgba(239,252,95,0.2)",
            boxShadow:
              scrollProgress >= act.position
                ? "0 0 6px rgba(239,252,95,0.4)"
                : "none",
          }}
          aria-label={act.label}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Mount GoldenThread in layout**

In `app/layout.tsx`, import and render GoldenThread inside `<body>`, before `{children}`:

```tsx
import GoldenThread from "@/components/GoldenThread";

// Inside the body:
<body className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
  <GoldenThread />
  {children}
</body>
```

- [ ] **Step 3: Verify thread renders**

Run: `npm run dev`

The gold line should appear on the left at desktop widths, gold dots on mobile. It should fill as you scroll.

- [ ] **Step 4: Commit**

```bash
git add components/GoldenThread.tsx app/layout.tsx
git commit -m "feat: add Golden Thread scroll progress component"
```

---

## Task 4: Section Divider Component

**Files:**
- Create: `components/SectionDivider.tsx`

- [ ] **Step 1: Create SectionDivider component**

```tsx
interface SectionDividerProps {
  type: "dark-to-light" | "light-to-dark" | "dark-line";
}

export default function SectionDivider({ type }: SectionDividerProps) {
  if (type === "dark-line") {
    return <div className="oz-divider-dark-line" />;
  }

  return (
    <div
      className={
        type === "dark-to-light"
          ? "oz-divider-dark-to-light"
          : "oz-divider-light-to-dark"
      }
      aria-hidden
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/SectionDivider.tsx
git commit -m "feat: add SectionDivider gradient transition component"
```

---

## Task 5: Client Page Shell & Entrance Overlay

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update entrance timer and overlay markup**

Change `ENTRANCE_MS` from `5200` to `4000`.

Replace the entrance overlay JSX:

```tsx
{showIntro ? (
  <div className="oz-entrance-overlay oz-entrance-overlay--client">
    <div className="oz-entrance-glow" />
    <div className="oz-entrance-content">
      <p className="oz-entrance-kicker">Engineering partner, not a vendor</p>
      <h2 className="oz-entrance-title">Build what you see</h2>
      <p className="oz-entrance-subtitle">
        Own the code. Ship in four weeks. One team, unlimited queue.
      </p>
    </div>
  </div>
) : null}
```

- [ ] **Step 2: Update shell classes and add dividers**

Change the `showSite` className from `"bg-[#f8fafc] text-[#021f0d] overflow-x-hidden oz-landing-shell"` to `"bg-[#021f0d] text-white overflow-x-hidden"` — the page now starts dark.

The non-showSite className stays `"min-h-dvh bg-[#021f0d] overflow-hidden"`.

Import SectionDivider and insert between sections where background switches. The section order with dividers:

```tsx
import SectionDivider from "@/components/SectionDivider";

// Inside <main>:
<ClientHeroSection />               {/* dark */}
<ClientAudienceSection />            {/* dark */}
<SectionDivider type="dark-line" />
<ClientTruthSection />               {/* dark */}
<SectionDivider type="dark-to-light" />
<ClientHowItWorksSection />          {/* light */}
<SectionDivider type="light-to-dark" />
<ClientSystemSection />              {/* dark */}
<SectionDivider type="dark-to-light" />
<ClientProofSection />               {/* light */}
<CaseStudiesSection />               {/* light */}
<SectionDivider type="light-to-dark" />
<ClientComparisonSection />          {/* light — actually stays light */}
```

Wait — let me map the full dark/light flow per the spec:

| Section | Background |
|---------|-----------|
| Hero | dark |
| Audience | dark |
| Truth | dark |
| HowItWorks | light |
| System | dark |
| Proof | light |
| CaseStudies | light |
| Comparison | light |
| FoundingMember | dark |
| Bonuses | dark |
| Guarantee | dark |
| Fit | light |
| Pricing | light |
| Process | light |
| FAQ | light |
| Application | dark |
| Footer | dark |

Updated divider placement:

```tsx
<ClientHeroSection />               {/* dark */}
{/* no divider — both dark */}
<ClientAudienceSection />            {/* dark */}
<SectionDivider type="dark-line" />
<ClientTruthSection />               {/* dark */}
<SectionDivider type="dark-to-light" />
<ClientHowItWorksSection />          {/* light */}
<SectionDivider type="light-to-dark" />
<ClientSystemSection />              {/* dark */}
<SectionDivider type="dark-to-light" />
<ClientProofSection />               {/* light */}
{/* no divider — both light */}
<CaseStudiesSection />               {/* light */}
{/* no divider — both light */}
<ClientComparisonSection />          {/* light */}
<SectionDivider type="light-to-dark" />
<ClientFoundingMemberSection />      {/* dark */}
<SectionDivider type="dark-line" />
<ClientBonusesSection />             {/* dark */}
<SectionDivider type="dark-line" />
<ClientGuaranteeSection />           {/* dark */}
<SectionDivider type="dark-to-light" />
<ClientFitSection />                 {/* light */}
{/* no divider — both light */}
<ClientPricingSection />             {/* light */}
{/* no divider — both light */}
<ClientProcessSection />             {/* light */}
{/* no divider — both light */}
<ClientFaqSection />                 {/* light */}
<SectionDivider type="light-to-dark" />
<ClientApplicationSection />         {/* dark */}
{/* no divider — footer is also dark */}
```

- [ ] **Step 3: Remove oz-landing-shell class from page**

The `oz-landing-shell` CSS with its fixed radial gradients was for the old light-base design. The page shell is now just `bg-[#021f0d]`. Remove the `oz-landing-shell` class and its `::before` pseudo-element from `globals.css` as well.

In `globals.css`, delete:
- `.oz-landing-shell` and its `::before` (lines ~126–151)
- `.oz-landing-shell > *` (lines ~148–151)
- `.oz-section-glow` and its `::before` (lines ~153–167)

- [ ] **Step 4: Verify entrance overlay plays**

Run: `npm run dev`

Open in incognito. The 4s entrance should play with the emerald glow expanding, gold kicker, white title with gold underline, then fade to the dark hero. Sections will still look broken — that's expected.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/globals.css
git commit -m "feat: update client page shell — dark base, entrance overlay, section dividers"
```

---

## Task 6: Act I Sections — Hero, Audience, Truth

**Files:**
- Modify: `components/sections/ClientHeroSection.tsx`
- Modify: `components/sections/ClientAudienceSection.tsx`
- Modify: `components/sections/ClientTruthSection.tsx`

- [ ] **Step 1: Rewrite ClientHeroSection**

The hero flips from light to dark. Replace the entire section JSX:

```tsx
"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { clientHero } from "@/data/clientPageContent";

export default function ClientHeroSection() {
  return (
    <section
      id="client-hero"
      data-theme="dark"
      className="px-5 sm:px-8 lg:px-12 pt-4 sm:pt-5 md:pt-8 pb-6 sm:pb-8 md:pb-12 section-viewport flex flex-col items-center justify-center relative overflow-hidden bg-[#021f0d] oz-hero-glow"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col items-center text-center oz-hero-entrance px-1">
        <div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-9">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#5df3c2]">OZ Tech</span>
        </div>

        <span className="oz-badge oz-badge-gold">
          <span className="w-2 h-2 rounded-full bg-[#effc5f] animate-pulse" />
          {clientHero.preHeadline}
        </span>

        <h1 className="mt-5 md:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.92] tracking-tighter uppercase max-w-5xl break-words">
          We&apos;re the Engineering Team That Turns Your{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#effc5f] to-[#5df3c2]">
            Vision
          </span>{" "}
          Into Working Technology
        </h1>

        <div className="mt-4 md:mt-8 max-w-4xl space-y-4 md:space-y-5">
          <p className="text-sm md:text-xl text-white/70 leading-relaxed font-medium">
            {clientHero.subheadline}
          </p>
          <p className="text-sm md:text-lg text-white/60 leading-relaxed font-medium">
            You bring the vision. We bring the engineering.
          </p>
        </div>

        <div className="mt-6 md:mt-9">
          <a
            href="#client-how"
            className="oz-btn-primary min-h-11 min-w-[min(100%,220px)] md:min-w-[280px] text-sm md:text-lg inline-flex items-center justify-center gap-3 touch-manipulation px-6 w-full max-w-sm sm:w-auto"
          >
            {clientHero.cta} <ArrowRight size={20} strokeWidth={3} />
          </a>
        </div>

        <p className="mt-5 md:mt-6 text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-[0.16em] md:tracking-widest max-w-4xl">
          {clientHero.trustLine}
        </p>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <a href="#client-audience" className="oz-scroll-cue" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(93,243,194,0.15)' }}>
          <ChevronDown size={28} strokeWidth={2} className="text-[#5df3c2]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update ClientAudienceSection**

Key changes — add `data-theme="dark"`, dark background, Forest Cards with gold left-border, gold numbered badges. Read the current file, then apply these class changes:

- Section: add `data-theme="dark"`, change bg to `bg-[#021f0d]`, text to white
- Badge: change to `oz-badge oz-badge-gold`
- Headline: change text color to `text-white`
- Story cards: change to `oz-forest-card oz-gold-accent p-5 md:p-8`
- Card text: white with opacity variants (`text-white`, `text-white/70`)
- Numbered badges (01, 02, 03): all become `bg-[#effc5f] text-[#021f0d]` (gold)
- Bottom close card: add `border border-[#5df3c2]/30` for emerald glow hint
- Container: change to `oz-container`
- Section spacing: add `oz-section-secondary`
- Remove any `section-viewport` class (only hero gets full viewport)

- [ ] **Step 3: Update ClientTruthSection**

Key changes — already dark, add `data-theme="dark"`, apply Forest Cards, emerald border pulse, gold badge:

- Section: add `data-theme="dark"`, ensure bg is `bg-[#021f0d]`
- Badge: change to `oz-badge oz-badge-gold`
- Headline: ensure `text-white`, use Syne sizes
- "Industry" card: add `oz-forest-card` + a red vignette via inline style: `boxShadow: 'inset 0 0 40px rgba(254,88,88,0.06)'`
- "Our Approach" card: add `oz-forest-card oz-emerald-accent` + single pulse animation on the border. Use a motion div with `whileInView` that animates `borderColor` from `transparent` to `#5df3c2` and back over 1.5s once.
- Stat box (`$33,500`): render via StatCounter with Geist Mono font class `font-mono`
- Container: `oz-container`
- Section spacing: `oz-section-secondary`

- [ ] **Step 4: Verify Act I renders**

Run: `npm run dev`

The first three sections should now be dark with gold badges, Forest Cards, and the hero glow. The "Vision" gradient should be gold-to-emerald.

- [ ] **Step 5: Commit**

```bash
git add components/sections/ClientHeroSection.tsx components/sections/ClientAudienceSection.tsx components/sections/ClientTruthSection.tsx
git commit -m "feat: restyle Act I sections — dark forest theme with gold accents"
```

---

## Task 7: Act II Sections — HowItWorks, System, Proof, CaseStudies

**Files:**
- Modify: `components/sections/ClientHowItWorksSection.tsx`
- Modify: `components/sections/ClientSystemSection.tsx`
- Modify: `components/sections/ClientProofSection.tsx`
- Modify: `components/sections/CaseStudiesSection.tsx`

- [ ] **Step 1: Update ClientHowItWorksSection — first light section**

Key changes — flip to light background, gold numbered circles, City Cards:

- Section: add `data-theme="light"`, bg to `bg-[#f9fafb]`, text to `text-[#021f0d]`
- Badge: `oz-badge oz-badge-green`
- Headline: `text-[#021f0d]`
- Numbered circles: change from `bg-[#5df3c2]` to `bg-[#effc5f] text-[#021f0d]` (gold)
- Cards: `oz-city-card oz-emerald-accent p-5 md:p-8`
- Bottom CTA card: `bg-[#021f0d] text-white` with gold accent, remove gradient+maze pattern
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 2: Update ClientSystemSection — dark with gem-cut cards**

Key changes — stays dark, gem-cut clip-path on stage cards, gold numbers:

- Section: add `data-theme="dark"`, ensure bg `bg-[#021f0d]`
- Badge: `oz-badge oz-badge-gold`
- Stage cards: `oz-forest-card` plus add inline style `clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'`
- Numbered circles: `bg-[#effc5f] text-[#021f0d]`
- Hover: border transitions to emerald (already handled by `oz-forest-card`)
- Bottom CTA: dark with gold accent
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 3: Update ClientProofSection — light, revelation moment**

Key changes — light bg, podium stagger on stat cards, enhanced glow on middle card:

- Section: add `data-theme="light"`, bg `bg-[#f9fafb]`
- Badge: `oz-badge oz-badge-green`
- Three stat cards layout: use a flex/grid with the middle card having `mt-0` and flanking cards having `mt-5` (podium effect via margin)
- Left card: `oz-city-card`
- Middle card: keep `oz-emerald-card` with `oz-glow-strong`, add a motion `whileInView` scale animation: `initial={{ scale: 0.98 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6 }}`
- Red card: keep red gradient but soften glow
- Stat numbers: add `font-mono` class
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 4: Update CaseStudiesSection — light, 58/42 split**

Key changes — light bg, gold border-bottom on carousel, emerald top-border on details:

- Section: add `data-theme="light"`, bg white
- Carousel card: add `border-b-2 border-[#effc5f]`
- Details panel: add `border-t-[3px] border-[#5df3c2]`
- Layout: adjust grid to `grid-cols-1 lg:grid-cols-[58fr_42fr]`
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 5: Verify Act II renders**

Run: `npm run dev`

Scroll past Act I — you should see the first dark-to-light gradient divider, then the light HowItWorks section with gold circles, then light-to-dark back into System, etc.

- [ ] **Step 6: Commit**

```bash
git add components/sections/ClientHowItWorksSection.tsx components/sections/ClientSystemSection.tsx components/sections/ClientProofSection.tsx components/sections/CaseStudiesSection.tsx
git commit -m "feat: restyle Act II sections — yellow brick road with light/dark rhythm"
```

---

## Task 8: Act III Sections — Comparison, FoundingMember, Bonuses, Guarantee, Fit

**Files:**
- Modify: `components/sections/ClientComparisonSection.tsx`
- Modify: `components/sections/ClientFoundingMemberSection.tsx`
- Modify: `components/sections/ClientBonusesSection.tsx`
- Modify: `components/sections/ClientGuaranteeSection.tsx`
- Modify: `components/sections/ClientFitSection.tsx`

- [ ] **Step 1: Update ClientComparisonSection — light, emerald table header**

- Section: add `data-theme="light"`, bg `bg-[#f9fafb]`
- Badge: `oz-badge oz-badge-green`
- Table header row: `bg-gradient-to-r from-[#006c40] to-[#021f0d]` instead of flat dark
- OZ column header cell: add `bg-[#effc5f]/10`
- Hover rows: `hover:bg-[#5df3c2]/5`
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 2: Update ClientFoundingMemberSection — dark, gem-cut**

- Section: add `data-theme="dark"`, bg `bg-[#021f0d]`
- Badge: `oz-badge oz-badge-gold`
- "FOUNDING" watermark: change color to `text-[#effc5f]/[0.03]`
- Grid cards: `oz-forest-card` + gem-cut clip-path inline style
- Status CTA box: `bg-gradient-to-br from-[#effc5f] to-[#5df3c2]` — keep but remove `oz-maze-overlay`
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 3: Update ClientBonusesSection — dark, gold values**

- Section: add `data-theme="dark"`, bg `bg-[#021f0d]`
- Badge: `oz-badge oz-badge-gold`
- Bonus value numbers: change from `text-[#5df3c2]` to `text-[#effc5f]` (gold)
- Cards: `oz-forest-card` + `border-t-2 border-[#effc5f]`
- Total value box: gold glow (`box-shadow: 0 0 24px rgba(239,252,95,0.2)`)
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 4: Update ClientGuaranteeSection — dark, double-border**

- Section: add `data-theme="dark"`, bg `bg-[#021f0d]`
- Badge: `oz-badge oz-badge-gold`
- Commitment cards: `oz-forest-card` with added `border-[#5df3c2]/20`. Add an `::after` pseudo for the inner gold border or use a wrapper div with `border: 1px solid rgba(239,252,95,0.15)` and `margin: 6px` + `border-radius: inherit`
- "Month 2 is free" text: wrap in `<span className="bg-[#effc5f]/15 px-2 py-0.5 rounded">`
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 5: Update ClientFitSection — light, colored accent borders**

- Section: add `data-theme="light"`, bg `bg-[#f9fafb]`
- Badge: `oz-badge oz-badge-green`
- "Good fit" card: `oz-city-card oz-emerald-accent`
- "Not a fit" card: `oz-city-card oz-red-accent` with dark bg kept for contrast or switched to `bg-[#021f0d]` with light text per existing design
- Values pills: change from filled to outlined — `bg-transparent border border-[#021f0d]/20 text-[#021f0d]`
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 6: Verify Act III renders**

Run: `npm run dev`

- [ ] **Step 7: Commit**

```bash
git add components/sections/ClientComparisonSection.tsx components/sections/ClientFoundingMemberSection.tsx components/sections/ClientBonusesSection.tsx components/sections/ClientGuaranteeSection.tsx components/sections/ClientFitSection.tsx
git commit -m "feat: restyle Act III sections — emerald city with gem-cut cards"
```

---

## Task 9: Act IV Sections — Pricing, Process, FAQ, Application, Footer

**Files:**
- Modify: `components/sections/ClientPricingSection.tsx`
- Modify: `components/sections/ClientProcessSection.tsx`
- Modify: `components/sections/ClientFaqSection.tsx`
- Modify: `components/sections/ClientApplicationSection.tsx`
- Modify: `components/sections/Footer.tsx`

- [ ] **Step 1: Update ClientPricingSection — light, extra breathing room**

- Section: add `data-theme="light"`, bg white, padding override: `py-32 md:py-40`
- Badge: `oz-badge oz-badge-green`
- Pricing card: keep dark with `oz-emerald-card` or `oz-gem-card` treatment
- `$3,500` number: change to `text-[#effc5f] font-heading` (gold, Syne)
- Feature pills: `bg-transparent border border-[#5df3c2]/30 text-[#5df3c2]`
- Container: `oz-container`

- [ ] **Step 2: Update ClientProcessSection — light, left-aligned steps**

- Section: add `data-theme="light"`, bg white
- Badge: `oz-badge oz-badge-green`
- Step numbered circles: `bg-[#effc5f] text-[#021f0d]` (gold)
- Steps: left-aligned (`text-left items-start`) rather than centered
- Team CTA card: `bg-[#021f0d]` with gold accent
- Container: `oz-container`, spacing: `oz-section-secondary`

- [ ] **Step 3: Update ClientFaqSection — light, gold open state**

- Section: add `data-theme="light"`, bg `bg-[#f9fafb]`
- Badge: `oz-badge oz-badge-green`
- Closed FAQ items: `oz-city-card` styling (white, subtle shadow)
- Open state: add gold left-border that slides in. Change the border from `border-[#5df3c2]` to gold: `border-l-[3px] border-l-[#effc5f]`
- Plus icon: on open, rotates to X and changes color to `text-[#effc5f]`
- Add auto-close behavior: only one FAQ open at a time (track open index in state, clicking another closes the current)
- Container: `oz-container`, spacing: `oz-section-tertiary`

- [ ] **Step 4: Update ClientApplicationSection — dark, the wizard reveal**

- Section: add `data-theme="dark"`, bg gradient: `bg-gradient-to-b from-[#021f0d] via-[#04301b] to-[#021f0d]`
- Add a faint radial gold glow centered on the form area (inline style or dedicated class)
- Badge: `oz-badge oz-badge-gold`
- Qualification box: `bg-white text-[#021f0d]` (bright white — curtain pulled back)
- Form modal: keep `oz-glass-card oz-skew-frame oz-vine-border oz-gem-corners`
- Container: `oz-container`, spacing: `oz-section-primary`

- [ ] **Step 5: Update Footer — dark, gold separator**

- Section: add `data-theme="dark"`, bg `bg-[#021f0d]`
- Logo: increase opacity to `opacity-40`
- Add gold horizontal line above footer: can be a `<div className="oz-divider-dark-line mb-12" />` at the top of the footer section
- Nav link hover: `hover:text-[#5df3c2]` (keep)
- Copyright text: `text-white/20`
- Container: `oz-container`, spacing: `oz-section-tertiary`

- [ ] **Step 6: Verify Act IV renders**

Run: `npm run dev`

The full client page should now be navigable with correct dark/light rhythm, gradient dividers, and the golden thread.

- [ ] **Step 7: Commit**

```bash
git add components/sections/ClientPricingSection.tsx components/sections/ClientProcessSection.tsx components/sections/ClientFaqSection.tsx components/sections/ClientApplicationSection.tsx components/sections/Footer.tsx
git commit -m "feat: restyle Act IV sections — behind the curtain with gold reveals"
```

---

## Task 10: Invest Page & Password Gate

**Files:**
- Modify: `app/invest/page.tsx`
- Modify: `components/PasswordLock.tsx`
- Modify invest section components (apply same design system — `data-theme`, card classes, badge classes):
  - `components/sections/HeroSection.tsx`
  - `components/sections/SocialProofSection.tsx`
  - `components/sections/TruthSection.tsx`
  - `components/sections/VisionSection.tsx`
  - `components/sections/SystemSection.tsx`
  - `components/sections/BusinessModelSection.tsx`
  - `components/sections/OpportunitySection.tsx`
  - `components/sections/RisksSection.tsx`
  - `components/sections/InvestmentSection.tsx`
  - `components/sections/InvestorsSection.tsx`
  - `components/sections/TeamSection.tsx`
  - `components/sections/FaqSection.tsx`
  - `components/sections/ApplicationSection.tsx`

- [ ] **Step 1: Update PasswordLock styling**

Read `components/PasswordLock.tsx`. Restyle:
- Background: `bg-[#021f0d]` full screen
- Input: remove full border, use gold bottom-border only: `border-0 border-b-2 border-[#effc5f] bg-transparent text-white focus:outline-none focus:border-[#5df3c2]`
- Submit button: `oz-btn-primary`
- Label/title text: Syne, white

- [ ] **Step 2: Update invest/page.tsx shell**

- Change `ENTRANCE_MS` from `5200` to `4000`
- Update `shellLight` to `"bg-[#021f0d] text-white overflow-x-hidden"` (invest page is also dark-base now)
- Add entrance glow div to the overlay markup (same as client):
```tsx
<div className="oz-entrance-glow" />
```
- Import and insert SectionDividers between sections where background switches (same pattern as client page — map each invest section to dark/light based on its content type)

- [ ] **Step 3: Apply design system to all invest sections**

For each invest section component, apply the same pattern:
- Add `data-theme="dark"` or `data-theme="light"` attribute
- Update background classes
- Swap badges to `oz-badge oz-badge-gold` (dark) or `oz-badge oz-badge-green` (light)
- Swap cards to `oz-forest-card` (dark) or `oz-city-card` (light)
- Update text colors (white on dark, `#021f0d` on light)
- Add `oz-container` and appropriate spacing class
- Use more restrained animations — keep `rise` entrances but remove any extra motion

This is a batch operation across 13 files. Each file follows the same mechanical pattern:
1. Read current file
2. Identify background (dark or light based on section content)
3. Add `data-theme` attribute
4. Replace card/badge/text classes per design system
5. Add `oz-container` and spacing

- [ ] **Step 4: Verify invest page**

Run: `npm run dev`, navigate to `/invest`, enter password. Full invest page should render with the new design system.

- [ ] **Step 5: Commit**

```bash
git add app/invest/page.tsx components/PasswordLock.tsx components/sections/HeroSection.tsx components/sections/SocialProofSection.tsx components/sections/TruthSection.tsx components/sections/VisionSection.tsx components/sections/SystemSection.tsx components/sections/BusinessModelSection.tsx components/sections/OpportunitySection.tsx components/sections/RisksSection.tsx components/sections/InvestmentSection.tsx components/sections/InvestorsSection.tsx components/sections/TeamSection.tsx components/sections/FaqSection.tsx components/sections/ApplicationSection.tsx
git commit -m "feat: restyle invest page and password gate with design system"
```

---

## Task 11: Team Page

**Files:**
- Modify: `app/team/page.tsx`

- [ ] **Step 1: Read current team page**

Read `app/team/page.tsx` to understand the current carousel structure, member data, and animation patterns.

- [ ] **Step 2: Restyle team page**

Apply the following changes:
- Page background: `bg-[#021f0d]` throughout
- Hero area: Syne headline (`text-white`), gold underline via `oz-gold-underline` class
- Team cards: `oz-forest-card` with gem-cut clip-path (`clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'`)
- Active member card: `border-[#5df3c2]` (static emerald border)
- Member photos: `rounded-lg` (not circle), `border border-[#5df3c2]/30`
- Name: `font-heading` (Syne)
- Role: `font-mono text-[#effc5f] uppercase tracking-widest text-xs`
- Bio: `text-white/80`
- Navigation arrows: `text-[#effc5f]`
- Dot indicators: gold fill for active, `#effc5f/20` for inactive
- Keep AnimatePresence transitions (fade+slide)
- Add `data-theme="dark"` to the main section
- Container: `oz-container`

- [ ] **Step 3: Verify team page**

Run: `npm run dev`, navigate to `/team`. Carousel should work with new dark styling, gold roles, emerald-bordered photos.

- [ ] **Step 4: Commit**

```bash
git add app/team/page.tsx
git commit -m "feat: restyle team page — dark base with emerald frames and gold accents"
```

---

## Task 12: Framer Motion Animation Standardization

**Files:**
- Modify: All section components that use `motion` from `framer-motion` or the `motion` package

- [ ] **Step 1: Create shared animation variants**

Add to `lib/utils.ts` (or create `lib/animations.ts` if you prefer separation):

```ts
export const riseVariant = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const revealVariant = {
  initial: { opacity: 0, clipPath: "inset(50% 50% 50% 50%)" },
  whileInView: { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const slideVariant = {
  initial: { opacity: 0, x: -20 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: "-50px" },
};

export const staggerDelay = (index: number) => ({
  transition: { delay: index * 0.08 },
});
```

- [ ] **Step 2: Update section components to use shared variants**

Go through each section component and replace the existing `cardMotion` / inline motion props with the shared variants:

- Headlines: use `revealVariant` spread on the `<motion.h2>` or equivalent
- Cards/list items: use `riseVariant` with `staggerDelay(index)`
- Left-aligned content: use `slideVariant`

This is a mechanical find-and-replace across all section files. For each file:
1. Import `riseVariant`, `staggerDelay` from `@/lib/animations` (or `@/lib/utils`)
2. Replace `const cardMotion = { initial: {...}, whileInView: {...}, ... }` with the imported variant
3. Replace `transition: { delay: idx * 0.05 }` (or 0.1, 0.15) with `staggerDelay(idx)`

- [ ] **Step 3: Verify animations**

Run: `npm run dev`

Scroll through all sections. Each should have consistent entrance animations with 0.08s stagger timing.

- [ ] **Step 4: Commit**

```bash
git add lib/animations.ts components/sections/
git commit -m "feat: standardize Framer Motion animations — rise/reveal/slide with 0.08s stagger"
```

---

## Task 13: Final Polish & Build Verification

**Files:**
- Various — fix any remaining issues

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Fix any TypeScript errors or build warnings.

- [ ] **Step 2: Run linter**

```bash
npm run lint
```

Fix any lint errors.

- [ ] **Step 3: Visual audit — client page**

Run: `npm run dev`

Scroll through the entire client page in both desktop and mobile viewports. Check:
- [ ] Golden thread fills correctly on desktop
- [ ] Mobile dots work
- [ ] All gradient dividers render smoothly
- [ ] No sections have mismatched text/background contrast
- [ ] All badges use the correct gold/green variant
- [ ] All cards use the correct Forest/City/Gem variant
- [ ] Hero entrance animation plays correctly in incognito
- [ ] CTAs are visible and clickable
- [ ] FAQ accordion works (single open at a time)

- [ ] **Step 4: Visual audit — invest page**

Navigate to `/invest`, enter password. Check:
- [ ] Password input has gold underline style
- [ ] Entrance overlay plays
- [ ] All sections match design system
- [ ] Dividers render correctly

- [ ] **Step 5: Visual audit — team page**

Navigate to `/team`. Check:
- [ ] Dark background throughout
- [ ] Carousel navigation works
- [ ] Member cards have gem-cut corners
- [ ] Gold roles, emerald photo borders

- [ ] **Step 6: Fix any issues found**

Address any visual bugs, contrast issues, or broken layouts discovered in the audits.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "fix: final polish — build fixes, visual audit corrections"
```
