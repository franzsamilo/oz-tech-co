"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { risks } from "@/data/seedPageContent";

export default function RisksSection() {
  return (
    <section
      id="risks"
      className="px-6 md:px-10 py-6 md:py-8 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#5df3c2] font-black uppercase tracking-[0.2em] md:tracking-[0.35em] text-[9px] md:text-[10px] mb-4 md:mb-6"
        >
          Radical Transparency
        </motion.div>
        <ScrollFloat className="text-white text-center" textSize="text-3xl sm:text-5xl md:text-5xl font-heading font-black tracking-tighter uppercase leading-none">
          The Risk Realities
        </ScrollFloat>

        <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-3 md:gap-4 text-left">
          {(risks as any[]).map((risk, i) => (
            <motion.div
              key={risk.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-3 md:p-5 rounded-3xl md:rounded-[36px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <h3 className="text-sm md:text-lg font-heading font-black text-[#5df3c2] mb-2 md:mb-3 uppercase tracking-tighter">
                {risk.category}
              </h3>
              <ul className="space-y-1.5 mb-3 md:mb-4">
                {risk.items.map((item: string) => (
                  <li key={item} className="text-xs md:text-sm text-white/70 flex gap-2 leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5 text-[10px]">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-white/10">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#5df3c2] mb-2">Safeguard</p>
                <ul className="space-y-1">
                  {risk.mitigation.map((m: string) => (
                    <li key={m} className="text-xs md:text-sm text-white font-bold flex gap-2">
                      <span className="text-[#5df3c2]">✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
