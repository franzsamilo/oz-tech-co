"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { ArrowRight } from "lucide-react";
import { systemSection } from "@/data/seedPageContent";

export default function SystemSection() {
  return (
    <section
      id="system"
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-12"
        >
          The Execution Engine
        </motion.div>

        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
        >
          {systemSection.headline}
        </ScrollFloat>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {systemSection.stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 md:p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#5df3c2]/30 transition-all group"
            >
              <span className="w-12 h-12 rounded-xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-xl font-black mb-6 shadow-[0_0_20px_rgba(93,243,192,0.3)]">
                {i + 1}
              </span>
              <h3 className="text-2xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-[#5df3c2] transition-colors mb-4">{stage.title}</h3>
              <div className="space-y-3">
                {stage.steps.map((step) => (
                  <p key={step.title} className="text-base text-white/60 font-medium leading-relaxed">
                    <span className="text-[#5df3c2] font-bold">{step.title.replace(/Step \d+: /, '')}</span> — {step.detail.split('.')[0]}.
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-10 md:p-16 rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <div className="relative z-10">
            <p className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter uppercase leading-none">
              From Concept to Deployment in <span className="underline decoration-4 underline-offset-8">4 Weeks</span>
            </p>
            <a href="#application" className="oz-btn-secondary mt-10 px-12 text-lg inline-flex">
              Request This Machine
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
