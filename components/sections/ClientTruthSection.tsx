"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientTruth } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientTruthSection() {
  return (
    <section
      id="client-truth"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden oz-maze-overlay"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#021f0d]/50 to-[#021f0d] z-0" />
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10"
        >
          <span className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2]">
            The Harsh Reality
          </span>
        </motion.div>

        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
        >
          {clientTruth.headline}
        </ScrollFloat>

        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg font-semibold text-white/80">
          {clientTruth.subhead}
        </motion.p>

        <motion.div {...cardMotion} className="mt-6 md:mt-10 p-4 md:p-8 rounded-3xl bg-white/5 border-2 border-red-500/20 shadow-lg inline-flex flex-col md:flex-row items-center gap-3 md:gap-8">
          <p className="text-sm md:text-lg font-bold text-white/60 italic">&quot;{clientTruth.math[clientTruth.math.length - 1]}&quot;</p>
          <div className="text-center md:text-right">
            <p className="text-2xl md:text-5xl font-heading font-black text-red-500">$33,500/yr</p>
            <p className="text-xs font-bold text-red-500/60 uppercase tracking-widest mt-1">Annual Capital Loss</p>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-10 grid md:grid-cols-2 gap-4 md:gap-8 text-left">
          <motion.div {...cardMotion} className="p-5 md:p-8 rounded-3xl bg-white/5 border border-red-500/20 shadow-2xl">
            <h3 className="text-lg md:text-2xl font-heading font-black text-red-500 uppercase tracking-tighter leading-none mb-4 md:mb-6">The Industry Wants You Stuck</h3>
            <div className="space-y-2 md:space-y-4">
              {clientTruth.bullets.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <p className="text-sm md:text-base font-medium text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-5 md:p-8 rounded-3xl bg-white/5 border-2 border-[#5df3c2]/20 shadow-2xl">
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

        <motion.p {...cardMotion} className="mt-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-widest text-white/40">
          Build assets, not subscriptions. Own your tools forever.
        </motion.p>
      </div>
    </section>
  );
}
