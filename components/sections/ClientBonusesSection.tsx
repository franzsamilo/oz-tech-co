"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientBonuses } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientBonusesSection() {
  return (
    <section
      id="client-bonuses"
      data-theme="dark"
      className="oz-section-secondary py-8 md:py-10 flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="oz-container max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 w-full text-center">
        <span className="oz-badge oz-badge-gold">
          Founding Member Bonuses
        </span>
        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95] px-1"
        >
          {clientBonuses.headline}
        </ScrollFloat>

        <div className="mt-8 grid gap-4 md:grid-cols-2 text-left">
          {clientBonuses.items.map((item, idx) => (
            <motion.div
              key={item.title}
              {...riseVariant}
              transition={{ ...riseVariant.transition, delay: idx * 0.08 }}
              className="oz-forest-card rounded-3xl border-t-2 border-[#effc5f] p-5 shadow-2xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-xl bg-[#effc5f] text-[#021f0d] flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-heading font-black text-white group-hover:text-[#effc5f] transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-2xl font-heading font-black text-[#effc5f] tracking-tighter mb-2">{item.value}</p>
              <p className="text-sm text-white/70">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...riseVariant}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
          style={{ boxShadow: '0 0 24px rgba(239,252,95,0.2)' }}
        >
          <p className="relative z-10 text-base md:text-xl font-heading font-black uppercase tracking-tighter">
            {clientBonuses.total}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
