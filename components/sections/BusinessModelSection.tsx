"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { businessModel } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function BusinessModelSection() {
  return (
    <section
      id="model"
      className="px-6 md:px-10 py-10 md:py-14 section-viewport flex items-center justify-center bg-[#021f0d] text-white overflow-hidden relative"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <ScrollFloat className="text-white text-center" textSize="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-none uppercase">
          {businessModel.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-4 md:gap-6">
          <motion.div {...cardMotion} className="p-5 md:p-7 rounded-3xl bg-white/5 border border-white/10 text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2] mb-4">Current MRR</p>
            <p className="text-3xl md:text-4xl font-heading font-black tracking-tighter">$17,500</p>
            <p className="text-xs md:text-sm text-white/50 font-bold mt-2">5 Founding Members · $3,500/mo each</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-5 md:p-7 rounded-3xl bg-white text-[#021f0d] shadow-2xl text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006c40] mb-4">Client Lifetime Value</p>
            <p className="text-3xl md:text-4xl font-heading font-black text-[#006c40] tracking-tighter">$63K–$81K</p>
            <p className="text-xs md:text-sm text-[#021f0d]/50 font-bold mt-2">18+ month avg tenure</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }} className="p-5 md:p-7 rounded-3xl bg-linear-to-br from-[#021f0d] to-[#006c40] border border-white/10 text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2] mb-4">Capacity</p>
            <p className="text-3xl md:text-4xl font-heading font-black tracking-tighter">30 Clients</p>
            <p className="text-xs md:text-sm text-white/50 font-bold mt-2">10-person team · Scalable system</p>
          </motion.div>
        </div>

        <motion.div {...cardMotion} className="mt-8 p-5 md:p-8 rounded-3xl md:rounded-[44px] bg-white text-[#021f0d] shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-heading font-black text-center mb-6 md:mb-8 uppercase tracking-tighter">Growth Trajectory</h3>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {businessModel.projection.map((proj) => {
              const [month, rest] = proj.split(':');
              return (
                <div key={proj} className="text-center">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#006c40]/40 mb-2">{month}</p>
                  <p className="text-2xl md:text-3xl font-heading font-black text-[#021f0d] tracking-tighter">{rest?.trim()}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <p className="mt-5 md:mt-8 text-xs md:text-lg text-white/40 font-bold uppercase tracking-[0.2em] md:tracking-widest">
          Strategic Exit (5-7 Yr) · Acquisition or Direct Secondary
        </p>
      </div>
    </section>
  );
}
