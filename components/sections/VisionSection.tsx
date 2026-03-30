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
      data-theme="light"
      className="oz-section-secondary bg-[#f9fafb] text-[#021f0d] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green mb-6 md:mb-10">
          Technology Sovereignty
        </span>

        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95]"
        >
          {visionSection.headline}
        </ScrollReveal>

        <motion.div {...cardMotion} className="mt-6 md:mt-10 oz-city-card p-4 md:p-8 inline-flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <p className="text-sm md:text-lg font-bold text-[#021f0d]/60 italic">&quot;{visionSection.math[visionSection.math.length - 1]}&quot;</p>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-5xl font-heading font-black text-red-500">$33,500/yr</p>
            <p className="text-xs font-bold text-red-500/60 uppercase tracking-widest mt-1">Annual Capital Loss</p>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-4 md:gap-8 text-left">
          <motion.div {...cardMotion} className="oz-forest-card p-5 md:p-8">
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

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="oz-city-card p-5 md:p-8">
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
