"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientAudience } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientAudienceSection() {
  return (
    <section
      id="client-audience"
      data-theme="dark"
      className="oz-section-secondary flex items-center justify-center bg-[#021f0d] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,243,194,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(239,252,95,0.12),transparent_32%)]" />
      <div className="max-w-[1200px] mx-auto w-full text-center px-5 sm:px-8 lg:px-12">
        <span className="oz-badge oz-badge-gold">
          The Visionary Builder
        </span>
        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientAudience.headline}
        </ScrollFloat>

        <motion.div
          {...cardMotion}
          className="mt-6 md:mt-8 max-w-4xl mx-auto oz-forest-card oz-gold-accent p-5 md:p-8"
        >
          <div className="h-1.5 w-full bg-linear-to-r from-[#006c40] via-[#5df3c2] to-[#effc5f] -mt-5 md:-mt-8 mb-5 md:mb-8 -mx-5 md:-mx-8 w-[calc(100%+2.5rem)] md:w-[calc(100%+4rem)]" />
          <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-white/70">
            You already see the opportunity
          </p>
          <p className="mt-3 text-sm md:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed font-medium">
            {clientAudience.intro}
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
          {clientAudience.situations.map((item, idx) => (
            <motion.div
              key={item.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: idx * 0.1 }}
              className="oz-forest-card oz-gold-accent p-5 md:p-8 transition-all group hover:-translate-y-1"
            >
              <span
                className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black mb-3 md:mb-4 text-xs md:text-sm shadow-sm bg-[#effc5f] text-[#021f0d]"
              >
                0{idx + 1}
              </span>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-2">
                Story Beat {idx + 1}
              </p>
              <h3
                className="text-base md:text-lg font-heading font-black mb-2 uppercase tracking-tighter transition-colors text-white"
              >
                {item.title}
              </h3>
              <p className="text-sm text-white/70 font-medium leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 max-w-4xl mx-auto oz-forest-card p-5 sm:p-6 md:p-8 border border-[#5df3c2]/30"
        >
          <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.28em] text-[#5df3c2]">
            The real takeaway
          </p>
          <p className="mt-3 text-base md:text-2xl font-heading font-black leading-tight text-white">
            You&apos;re not lacking the vision. You&apos;re lacking the right engineering partner.
          </p>
          <p className="mt-3 text-sm md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
            {clientAudience.close}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
