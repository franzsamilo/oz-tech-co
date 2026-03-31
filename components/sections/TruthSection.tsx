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
      data-theme="dark"
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-10"
        >
          <span className="oz-badge oz-badge-gold">
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
          {truthSection.bullets.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="oz-forest-card p-4 md:p-6 flex gap-4 items-center"
            >
              <span className="text-xl md:text-2xl font-black text-[#effc5f] leading-none shrink-0">0{i+1}</span>
              <span className="text-sm sm:text-base md:text-lg font-heading font-medium text-white/80">{b}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-8 oz-forest-card p-5 md:p-6 text-left"
        >
          <p className="text-base md:text-xl font-heading font-black italic leading-tight text-[#5df3c2]">
            {truthSection.truth}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
