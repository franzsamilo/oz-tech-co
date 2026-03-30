"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientFit } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientFitSection() {
  return (
    <section
      id="client-fit"
      data-theme="light"
      className="oz-section-secondary py-8 md:py-10 flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="oz-container max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green">
          Fit & Values
        </span>
        <ScrollFloat
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientFit.headline}
        </ScrollFloat>

        <div className="mt-8 grid gap-4 md:grid-cols-2 text-left">
          <motion.div {...cardMotion} className="oz-city-card oz-emerald-accent rounded-3xl p-5 shadow-xl">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-[#006c40]/60 mb-3">
              Good fit
            </p>
            <ul className="grid gap-2 text-sm text-[#021f0d]/70">
              {clientFit.goodFit.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#5df3c2] font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...cardMotion} className="oz-red-accent rounded-3xl border border-white/10 p-5 bg-[#021f0d] text-white shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] font-black text-red-500 mb-3">
              Not a fit
            </p>
            <ul className="grid gap-2 text-sm text-white/70">
              {clientFit.notFit.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div {...cardMotion} className="mt-6 oz-city-card oz-emerald-accent rounded-3xl p-5 shadow-xl text-left">
          <p className="text-xs uppercase tracking-[0.3em] font-black text-[#006c40]/60 mb-3">
            Values (non-negotiable)
          </p>
          <div className="flex flex-wrap gap-3">
            {clientFit.values.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full bg-transparent border border-[#021f0d]/20 text-[#021f0d] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
