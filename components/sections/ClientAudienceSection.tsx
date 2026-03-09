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

const situationStyles = [
  {
    card: "bg-linear-to-br from-[#ecfdf5] via-white to-[#f0fdf4] border-[#5df3c2]/30",
    number: "bg-[#5df3c2] text-[#006c40]",
    title: "text-[#006c40]",
  },
  {
    card: "bg-linear-to-br from-[#fffbeb] via-white to-[#fff7d6] border-amber-300/40",
    number: "bg-amber-200 text-amber-900",
    title: "text-amber-900",
  },
  {
    card: "bg-linear-to-br from-[#fef2f2] via-white to-[#fff1f2] border-red-300/40",
    number: "bg-red-200 text-red-700",
    title: "text-red-700",
  },
];

export default function ClientAudienceSection() {
  return (
    <section
      id="client-audience"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,243,194,0.12),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(239,252,95,0.12),transparent_32%)]" />
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          The Visionary Builder
        </span>
        <ScrollFloat
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {clientAudience.headline}
        </ScrollFloat>

        <motion.div
          {...cardMotion}
          className="mt-6 md:mt-8 max-w-4xl mx-auto rounded-[32px] border border-[#006c40]/10 bg-white/85 backdrop-blur-sm shadow-xl overflow-hidden"
        >
          <div className="h-1.5 w-full bg-linear-to-r from-[#006c40] via-[#5df3c2] to-[#effc5f]" />
          <div className="p-5 md:p-8">
            <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.25em] text-[#006c40]/70">
              You already see the opportunity
            </p>
            <p className="mt-3 text-sm md:text-lg text-[#021f0d]/75 max-w-3xl mx-auto leading-relaxed font-medium">
              {clientAudience.intro}
            </p>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
          {clientAudience.situations.map((item, idx) => (
            <motion.div
              key={item.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: idx * 0.1 }}
              className={`rounded-3xl md:rounded-[38px] border-2 shadow-xl p-5 md:p-6 transition-all group hover:-translate-y-1 ${situationStyles[idx]?.card ?? "bg-white border-[#021f0d]/5"}`}
            >
              <span
                className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black mb-3 md:mb-4 text-xs md:text-sm shadow-sm ${situationStyles[idx]?.number ?? "bg-[#5df3c2]/20 text-[#006c40]"}`}
              >
                0{idx + 1}
              </span>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#021f0d]/45 mb-2">
                Story Beat {idx + 1}
              </p>
              <h3
                className={`text-base md:text-lg font-heading font-black mb-2 uppercase tracking-tighter transition-colors ${situationStyles[idx]?.title ?? "text-[#021f0d]"}`}
              >
                {item.title}
              </h3>
              <p className="text-sm text-[#021f0d]/70 font-medium leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 max-w-4xl mx-auto rounded-[32px] bg-[#021f0d] text-white p-6 md:p-8 shadow-2xl oz-emerald-card"
        >
          <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.28em] text-[#5df3c2]">
            The real takeaway
          </p>
          <p className="mt-3 text-base md:text-2xl font-heading font-black leading-tight">
            You&apos;re not lacking the vision. You&apos;re lacking the right engineering partner.
          </p>
          <p className="mt-3 text-sm md:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed font-medium">
            {clientAudience.close}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
