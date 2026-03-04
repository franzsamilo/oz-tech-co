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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#f9fafb] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40] mb-12">
          Technology Sovereignty
        </span>

        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95]"
        >
          {visionSection.headline}
        </ScrollReveal>

        <motion.div {...cardMotion} className="mt-16 p-8 md:p-10 rounded-[32px] bg-white border-2 border-red-500/10 shadow-lg inline-flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-lg font-bold text-[#021f0d]/60 italic">&quot;{visionSection.math[visionSection.math.length - 1]}&quot;</p>
          <div className="text-center md:text-right">
            <p className="text-4xl md:text-5xl font-heading font-black text-red-500">$33,500/yr</p>
            <p className="text-xs font-bold text-red-500/60 uppercase tracking-widest mt-1">Annual Capital Loss</p>
          </div>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
          <motion.div {...cardMotion} className="p-10 rounded-[40px] bg-[#021f0d] text-white shadow-2xl oz-emerald-card">
            <h3 className="text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-tighter leading-none mb-8">The SaaS Renting Trap</h3>
            <div className="space-y-5">
              {visionSection.renting.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <p className="text-lg font-medium text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-10 rounded-[40px] bg-white border-2 border-[#006c40]/20 shadow-2xl">
            <h3 className="text-2xl font-heading font-black text-[#006c40] uppercase tracking-tighter leading-none mb-8">Our Approach</h3>
            <div className="space-y-5">
              {visionSection.approach.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                  <p className="text-lg font-black text-[#006c40]">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl bg-[#f9fafb] border-2 border-[#5df3c2]/20">
              <p className="text-sm font-bold text-[#006c40] italic uppercase tracking-wider">{visionSection.visionTagline}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
