"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientFoundingMember } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientFoundingMemberSection() {
  return (
    <section
      id="client-founding"
      className="px-4 sm:px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          Founding Member Offer
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientFoundingMember.headline}
        </ScrollReveal>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-[#021f0d]/70 max-w-3xl mx-auto">
          {clientFoundingMember.summary}
        </motion.p>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 bg-[#021f0d] text-white p-5 md:p-8 rounded-3xl md:rounded-[48px] shadow-2xl relative overflow-hidden oz-emerald-card text-left"
        >
          <div className="absolute top-0 right-0 p-6 md:p-12 text-[12vw] font-black opacity-5 select-none leading-none">FOUNDING</div>
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
          {...cardMotion}
          className="mt-6 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <div className="relative z-10 text-center">
            <p className="text-base md:text-xl font-heading font-black uppercase tracking-tighter">
              {clientFoundingMember.status}
            </p>
          </div>
        </motion.div>

        <motion.p {...cardMotion} className="mt-6 text-xs md:text-sm font-bold uppercase tracking-[0.2em] md:tracking-widest text-[#021f0d]/40">
          5 spots only. Lock the rate for life.
        </motion.p>
      </div>
    </section>
  );
}
