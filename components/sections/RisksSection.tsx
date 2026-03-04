"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { risks } from "@/data/seedPageContent";

export default function RisksSection() {
  return (
    <section
      id="risks"
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#5df3c2] font-black uppercase tracking-[0.5em] text-xs mb-12"
        >
          Radical Transparency
        </motion.div>
        <ScrollFloat className="text-white text-center" textSize="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none">
          The Risk Realities
        </ScrollFloat>

        <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
          {(risks as any[]).map((risk, i) => (
            <motion.div
              key={risk.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <h3 className="text-xl font-heading font-black text-[#5df3c2] mb-6 uppercase tracking-tighter">
                {risk.category}
              </h3>
              <ul className="space-y-3 mb-8">
                {risk.items.map((item: string) => (
                  <li key={item} className="text-base text-white/70 flex gap-3 leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5 text-[10px]">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5df3c2] mb-3">Safeguard</p>
                <ul className="space-y-2">
                  {risk.mitigation.map((m: string) => (
                    <li key={m} className="text-sm text-white font-bold flex gap-2">
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
