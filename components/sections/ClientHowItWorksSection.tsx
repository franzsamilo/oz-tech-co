"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientHowItWorks } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientHowItWorksSection() {
  return (
    <section
      id="client-how"
      className="px-4 sm:px-6 md:px-10 py-10 md:py-14 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#5df3c2] mb-6 md:mb-10">
          How It Works
        </span>
        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95] px-1"
        >
          {clientHowItWorks.headline}
        </ScrollFloat>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-white/70 max-w-3xl mx-auto">
          {clientHowItWorks.summary}
        </motion.p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 text-left">
          {clientHowItWorks.bullets.map((item, idx) => (
            <motion.div
              key={item}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: idx * 0.05 }}
              className="rounded-3xl border border-white/10 p-4 md:p-6 bg-white/5 text-sm text-white/70 hover:bg-white/10 transition-all group flex gap-4 items-center"
            >
              <span className="w-8 h-8 rounded-xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-xs font-black shadow-[0_0_20px_rgba(93,243,192,0.3)]">
                {idx + 1}
              </span>
              <span className="text-sm md:text-base font-medium leading-relaxed text-white/80">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p {...cardMotion} className="mt-6 text-sm md:text-lg text-white/70">
          {clientHowItWorks.analogy}
        </motion.p>

        <motion.div
          {...cardMotion}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              Two Active Builds. Unlimited Queue. Ship Fast.
            </p>
            <a href="#application" className="oz-btn-secondary mt-5 md:mt-8 px-6 md:px-10 text-sm md:text-lg inline-flex min-h-11 items-center justify-center touch-manipulation w-full max-w-md mx-auto sm:w-auto">
              Request This Machine
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
