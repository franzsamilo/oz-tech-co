"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { visionSection } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          Technology Sovereignty
        </span>

        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95]"
        >
          {visionSection.headline}
        </ScrollReveal>

        <motion.div {...cardMotion} className="mt-6 md:mt-10 p-4 md:p-8 rounded-3xl bg-white border-2 border-red-500/10 shadow-lg inline-flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <p className="text-sm md:text-lg font-bold text-[#021f0d]/60 italic">&quot;{visionSection.math[visionSection.math.length - 1]}&quot;</p>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-5xl font-heading font-black text-red-500">$33,500/yr</p>
            <p className="text-xs font-bold text-red-500/60 uppercase tracking-widest mt-1">Annual Capital Loss</p>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-4 md:gap-8 text-left">
          <motion.div {...cardMotion} className="p-5 md:p-8 rounded-3xl bg-[#021f0d] text-white shadow-2xl oz-emerald-card">
            <h3 className="text-lg md:text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-tighter leading-none mb-4 md:mb-6">The SaaS Renting Trap</h3>
            <div className="space-y-2 md:space-y-4">
              {visionSection.renting.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <p className="text-sm md:text-base font-medium text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-5 md:p-8 rounded-3xl bg-white border-2 border-[#006c40]/20 shadow-2xl">
            <h3 className="text-lg md:text-2xl font-heading font-black text-[#006c40] uppercase tracking-tighter leading-none mb-4 md:mb-6">Our Approach</h3>
            <div className="space-y-2 md:space-y-4">
              {visionSection.approach.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <p className="text-sm md:text-base font-black text-[#006c40]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-2xl bg-[#f9fafb] border-2 border-[#5df3c2]/20">
              <p className="text-[11px] md:text-sm font-bold text-[#006c40] italic uppercase tracking-wide">{visionSection.visionTagline}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
