"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientHowItWorks } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientHowItWorksSection() {
  return (
    <section
      id="client-how"
      data-theme="light"
      className="oz-section-secondary bg-[#f9fafb] text-[#021f0d] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green">
          How It Works
        </span>
        <ScrollFloat
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95] px-1"
        >
          {clientHowItWorks.headline}
        </ScrollFloat>
        <motion.p {...riseVariant} className="mt-4 text-sm md:text-lg text-[#021f0d]/70 max-w-3xl mx-auto">
          {clientHowItWorks.summary}
        </motion.p>

        <div className="mt-6 grid gap-3 md:grid-cols-2 text-left">
          {clientHowItWorks.bullets.map((item, idx) => (
            <motion.div
              key={item}
              {...riseVariant}
              transition={{ ...riseVariant.transition, delay: idx * 0.08 }}
              className="oz-city-card oz-emerald-accent p-5 md:p-8 text-sm text-[#021f0d]/70 hover:bg-white transition-all group flex gap-4 items-center"
            >
              <span className="w-8 h-8 rounded-xl bg-[#effc5f] text-[#021f0d] flex items-center justify-center text-xs font-black">
                {idx + 1}
              </span>
              <span className="text-sm md:text-base font-medium leading-relaxed text-[#021f0d]/70">
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p {...riseVariant} className="mt-6 text-sm md:text-lg text-[#021f0d]/70">
          {clientHowItWorks.analogy}
        </motion.p>

        <motion.div
          {...riseVariant}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#effc5f]" />
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              Two Active Builds. Unlimited Queue. Ship Fast.
            </p>
            <a href="#application" className="oz-btn-primary mt-5 md:mt-8 px-6 md:px-10 text-sm md:text-lg inline-flex min-h-11 items-center justify-center touch-manipulation w-full max-w-md mx-auto sm:w-auto">
              Request This Machine →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
