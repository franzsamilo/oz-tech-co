"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientGuarantee } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientGuaranteeSection() {
  return (
    <section
      id="client-guarantee"
      className="px-6 md:px-10 py-5 md:py-8 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden oz-maze-overlay"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#5df3c2] mb-7 md:mb-11"
        >
          The 4-Week Guarantee
        </motion.div>
        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
        >
          {clientGuarantee.headline}
        </ScrollFloat>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-white/70 max-w-3xl mx-auto">
          {clientGuarantee.promise}
        </motion.p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 text-left">
          <motion.div {...cardMotion} className="rounded-3xl border border-white/10 p-5 bg-white/5 hover:bg-white/10 transition-all">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-[#5df3c2]/70 mb-3">
              You commit to
            </p>
            <ul className="grid gap-2 text-sm text-white/70">
              {clientGuarantee.youCommit.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#5df3c2] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...cardMotion} className="rounded-3xl border border-white/10 p-5 bg-white/5 hover:bg-white/10 transition-all">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-[#5df3c2]/70 mb-3">
              We commit to
            </p>
            <ul className="grid gap-2 text-sm text-white/70">
              {clientGuarantee.weCommit.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#5df3c2] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.p {...cardMotion} className="mt-6 text-xs uppercase tracking-[0.2em] text-white/50">
          {clientGuarantee.disclaimer}
        </motion.p>
        <motion.p {...cardMotion} className="mt-4 text-xs md:text-sm font-black uppercase tracking-[0.25em] text-red-500">
          Miss the deadline? Month 2 is free.
        </motion.p>
      </div>
    </section>
  );
}
