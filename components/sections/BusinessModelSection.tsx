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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#021f0d] text-white overflow-hidden relative"
    >
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <ScrollFloat className="text-white text-center" textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
          {businessModel.headline}
        </ScrollFloat>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <motion.div {...cardMotion} className="p-8 md:p-10 rounded-[40px] bg-white/5 border border-white/10 text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2] mb-4">Current MRR</p>
            <p className="text-4xl md:text-5xl font-heading font-black tracking-tighter">$17,500</p>
            <p className="text-sm text-white/50 font-bold mt-2">5 Founding Members · $3,500/mo each</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.1 }} className="p-8 md:p-10 rounded-[40px] bg-white text-[#021f0d] shadow-2xl text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#006c40] mb-4">Client Lifetime Value</p>
            <p className="text-4xl md:text-5xl font-heading font-black text-[#006c40] tracking-tighter">$63K–$81K</p>
            <p className="text-sm text-[#021f0d]/50 font-bold mt-2">18+ month avg tenure</p>
          </motion.div>

          <motion.div {...cardMotion} transition={{ ...cardMotion.transition, delay: 0.2 }} className="p-8 md:p-10 rounded-[40px] bg-linear-to-br from-[#021f0d] to-[#006c40] border border-white/10 text-left">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2] mb-4">Capacity</p>
            <p className="text-4xl md:text-5xl font-heading font-black tracking-tighter">30 Clients</p>
            <p className="text-sm text-white/50 font-bold mt-2">10-person team · Scalable system</p>
          </motion.div>
        </div>

        <motion.div {...cardMotion} className="mt-12 p-10 md:p-16 rounded-[48px] bg-white text-[#021f0d] shadow-2xl">
          <h3 className="text-3xl md:text-4xl font-heading font-black text-center mb-12 uppercase tracking-tighter">Growth Trajectory</h3>
          <div className="grid md:grid-cols-3 gap-12">
            {businessModel.projection.map((proj) => {
              const [month, rest] = proj.split(':');
              return (
                <div key={proj} className="text-center">
                  <p className="text-xs font-black uppercase tracking-[0.4em] text-[#006c40]/40 mb-3">{month}</p>
                  <p className="text-3xl md:text-4xl font-heading font-black text-[#021f0d] tracking-tighter">{rest?.trim()}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <p className="mt-8 text-lg text-white/40 font-bold uppercase tracking-widest">
          Strategic Exit (5-7 Yr) · Acquisition or Direct Secondary
        </p>
      </div>
    </section>
  );
}
