"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientProcess } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientProcessSection() {
  return (
    <section
      id="client-process"
      data-theme="light"
      className="oz-section-secondary bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green">
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
              {...riseVariant}
              transition={{ ...riseVariant.transition, delay: idx * 0.08 }}
              className="rounded-3xl border-2 border-[#021f0d]/5 p-4 md:p-5 bg-white text-sm text-[#021f0d]/70 shadow-lg hover:border-[#006c40]/20 transition-all flex items-start gap-4 text-left"
            >
              <span className="w-9 h-9 rounded-xl bg-[#effc5f] text-[#021f0d] flex items-center justify-center text-xs font-black shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm md:text-base font-medium">{step}</span>
            </motion.div>
          ))}
        </div>

        <motion.p {...riseVariant} className="mt-6 text-sm md:text-lg text-[#021f0d]/70">
          {clientProcess.timeline}
        </motion.p>

        <motion.div
          {...riseVariant}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden"
        >
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
          <div className="absolute top-4 right-6 w-16 h-1 bg-[#effc5f] rounded-full opacity-60" />
        </motion.div>
      </div>
    </section>
  );
}
