"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { opportunity } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function OpportunitySection() {
  return (
    <section
      id="opportunity"
      data-theme="light"
      className="oz-section-secondary bg-[#f9fafb] text-[#021f0d] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10"
        >
          <span className="oz-badge oz-badge-green">
            The Market Gap
          </span>
        </motion.div>

        <ScrollFloat className="text-[#021f0d] text-center" textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-none uppercase">
          {opportunity.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-4 md:gap-7 text-left">
          {opportunity.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: i * 0.1 }}
              className="oz-city-card p-4 md:p-7"
            >
              <span className="w-8 h-8 rounded-xl bg-[#effc5f]/20 text-[#effc5f] flex items-center justify-center font-black mb-3 text-xs">0{i+1}</span>
              <h4 className="text-base md:text-xl font-heading font-black text-[#021f0d] uppercase tracking-tighter mb-2">{pillar.title}</h4>
              <p className="text-xs md:text-base text-[#021f0d]/60 font-medium leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:mt-11 flex flex-wrap gap-2 md:gap-3 justify-center">
          {opportunity.advantages
            .filter(
              (adv) =>
                adv !== "System: Proven 9-step method (not custom chaos every time)" &&
                adv !== "Integrity: We pull back the curtain (industry mystifies)"
            )
            .map((adv) => (
            <span key={adv} className="px-3 md:px-5 py-2 rounded-xl md:rounded-2xl bg-[#021f0d] text-white font-bold text-[10px] md:text-xs uppercase tracking-wide md:tracking-widest shadow-lg">
              {adv}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
