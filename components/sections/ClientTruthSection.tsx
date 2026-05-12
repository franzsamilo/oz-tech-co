"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientTruth } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientTruthSection() {
  return (
    <section
      id="client-truth"
      data-theme="dark"
      className="oz-section-secondary flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#021f0d]/50 to-[#021f0d] z-0" />
      <div className="relative z-10 max-w-[1200px] mx-auto w-full text-center px-5 sm:px-8 lg:px-12">
        <motion.div
          {...riseVariant}
          className="mb-6 md:mb-10"
        >
          <span className="oz-badge oz-badge-gold">
            The Harsh Reality
          </span>
        </motion.div>

        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95] px-1"
        >
          {clientTruth.headline}
        </ScrollFloat>

        <motion.p {...riseVariant} className="mt-4 text-sm md:text-lg font-semibold text-white/70">
          {clientTruth.subhead}
        </motion.p>

        <motion.div {...riseVariant} className="mt-6 md:mt-10 p-4 md:p-8 rounded-3xl bg-white/5 border-2 border-[#fe5858]/20 shadow-lg inline-flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <p className="text-sm md:text-lg font-bold text-white/60 italic">&quot;{clientTruth.math[clientTruth.math.length - 1]}&quot;</p>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-5xl font-heading font-black font-mono text-[#fe5858]">$33,500/yr</p>
            <p className="text-xs font-bold text-[#fe5858]/60 uppercase tracking-widest mt-1">Annual Capital Loss</p>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-4 md:gap-8 text-left">
          <motion.div {...riseVariant} className="oz-forest-card p-5 md:p-8" style={{ boxShadow: 'inset 0 0 40px rgba(254,88,88,0.06)' }}>
            <h3 className="text-lg md:text-2xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-4 md:mb-6 flex items-center gap-3">
              <span className="inline-flex w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#fe5858]/20 text-[#fe5858] items-center justify-center text-sm md:text-base shrink-0">!</span>
              The Industry Wants You Stuck
            </h3>
            <div className="space-y-2 md:space-y-4">
              {clientTruth.bullets.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-[#fe5858]/20 text-[#fe5858] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <p className="text-sm md:text-base font-medium text-white/70">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...riseVariant} transition={{ ...riseVariant.transition, delay: 0.08 }} className="oz-forest-card oz-emerald-accent p-5 md:p-8">
            <h3 className="text-lg md:text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-tighter leading-none mb-4 md:mb-6">Our Approach</h3>
            <div className="space-y-2 md:space-y-4">
              <div className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <p className="text-sm md:text-base font-black text-[#5df3c2]">One flat fee, unlimited projects</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <p className="text-sm md:text-base font-black text-[#5df3c2]">Full code ownership from day one</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <p className="text-sm md:text-base font-black text-[#5df3c2]">Dedicated team, not a freelancer</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <p className="text-sm md:text-base font-black text-[#5df3c2]">4-week launch guarantee</p>
              </div>
            </div>
            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-2xl bg-[#021f0d] border-2 border-[#5df3c2]/20">
              <p className="text-[11px] md:text-sm font-bold text-[#5df3c2] italic uppercase tracking-wide">{clientTruth.truth}</p>
            </div>
          </motion.div>
        </div>

        <motion.p {...riseVariant} className="mt-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-widest text-white/65">
          Build assets, not subscriptions. Own your tools forever.
        </motion.p>
      </div>
    </section>
  );
}
