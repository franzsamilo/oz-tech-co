"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { investmentTerms } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function InvestmentSection() {
  const [openPanel, setOpenPanel] = useState<"terms" | "returns" | "guarantee" | null>("terms");

  return (
    <section
      id="investment"
      data-theme="dark"
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <ScrollReveal
          textClassName="text-white text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {investmentTerms.headline}
        </ScrollReveal>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 oz-forest-card p-4 md:p-10 text-left hidden md:block relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 md:p-12 text-[14vw] font-black opacity-5 select-none leading-none">SAFE</div>
          <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#effc5f] mb-3 md:mb-5">Primary Instrument</p>
            <h3 className="text-2xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-3 md:mb-5 leading-none text-white">
              {investmentTerms.instrument}
            </h3>
            <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed mb-4 md:mb-8">{investmentTerms.instrumentDetail}</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
              {investmentTerms.terms.map((t: string) => (
                <span key={t} className="px-3 md:px-6 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-[10px] md:text-sm uppercase tracking-wide md:tracking-widest">{t}</span>
              ))}
            </div>
            <div className="pt-4 md:pt-8 border-t border-white/10">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-wide md:tracking-widest text-[#5df3c2] mb-2 md:mb-4">Projected Returns</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {investmentTerms.returns.map((r, i) => (
                  <p key={i} className="text-xs md:text-base font-bold text-white/80">{r}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 md:hidden text-left oz-forest-card p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#effc5f] mb-3">Primary Instrument</p>
          <h3 className="text-xl font-heading font-black uppercase tracking-tighter mb-3 leading-tight text-white">
            {investmentTerms.instrument}
          </h3>
          <p className="text-xs text-white/70 font-medium leading-relaxed mb-4">
            {investmentTerms.instrumentDetail}
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "terms" ? null : "terms")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px] text-white"
            >
              Terms
              <span className="text-xs">{openPanel === "terms" ? "−" : "+"}</span>
            </button>
            {openPanel === "terms" && (
              <div className="flex flex-wrap gap-2 px-1 pb-2">
                {investmentTerms.terms.map((t: string) => (
                  <span key={t} className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 font-bold text-[10px] uppercase tracking-wide text-white">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "returns" ? null : "returns")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px] text-white"
            >
              Projected Returns
              <span className="text-xs">{openPanel === "returns" ? "−" : "+"}</span>
            </button>
            {openPanel === "returns" && (
              <div className="grid gap-2 px-1 pb-2 text-xs font-bold text-white/80">
                {investmentTerms.returns.map((r, i) => (
                  <p key={i}>{r}</p>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "guarantee" ? null : "guarantee")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px] text-white"
            >
              Guarantees
              <span className="text-xs">{openPanel === "guarantee" ? "−" : "+"}</span>
            </button>
            {openPanel === "guarantee" && (
              <div className="flex flex-wrap gap-2 px-1 pb-2">
                {investmentTerms.guarantee.map((g) => (
                  <span key={g} className="px-3 py-2 rounded-xl bg-red-500 text-white font-bold text-[10px] uppercase tracking-wide">
                    ✓ {g}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 md:mt-8 hidden md:flex flex-wrap gap-2 md:gap-4 justify-center">
          {investmentTerms.guarantee.map((g) => (
            <span key={g} className="px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl bg-red-500 text-white font-bold text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest shadow-lg">
              ✓ {g}
            </span>
          ))}
        </div>

        <motion.div {...cardMotion} className="mt-8 md:mt-12 flex justify-center">
          <a
            href="#application"
            className="oz-btn-primary min-h-12 min-w-[260px] md:min-w-[300px] text-sm md:text-base inline-flex items-center justify-center gap-3 px-6 touch-manipulation"
          >
            Apply to Invest →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
