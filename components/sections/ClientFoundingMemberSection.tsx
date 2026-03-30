"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientFoundingMember } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientFoundingMemberSection() {
  return (
    <section
      id="client-founding"
      data-theme="dark"
      className="oz-section-secondary py-8 md:py-10 flex items-center justify-center bg-[#021f0d]"
    >
      <div className="oz-container max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-gold">
          Founding Member Offer
        </span>
        <ScrollReveal
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientFoundingMember.headline}
        </ScrollReveal>
        <motion.p {...riseVariant} className="mt-4 text-sm md:text-lg text-white/70 max-w-3xl mx-auto">
          {clientFoundingMember.summary}
        </motion.p>

        <motion.div
          {...riseVariant}
          className="mt-8 md:mt-10 oz-forest-card text-white p-5 md:p-8 rounded-3xl md:rounded-[48px] shadow-2xl relative overflow-hidden text-left"
          style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
        >
          <div className="absolute top-0 right-0 p-6 md:p-12 text-[12vw] font-black text-[#effc5f]/[0.03] select-none leading-none">FOUNDING</div>
          <div className="relative z-10 grid md:grid-cols-2 gap-4 md:gap-8">
            <div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.35em] text-[#5df3c2] mb-3 md:mb-5">
                We want to work with
              </p>
              <ul className="grid gap-2 text-sm md:text-base text-white/70">
                {clientFoundingMember.who.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#5df3c2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.35em] text-[#5df3c2] mb-3 md:mb-5">
                In exchange, you get
              </p>
              <ul className="grid gap-2 text-sm md:text-base text-white/70">
                {clientFoundingMember.perks.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#5df3c2] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...riseVariant}
          className="mt-6 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 text-center">
            <p className="text-base md:text-xl font-heading font-black uppercase tracking-tighter">
              {clientFoundingMember.status}
            </p>
          </div>
        </motion.div>

        <motion.p {...riseVariant} className="mt-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-widest text-white/40">
          5 spots only. Lock the rate for life.
        </motion.p>
      </div>
    </section>
  );
}
