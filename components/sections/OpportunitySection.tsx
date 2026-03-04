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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40] mb-12"
        >
          The Market Gap
        </motion.div>

        <ScrollFloat className="text-[#021f0d] text-center" textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
          {opportunity.headline}
        </ScrollFloat>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {opportunity.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-[40px] bg-[#f9fafb] border-2 border-[#021f0d]/5 shadow-lg hover:border-[#006c40]/20 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6 text-sm">0{i+1}</span>
              <h4 className="text-xl font-heading font-black text-[#021f0d] uppercase tracking-tighter mb-3">{pillar.title}</h4>
              <p className="text-base text-[#021f0d]/60 font-medium leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {opportunity.advantages.slice(0, 5).map((adv) => (
            <span key={adv} className="px-5 py-2.5 rounded-2xl bg-[#021f0d] text-white font-bold text-xs uppercase tracking-widest shadow-lg">
              {adv}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
