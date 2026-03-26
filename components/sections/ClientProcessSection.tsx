"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientProcess } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientProcessSection() {
  return (
    <section
      id="client-process"
      className="px-4 sm:px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-white"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          What Happens Next
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientProcess.headline}
        </ScrollReveal>

        <div className="mt-8 grid gap-3 text-left">
          {clientProcess.steps.map((step, idx) => (
            <motion.div
              key={step}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: idx * 0.05 }}
              className="rounded-3xl border-2 border-[#021f0d]/5 p-4 md:p-5 bg-white text-sm text-[#021f0d]/70 shadow-lg hover:border-[#006c40]/20 transition-all flex items-center gap-4"
            >
              <span className="w-9 h-9 rounded-xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-xs font-black shadow-[0_0_20px_rgba(93,243,192,0.3)]">
                {idx + 1}
              </span>
              <span className="text-sm md:text-base font-medium">{step}</span>
            </motion.div>
          ))}
        </div>

        <motion.p {...cardMotion} className="mt-6 text-sm md:text-lg text-[#021f0d]/70">
          {clientProcess.timeline}
        </motion.p>

        <motion.div
          {...cardMotion}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xl md:text-2xl font-heading font-black uppercase tracking-tighter">
              Meet the Engineers Behind the Machine.
            </p>
            <a
              href="/team"
              className="oz-btn-secondary inline-flex min-h-11 items-center justify-center text-sm md:text-base touch-manipulation w-full sm:w-auto shrink-0"
            >
              Meet the Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
