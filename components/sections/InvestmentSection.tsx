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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {investmentTerms.headline}
        </ScrollReveal>

        <motion.div
          {...cardMotion}
          className="mt-16 bg-[#021f0d] text-white p-10 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden oz-emerald-card text-left"
        >
          <div className="absolute top-0 right-0 p-12 text-[15vw] font-black opacity-5 select-none leading-none">SAFE</div>
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-6">Primary Instrument</p>
            <h3 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter mb-6 leading-none">
              {investmentTerms.instrument}
            </h3>
            <p className="text-xl text-white/60 font-medium leading-relaxed mb-10">{investmentTerms.instrumentDetail}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {investmentTerms.terms.map((t: string) => (
                <span key={t} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-sm uppercase tracking-widest">{t}</span>
              ))}
            </div>
            <div className="pt-8 border-t border-white/10">
              <p className="text-xs font-black uppercase tracking-widest text-[#5df3c2] mb-4">Projected Returns</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {investmentTerms.returns.map((r, i) => (
                  <p key={i} className="text-lg font-bold text-white/80">{r}</p>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {investmentTerms.guarantee.map((g) => (
            <span key={g} className="px-5 py-3 rounded-2xl bg-red-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg">
              ✓ {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
