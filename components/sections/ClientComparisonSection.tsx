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
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-6xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          The Honest Comparison
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {clientComparison.headline}
        </ScrollReveal>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-[#021f0d]/70 max-w-3xl mx-auto">
          {clientComparison.intro}
        </motion.p>

        <div className="mt-8 hidden md:block overflow-x-auto rounded-3xl border border-[#d4dce6]/60 bg-white shadow-xl text-left">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-[#021f0d] text-white">
              <tr>
                <th className="p-4 text-xs uppercase tracking-[0.25em] font-black">Category</th>
                {clientComparison.columns.map((col) => (
                  <th key={col} className="p-4 text-xs uppercase tracking-[0.18em] font-black">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientComparison.rows.map((row, idx) => (
                <tr key={row.label} className={`transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"} hover:bg-[#eefcf6]`}>
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

        <div className="mt-8 grid gap-4 md:hidden text-left">
          {clientComparison.columns.map((col, colIdx) => (
            <div key={col} className={`rounded-3xl border border-[#d4dce6]/60 shadow-xl p-5 ${colIdx === 0 ? "bg-[#021f0d] text-white" : "bg-white"}`}>
              <p className={`text-xs uppercase tracking-[0.25em] font-black mb-4 ${colIdx === 0 ? "text-[#5df3c2]" : "text-[#006c40]/70"}`}>
                {col}
              </p>
              <div className="grid gap-3">
                {clientComparison.rows.map((row) => (
                  <div key={`${col}-${row.label}`} className={`rounded-2xl border p-3 ${colIdx === 0 ? "border-white/10 bg-white/10" : "border-[#d4dce6]/60 bg-[#f9fafb]"}`}>
                    <p className={`text-[10px] uppercase tracking-[0.3em] font-black mb-1 ${colIdx === 0 ? "text-[#5df3c2]/80" : "text-[#006c40]/60"}`}>
                      {row.label}
                    </p>
                    <p className={`text-sm ${colIdx === 0 ? "text-white/80" : "text-[#021f0d]/70"}`}>{row.values[colIdx]}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
