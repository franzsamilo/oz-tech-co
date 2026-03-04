"use client";

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
  return (
    <section
      id="investment"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {investmentTerms.headline}
        </ScrollReveal>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 bg-[#021f0d] text-white p-4 md:p-10 rounded-3xl md:rounded-[48px] shadow-2xl relative overflow-hidden oz-emerald-card text-left"
        >
          <div className="absolute top-0 right-0 p-6 md:p-12 text-[14vw] font-black opacity-5 select-none leading-none">SAFE</div>
          <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#5df3c2] mb-3 md:mb-5">Primary Instrument</p>
            <h3 className="text-2xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-3 md:mb-5 leading-none">
              {investmentTerms.instrument}
            </h3>
            <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed mb-4 md:mb-8">{investmentTerms.instrumentDetail}</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
              {investmentTerms.terms.slice(0, 3).map((t: string) => (
                <span key={t} className="px-3 md:px-6 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-[10px] md:text-sm uppercase tracking-wide md:tracking-widest">{t}</span>
              ))}
            </div>
            <div className="pt-4 md:pt-8 border-t border-white/10">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-wide md:tracking-widest text-[#5df3c2] mb-2 md:mb-4">Projected Returns</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {investmentTerms.returns.slice(0, 2).map((r, i) => (
                  <p key={i} className="text-xs md:text-base font-bold text-white/80">{r}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 md:mt-8 flex flex-wrap gap-2 md:gap-4 justify-center">
          {investmentTerms.guarantee.slice(0, 2).map((g) => (
            <span key={g} className="px-3 md:px-5 py-2 md:py-3 rounded-xl md:rounded-2xl bg-red-500 text-white font-bold text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest shadow-lg">
              ✓ {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
