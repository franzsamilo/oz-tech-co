"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { truthSection } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function TruthSection() {
  return (
    <section
      id="truth"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden oz-maze-overlay"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#021f0d]/50 to-[#021f0d] z-0" />
      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
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
          textClassName="text-white leading-[0.95] tracking-tighter text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black"
        >
          {truthSection.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid sm:grid-cols-2 gap-4 md:gap-6 text-left">
          {truthSection.bullets.slice(0, 2).map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-4 md:p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex gap-4 items-center"
            >
              <span className="text-xl md:text-2xl font-black text-[#5df3c2]/40 group-hover:text-[#5df3c2] transition-colors leading-none shrink-0">0{i+1}</span>
              <span className="text-sm sm:text-base md:text-lg font-heading font-medium text-white/80">{b}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-8 p-5 md:p-6 rounded-3xl bg-white/10 border border-white/20 text-left"
        >
          <p className="text-base md:text-xl font-heading font-black italic leading-tight text-[#5df3c2]">
            {truthSection.truth}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
