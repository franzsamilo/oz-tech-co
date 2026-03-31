# "Behind the Curtain" — OZ Tech Visual Redesign Spec

## Overview

A complete visual overhaul of the OZ Tech landing site (client, invest, team pages). Content and section order are preserved. Every layout, color usage, typography, animation, and component treatment is rebuilt around the Wizard of Oz narrative: the visitor's journey from mystery (the dark forest) through discovery (the Yellow Brick Road) to revelation (the Emerald City) to trust (behind the curtain).

The theme is felt, not announced. To someone unaware of the Oz reference, this reads as a premium futuristic tech site. To those who know, it delights.

---

## 1. Design System Foundation

### 1.1 Color Roles

Existing palette, new semantic rules:

| Color | Hex | CSS Var | Role | Oz Metaphor |
|-------|-----|---------|------|-------------|
| Deep Green | `#021f0d` | `--oz-dark-green` | "Forest" sections: problems, tension, mystery | The dark woods |
| Emerald Mint | `#5df3c2` | `--oz-mint` | Accent, glow, revelation moments | The Emerald City |
| Medium Green | `#006c40` | `--oz-medium-green` | Secondary text, borders, subtle cues | The road through the forest |
| Gold Yellow | `#effc5f` | `--oz-button` | CTAs, golden thread, progress, value | The Yellow Brick Road |
| Off-White | `#f9fafb` | `--background` | "City" sections: solutions, clarity, proof | Inside the Emerald City |
| Accent Red | `#fe5858` | `--oz-accent-red` | Danger, warnings, "not a fit" | The Wicked Witch |

**Key rules:**
- Gold is structural (thread, dividers, badges on dark sections, value numbers), not just button color.
- Emerald glow is earned — appears at hero, proof stats, pricing, guarantee, application. Not on every card.
- Red is used sparingly and only for negative contrast (truth bullets, "not a fit").

### 1.2 Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Display / Headlines | Syne | 700–800 | `next/font/google` |
| Body | DM Sans | 400–500 | `next/font/google` |
| Labels / Badges / Stats | Geist Mono | 500 | Already loaded |

- Syne replaces Pragmatica for display. Geometric, slightly fantastical, architectural.
- DM Sans replaces Geist Sans for body. Better readability at small sizes, warmer character.
- Geist Mono stays for technical accents: badges, stat counters, the kicker text in the entrance overlay.

**Headline scale (standardized across all sections):**
- Hero: `text-4xl → text-6xl → text-7xl`
- All other sections: `text-3xl → text-5xl → text-6xl`
- All headlines: Syne, `font-black`, `uppercase`, `tracking-tight`, `leading-[0.92]`

### 1.3 The Golden Thread

A 2px vertical gold line (`#effc5f`) running down the left margin of the page.

**Desktop (md+):**
- `position: fixed`, `left: 40px`, `width: 2px`, full viewport height
- `scaleY` driven by scroll progress (`requestAnimationFrame` listener, or CSS `scroll-timeline` if supported with JS fallback)
- `box-shadow: 0 0 8px rgba(239,252,95,0.3)` in dark sections; no glow, `opacity: 0.4` in light sections
- Section detection via Intersection Observer toggles glow state
- At each section's primary CTA: a horizontal branch element (static in section markup), `height: 2px`, animated `width: 0 → target` on scroll-in, pointing toward the CTA
- Thread terminates at footer with a small emerald dot

**Mobile (<md):**
- Thread hidden
- Replaced by fixed right-edge dot indicator: `position: fixed`, `right: 12px`, `top: 50%`, vertical stack of 6px gold circles (one per major act), filled = passed section group

---

## 2. Section Treatments

Section order is unchanged. Sections are grouped by narrative act.

### 2.1 Act I: "The Arrival" (Hero, Audience, Truth)

**Entrance Overlay (rethemed):**
- Duration: 4s (down from 5.2s)
- Background: solid `#021f0d` + single radial emerald glow expanding from center (`scale 0.3 → 1.2` over 3s)
- Kicker: gold, Geist Mono, fades in at 0.3s
- Title: Syne, white, fades in at 0.6s
- Gold underline draws left-to-right beneath title at 1.2s (0.8s draw duration)
- Subtitle: DM Sans, `white/70`, fades in at 1.6s
- Exit (starting 3s): everything fades, glow continues expanding + fading — fog lifting effect
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` throughout

**ClientHeroSection:**
- Background: dark (`#021f0d`), flipped from current light
- Single slow radial emerald glow (CSS `@keyframes`, 12s cycle) — the Emerald City on the horizon
- Remove: maze grid, noise texture, layered pseudo-elements
- Headline: Syne, white. "Vision" gradient becomes gold-to-emerald
- CTA: primary gold button, first golden thread branch target
- Trust line: Geist Mono, `white/40`

**ClientAudienceSection:**
- Stays dark
- Story cards: Forest Card style (`bg-white/[0.04]`, `border white/[0.08]`)
- Thin gold left-border (3px) on each card
- Numbered badges: gold instead of per-card colors
- Bottom "close" card: emerald glow edge (first city hint)

**ClientTruthSection:**
- Stays dark (two darks in a row — intentional "deep forest")
- "Industry" card: subtle red vignette at edges
- "Our Approach" card: emerald border, single pulse animation on scroll-in (1.5s, no loop)
- `$33,500` stat: Geist Mono, typewriter count-up effect

### 2.2 Act II: "The Yellow Brick Road" (HowItWorks, System, Proof, CaseStudies)

**ClientHowItWorksSection:**
- First light break (`#f9fafb`) — you've left the forest
- Numbered circles: gold (you're on the road)
- Cards: City Card style, emerald left-border (3px)
- Bottom CTA card: dark (`#021f0d`), golden thread branch visible

**ClientSystemSection:**
- Dark
- Stage cards: gem-cut `clip-path` (angled top-right corner, 12px cut)
- Numbered circles: gold
- Hover: border transitions to emerald + glow (0.4s)

**ClientProofSection:**
- Light — "Emerald City gates opening"
- Middle stat card: `oz-glow-strong` + brief scale pulse (1.02x) on scroll-in
- Stat numbers: Geist Mono, count-up with gold underline on finish
- Red card: softer glow, doesn't compete with emerald
- Three cards staggered vertically: middle card 20px higher (podium effect)

**CaseStudiesSection:**
- Light
- Carousel card: dark with thin gold border-bottom (the road passing through)
- Details panel: emerald top-border (3px)
- Layout: 58% / 42% split (left heavier)

### 2.3 Act III: "The Emerald City" (Comparison, FoundingMember, Bonuses, Guarantee, Fit)

**ClientComparisonSection:**
- Light
- Table header: emerald gradient (`#006c40 → #021f0d`)
- OZ column header: subtle gold background tint
- Hover rows: faint emerald wash

**ClientFoundingMemberSection:**
- Dark
- "FOUNDING" watermark: gold at very low opacity
- Grid cards: gem-cut clip-path corners
- Status CTA box: prominent gold gradient

**ClientBonusesSection:**
- Dark
- Bonus value numbers: gold (not emerald) — gold = value/reward
- Cards: thin gold top-border (2px)
- Total value box: gold glow

**ClientGuaranteeSection:**
- Dark — "The Wizard's promise"
- Commitment cards: double-border (outer emerald, inner gold via `::after`)
- "Month 2 is free" line: gold highlight background (`#effc5f` at 15% opacity)

**ClientFitSection:**
- Light break
- "Good fit" card: emerald left-border (3px)
- "Not a fit" card: red left-border (3px)
- Values pills: outlined instead of filled

### 2.4 Act IV: "Behind the Curtain" (Pricing, Process, FAQ, Application, Footer)

**ClientPricingSection:**
- Light
- Pricing card: dark, full emerald-card treatment
- `$3,500`: gold, Syne, large
- Feature pills: emerald outlines
- Extra vertical padding (`py-32 md:py-40`) — a moment to breathe

**ClientProcessSection:**
- Light
- Step numbered circles: gold
- Steps left-aligned with golden thread (not centered)
- Team CTA card: dark emerald + gold accent

**ClientFaqSection:**
- Light
- Closed: white card, no visible border, subtle shadow
- Open: gold left-border (3px) slides in from top, icon turns gold
- Auto-close: only one open at a time

**ClientApplicationSection:**
- Dark — "meeting the Wizard"
- Deep emerald-to-dark gradient background + faint radial gold glow centered on form
- Qualification box: bright white (curtain pulled back)
- Form modal: gem-corners + vine-border treatments (earned, not overused)

**Footer:**
- Dark, minimal
- Logo: 40% opacity (up from 20%)
- Gold horizontal line (1px, 60% width, centered) separates from application section
- Golden thread terminates with emerald dot

---

## 3. Motion & Animation System

### 3.1 Principles

1. Earn every animation. Motion reveals, provides feedback, or reinforces the journey.
2. One signature motion per section.
3. Two easing curves site-wide:
   - Entrances: `cubic-bezier(0.22, 1, 0.36, 1)`
   - Hover/transitions: `cubic-bezier(0.4, 0, 0.2, 1)`
4. Scroll-triggered, play-once (`whileInView`, `once: true`). No looping animations except golden thread scroll and hero background glow.

### 3.2 Entrance Types

| Type | Motion | Duration | Use |
|------|--------|----------|-----|
| `rise` | `opacity 0→1, y: 24→0` | 0.6s | Cards, paragraphs, list items |
| `reveal` | `opacity 0→1, clipPath inset unfolds from center` | 0.8s | Headlines, key stats |
| `slide` | `opacity 0→1, x: -20→0` | 0.5s | Left-aligned content branching off the thread |

Stagger: `0.08s` between siblings (standardized, no more 0.05/0.1/0.15 variance).

### 3.3 Hover & Interaction

- Cards: `border-color` transition to emerald (0.3s) + `translateY(-2px)`. Guarded by `@media (hover: hover)`.
- CTA buttons: gold glow intensifies. Active: `scale(0.97)`.
- FAQ: gold left-border slides in (height 0→100%, 0.4s). Plus→X rotation, turns gold.
- Links: underline draws left-to-right (gold, via `background-size` transition).

### 3.4 Removed Animations & Effects

- `oz-maze-overlay::before` grid pattern on all sections (kept only on Application section and entrance overlay)
- `oz-sparkle-bg` sparkle dots
- `oz-hero-magic` layered pseudo-elements (replaced by single radial glow)
- Looping `pulse-glow` animations
- `hacker-bg` scanlines
- `ozEntranceSparkle` infinite loop (replaced by single-fire glow expand)

---

## 4. Layout & Spacing System

### 4.1 Container

- Max width: `1200px` (up from mixed `max-w-5xl` / 1024px)
- Horizontal padding: `px-5` (mobile) → `px-8` (tablet) → `px-12` (desktop)
- Consistent across all sections

### 4.2 Section Heights

- Hero: `min-height: 100dvh`
- All other sections: content-driven height with generous vertical padding
  - Primary (Hero, Truth, Pricing, Application): `py-24 md:py-32`
  - Secondary (Audience, HowItWorks, System, etc.): `py-20 md:py-28`
  - Tertiary (FAQ, Footer): `py-16 md:py-24`
- **Remove `scroll-snap-type: y mandatory` from `<html>`** and all `scroll-snap-align`/`scroll-snap-stop` from `.section-viewport`. Natural smooth scroll + golden thread as progress indicator.

### 4.3 Card System

**Forest Card** (dark sections):
- `bg-white/[0.04]`, `border: 1px solid white/[0.08]`
- Hover: `border-color: #5df3c2/30`, `translateY(-2px)`
- Optional: gold left-border (3px)

**City Card** (light sections):
- `bg-white`, `border: 1px solid #021f0d/[0.06]`
- `box-shadow: 0 4px 24px rgba(2,31,13,0.04)`
- Hover: `border-color: #006c40/20`, `translateY(-2px)`
- Optional: emerald left-border (3px)

**Gem Card** (highlight moments):
- Existing `oz-emerald-card` gradient
- `clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)`
- Gold inner glow on key instances

### 4.4 Badge System

- Dark sections: `bg-#effc5f/10 border-#effc5f/20 text-#effc5f` (gold)
- Light sections: `bg-#006c40/8 border-#006c40/15 text-#006c40` (green)
- Font: Geist Mono, `text-[10px] md:text-xs`, `tracking-[0.25em]`, `uppercase`, `font-semibold`

### 4.5 Asymmetric Layouts

- Headlines: centered
- Two-column layouts (Truth, Guarantee, Fit, FoundingMember): 55% / 45% split
- Proof stats: middle card 20px higher (podium stagger)
- CaseStudies: 58% / 42% split
- Process steps: left-aligned with golden thread

### 4.6 Section Dividers

- Dark → Light: 120px gradient band (`#021f0d → #f9fafb`), thread visible through it
- Light → Dark: reversed gradient
- Dark → Dark: thin 1px gold horizontal line (60% width, centered)

### 4.7 Mobile

- Asymmetric layouts → single column, centered
- Golden thread → gold dot progress indicator (right edge)
- Gem-cut clip-paths → `border-radius` (rendering safety)
- No hover translateY on touch (`@media (hover: hover)` guard)

---

## 5. Page-Specific Treatments

### 5.1 Team Page (`/team`)

- Dark base throughout — "meeting the people behind the curtain"
- Hero: minimal Syne headline, gold underline draws in, no heavy intro
- Team cards: Forest Card with gem-cut clip-path corner
- Active member: emerald border glow (single pulse on select, then static)
- Photos: slightly rounded rectangle with 1px emerald border (not circle crop)
- Name: Syne. Role: Geist Mono, gold, uppercase, tracked small
- Bio: DM Sans, `white/80`
- Navigation: gold arrows, gold dot indicators for active member
- Transition: AnimatePresence, fade+slide left/right, 0.4s
- Mobile: single card, full width, swipe-enabled, gold dots below

### 5.2 Invest Page (`/invest`)

- Same design system as client page (Forest Cards, City Cards, badges, golden thread)
- Password gate: dark bg, centered input with gold bottom-border only (terminal prompt feel), gold CTA submit
- On unlock: same entrance overlay (4s, fog-parting), investor-specific kicker text
- Slightly more restrained than client page: fewer animation moments, tighter spacing
- Golden thread horizontal branches only at primary CTA sections (fewer branches — investors scan faster)

---

## 6. CSS Cleanup

### Remove
- `oz-sparkle-bg` and related sparkle pseudo-elements
- `hacker-bg` and scanline keyframes (`hackerScan`, `hackerGlow`, `hackerMatrix`)
- `tech-magic-glow` and `pulse-glow` (orange glow system — wrong palette)
- `orange-glow`, `orange-glow-text` (orange is not in the brand)
- `cracked-maze`, `cracked-text`, `cracked-border` (cracked aesthetic conflicts with the refined Oz direction)
- `distorted-text` and `distort` keyframes
- `section-transition-start/middle/end` (replaced by gradient dividers)
- `font-tech`, `font-cracked` (Orbitron/Rajdhani references — not loaded, not needed)
- Redundant scroll-snap CSS (all of it)
- `oz-hero-magic`, `oz-hero-bg`, `oz-hero-aurora` layered pseudo-elements (replaced by single glow)

### Keep & Refine
- `oz-emerald-card` (core gem card)
- `oz-glass-card` (application section modal)
- `oz-vine-border` (application section only)
- `oz-gem-corners` (application section only)
- `oz-skew-frame` (application section only)
- `oz-btn-primary`, `oz-btn-secondary`, `oz-btn-outline` (refined per spec)
- `oz-glow`, `oz-glow-strong`, `oz-text-glow`, `oz-button-glow` (kept, used sparingly)
- `grainy-bg` (kept for entrance overlay and application section only)
- `oz-maze-overlay` (kept for application section and entrance overlay only)
- `oz-gold-line` (kept, used on hero headline)
- Entrance overlay keyframes (rewritten per new timing)
- `ozHeroRise` stagger system (kept, re-tuned to 0.08s stagger)

### New
- Golden thread component styles
- `rise`, `reveal`, `slide` entrance animation keyframes
- Gem-cut clip-path utility
- Section gradient divider utilities
- Forest Card, City Card base classes
- Standardized badge variant classes
- Gold underline draw animation
