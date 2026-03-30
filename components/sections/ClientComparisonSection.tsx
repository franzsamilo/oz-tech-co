"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientComparison } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientComparisonSection() {
  return (
    <section
      id="client-comparison"
      data-theme="light"
      className="oz-section-secondary py-8 md:py-10 flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="oz-container max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green">
          The Honest Comparison
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          {clientComparison.headline}
        </ScrollReveal>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-[#021f0d]/70 max-w-3xl mx-auto">
          {clientComparison.intro}
        </motion.p>

        <div className="mt-8 hidden md:block overflow-x-auto rounded-3xl border border-[#d4dce6]/60 bg-white shadow-xl text-left">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-[#006c40] to-[#021f0d] text-white">
              <tr>
                <th className="p-4 text-xs uppercase tracking-[0.25em] font-black">Category</th>
                {clientComparison.columns.map((col, colIdx) => (
                  <th key={col} className={`p-4 text-xs uppercase tracking-[0.18em] font-black ${colIdx === 0 ? "bg-[#effc5f]/10" : ""}`}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientComparison.rows.map((row, idx) => (
                <tr key={row.label} className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-[#5df3c2]/5`}>
                  <td className="p-4 font-semibold text-[#021f0d]">{row.label}</td>
                  {row.values.map((value, vIdx) => (
                    <td
                      key={`${row.label}-${vIdx}`}
                      className={`p-4 text-[#021f0d]/70 ${vIdx === 0 ? "bg-[#021f0d] text-white font-semibold" : ""}`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 md:hidden w-full text-left">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#021f0d]/45 mb-3">
            Swipe to compare each option
          </p>
          <div
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 -mx-1 px-1 [scrollbar-width:thin] touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {clientComparison.columns.map((col, colIdx) => (
              <div
                key={col}
                className={`min-w-[min(100%,18rem)] w-[85vw] max-w-sm shrink-0 snap-center rounded-3xl border border-[#d4dce6]/60 shadow-xl p-4 sm:p-5 ${
                  colIdx === 0 ? "bg-[#021f0d] text-white" : "bg-white"
                }`}
              >
                <p
                  className={`text-[11px] sm:text-xs uppercase tracking-[0.2em] font-black mb-3 line-clamp-2 ${
                    colIdx === 0 ? "text-[#5df3c2]" : "text-[#006c40]/70"
                  }`}
                >
                  {col}
                </p>
                <div className="grid gap-2.5 max-h-[55vh] overflow-y-auto [scrollbar-width:thin] pr-1">
                  {clientComparison.rows.map((row) => (
                    <div
                      key={`${col}-${row.label}`}
                      className={`rounded-2xl border p-3 ${
                        colIdx === 0 ? "border-white/10 bg-white/10" : "border-[#d4dce6]/60 bg-[#f9fafb]"
                      }`}
                    >
                      <p
                        className={`text-[10px] uppercase tracking-[0.25em] font-black mb-1 ${
                          colIdx === 0 ? "text-[#5df3c2]/80" : "text-[#006c40]/60"
                        }`}
                      >
                        {row.label}
                      </p>
                      <p className={`text-sm leading-snug ${colIdx === 0 ? "text-white/85" : "text-[#021f0d]/75"}`}>
                        {row.values[colIdx]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
