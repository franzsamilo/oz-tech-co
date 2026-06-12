"use client";

import Script from "next/script";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CALENDAR_SRC = "https://connect.civy.ph/widget/booking/6wcV7lvcjOxdBntDuIGj";
const EMBED_SCRIPT = "https://connect.civy.ph/js/form_embed.js";

const trustBullets = [
  "NO SALES PITCH",
  "FOUNDER-LED",
  "WALK AWAY WITH CLARITY — EITHER WAY",
];

export default function ClarityPage() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#021f0d] text-white">
      {/* Ambient radial mint glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 65% 50%, rgba(93,243,194,0.14), transparent 70%), radial-gradient(ellipse 40% 40% at 20% 30%, rgba(239,252,95,0.05), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Subtle scanline / grain layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.7'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
        aria-hidden
      />

      {/* Minimal corner mark — top-left */}
      <Link
        href="/"
        className="group absolute left-5 top-5 z-30 inline-flex items-center gap-2 text-white/60 transition hover:text-white sm:left-8 sm:top-8"
        aria-label="Back to OZ Tech"
      >
        <Image
          src="/ozlogo.png"
          alt="OZ Tech"
          width={28}
          height={28}
          className="opacity-80 transition group-hover:opacity-100"
        />
        <span
          className="hidden text-[10px] font-semibold uppercase tracking-[0.3em] sm:inline"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          OZ Tech
        </span>
      </Link>

      {/* Poster canvas — typography rail + booking widget. Height grows with widget content. */}
      <div className="relative z-10 flex min-h-dvh w-full items-center justify-center px-4 py-20 sm:px-6 lg:py-12">
        <div className="relative w-full max-w-[1500px]">
          {/* Hairline mint frame (poster border) — desktop only */}
          <div
            className="pointer-events-none absolute inset-0 hidden rounded-[20px] border border-[rgba(93,243,194,0.18)] lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-3 hidden rounded-[14px] border border-dashed border-[rgba(93,243,194,0.10)] lg:block"
            aria-hidden
          />

          {/* Content grid */}
          <div className="relative grid grid-cols-1 gap-8 px-2 py-6 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-12 lg:gap-12 lg:items-center lg:px-14 lg:py-12">
            {/* LEFT RAIL — typography */}
            <div className="oz-hero-entrance flex flex-col justify-center gap-5 sm:gap-7 lg:col-span-5">
              <motion.p
                initial={false}
                className="text-[10px] font-semibold text-[var(--oz-button)]"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.35em",
                }}
              >
                CLARITY CALL · 30 MIN · FREE
              </motion.p>

              <h1
                className="
                  font-heading font-extrabold italic
                  leading-[1.02] tracking-[-0.02em]
                  text-white
                  text-[clamp(2.2rem,6vw,4.6rem)]
                "
              >
                Bring your idea.
                <br />
                Leave with a
                <br />
                <span className="relative inline-block">
                  build plan.
                  <span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--oz-button) 0%, rgba(239,252,95,0) 100%)",
                    }}
                    aria-hidden
                  />
                </span>
              </h1>

              <p
                className="
                  max-w-[34ch] text-white/70
                  text-[15px] sm:text-[16px] lg:text-[17px]
                  leading-relaxed
                "
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                A no-pressure call with the OZ Tech founders. We listen to where
                you&apos;re stuck, sketch the path forward, and tell you straight
                whether we&apos;re the right team to ship it.
              </p>

              <ul className="flex flex-col gap-2 pt-1">
                {trustBullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-[10px] sm:text-[11px] text-[var(--oz-mint)]"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      letterSpacing: "0.25em",
                    }}
                  >
                    <span
                      className="inline-block h-[6px] w-[6px] rotate-45 bg-[var(--oz-mint)]"
                      aria-hidden
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <p
                className="
                  pt-2 text-[13px] italic text-white/55
                  border-t border-white/10 mt-2 pt-4
                "
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                — The OZ Tech Team
              </p>
            </div>

            {/* RIGHT PANE — booking widget. Height comes from iframe so it accommodates every Civy state. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col lg:col-span-7"
            >
              {/* Mono micro-label above the widget */}
              <div
                className="mb-3 flex items-center justify-between text-[9px] sm:text-[10px] text-white/40"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.3em",
                }}
              >
                <span className="uppercase">{"// PICK A TIME"}</span>
                <span className="uppercase">UTC AUTO-DETECT</span>
              </div>

              {/* The "stage" — white card with mint hairline */}
              <div
                className="relative overflow-hidden rounded-2xl bg-white"
                style={{
                  border: "1px solid rgba(93, 243, 194, 0.35)",
                  boxShadow:
                    "0 30px 80px -20px rgba(2,31,13,0.6), 0 0 0 1px rgba(93,243,194,0.08), 0 0 60px rgba(93,243,194,0.12)",
                }}
              >
                {/* Corner accents (Wizard of Oz emerald gem feel) */}
                <span
                  className="pointer-events-none absolute left-3 top-3 h-2 w-2 rotate-45 border-2 border-[var(--oz-mint)]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute right-3 top-3 h-2 w-2 rotate-45 border-2 border-[var(--oz-mint)]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-3 left-3 h-2 w-2 rotate-45 border-2 border-[var(--oz-mint)]"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 rotate-45 border-2 border-[var(--oz-mint)]"
                  aria-hidden
                />

                <iframe
                  src={CALENDAR_SRC}
                  className="block w-full border-0"
                  style={{
                    height: "min(1100px, calc(100vh - 11rem))",
                    minHeight: "720px",
                  }}
                  id="oz_clarity_call_widget"
                  title="Book your Clarity Call with OZ Tech"
                />
              </div>

              {/* Mono micro-label below */}
              <div
                className="mt-3 text-center text-[9px] sm:text-[10px] text-white/35"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  letterSpacing: "0.3em",
                }}
              >
                CALENDAR POWERED BY OZ × GHL
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Script src={EMBED_SCRIPT} strategy="afterInteractive" />
    </main>
  );
}
