"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientBonuses } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientBonusesSection() {
  return (
    <section
      id="client-bonuses"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#5df3c2] mb-6 md:mb-10">
          Founding Member Bonuses
        </span>
        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
        >
          {clientBonuses.headline}
        </ScrollFloat>

        <div className="mt-8 grid gap-4 md:grid-cols-2 text-left">
          {clientBonuses.items.map((item, idx) => (
            <motion.div
              key={item.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: idx * 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-heading font-black text-white group-hover:text-[#5df3c2] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-2xl font-heading font-black text-[#5df3c2] tracking-tighter mb-2">{item.value}</p>
              <p className="text-sm text-white/70">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <p className="relative z-10 text-base md:text-xl font-heading font-black uppercase tracking-tighter">
            {clientBonuses.total}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
