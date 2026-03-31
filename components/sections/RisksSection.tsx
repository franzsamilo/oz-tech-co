"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import { risks } from "@/data/seedPageContent";

export default function RisksSection() {
  return (
    <section
      id="risks"
      data-theme="dark"
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-4 md:mb-6"
        >
          <span className="oz-badge oz-badge-gold">
            Radical Transparency
          </span>
        </motion.div>
        <ScrollFloat className="text-white text-center" textSize="text-3xl sm:text-5xl md:text-5xl font-heading font-black tracking-tighter uppercase leading-none">
          The Risk Realities
        </ScrollFloat>

        <div className="mt-5 md:mt-8 grid md:grid-cols-2 gap-3 md:gap-4 text-left">
          {(risks as any[]).map((risk, i) => (
            <motion.div
              key={risk.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="oz-forest-card p-3 md:p-5"
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
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.25em] text-[#effc5f] mb-2">Safeguard</p>
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

        <div className="mt-8 md:mt-12">
          <a href="#investment" className="oz-scroll-cue inline-flex">
            <ChevronDown size={24} strokeWidth={2} className="text-[#5df3c2]/40 animate-bounce" />
          </a>
          <p className="mt-2 text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-[0.25em]">See the terms</p>
        </div>
      </div>
    </section>
  );
}
