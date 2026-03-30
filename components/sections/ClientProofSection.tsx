"use client";

import { motion } from "framer-motion";
import StatCounter from "@/components/StatCounter";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientProofSection() {
  return (
    <section
      id="client-proof"
      data-theme="light"
      className="oz-section-secondary bg-[#f9fafb]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div {...cardMotion} className="mb-8">
          <span className="oz-badge oz-badge-green">
            Historical Performance
          </span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tighter uppercase text-[#021f0d] leading-[0.95] mb-8 md:mb-10">
          The Numbers Don&apos;t Lie
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 items-end">
          <motion.div {...cardMotion} className="oz-city-card p-4 sm:p-6 md:p-8 mt-5 md:mt-8">
            <div className="text-4xl sm:text-5xl md:text-7xl font-heading font-black font-mono text-[#021f0d] tracking-tighter leading-none">
              <StatCounter value={100} suffix="+" />
            </div>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mt-3 md:mt-4">Projects Delivered</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="oz-emerald-card oz-glow-strong p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[36px] bg-[#021f0d] text-white shadow-2xl">
            <div className="text-4xl sm:text-5xl md:text-7xl font-heading font-black font-mono tracking-tighter leading-none">
              <StatCounter value={100} suffix="M+" className="text-white" />
            </div>
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#5df3c2] mt-3 md:mt-4">Revenue Generated</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }} className="p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[36px] bg-red-500 text-white shadow-lg relative overflow-hidden mt-5 md:mt-8">
            <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-400 opacity-30" />
            <div className="relative z-10">
              <p className="text-4xl sm:text-5xl md:text-7xl font-heading font-black font-mono tracking-tighter leading-none uppercase">Zero</p>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.18em] md:tracking-[0.3em] text-white/80 mt-3 md:mt-4">Missed Deadlines</p>
            </div>
          </motion.div>
        </div>

        <motion.p {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.3 }} className="mt-8 md:mt-10 text-sm md:text-lg text-[#021f0d]/50 font-bold uppercase tracking-[0.18em] md:tracking-widest">
          98.4% Client Satisfaction · 18+ Month Avg Tenure · Gold SaaS Award Winner
        </motion.p>
      </div>
    </section>
  );
}
