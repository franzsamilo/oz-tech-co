"use client";

import { motion } from "framer-motion";
import StatCounter from "@/components/StatCounter";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function SocialProofSection() {
  return (
    <section
      id="proof-bento"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div {...cardMotion} className="mb-8">
          <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-5 py-2 text-xs font-black uppercase tracking-[0.28em] md:tracking-[0.4em] text-[#006c40]">
            Historical Performance
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <motion.div {...cardMotion} className="p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[36px] bg-white border-2 border-[#021f0d]/5 shadow-xl">
            <div className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-[#021f0d] tracking-tighter leading-none">
              <StatCounter value={100} suffix="+" />
            </div>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mt-3 md:mt-4">Projects Delivered</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[36px] bg-[#021f0d] text-white shadow-2xl oz-emerald-card">
            <div className="text-4xl sm:text-5xl md:text-7xl font-heading font-black tracking-tighter leading-none">
              <StatCounter value={100} suffix="M+" className="text-white" />
            </div>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#5df3c2] mt-3 md:mt-4">Revenue Generated</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }} className="p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[36px] bg-red-500 text-white shadow-[0_20px_50px_-10px_rgba(239,68,68,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-400 opacity-50" />
            <div className="relative z-10">
              <p className="text-4xl sm:text-5xl md:text-7xl font-heading font-black tracking-tighter leading-none uppercase">Zero</p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.3em] text-white/80 mt-3 md:mt-4">Missed Deadlines</p>
            </div>
          </motion.div>
        </div>

        <motion.p {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.3 }} className="mt-8 md:mt-10 text-sm md:text-lg text-[#021f0d]/50 font-bold uppercase tracking-[0.18em] md:tracking-widest">
          98.4% Client Satisfaction · 18+ Month Avg Tenure
        </motion.p>
      </div>
    </section>
  );
}
