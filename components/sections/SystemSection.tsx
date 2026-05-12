"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { systemSection } from "@/data/seedPageContent";

export default function SystemSection() {
  return (
    <section
      id="system"
      data-theme="dark"
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-7 md:mb-11"
        >
          <span className="oz-badge oz-badge-gold">
            The Execution Engine
          </span>
        </motion.div>

        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
        >
          {systemSection.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-4 md:gap-6 text-left">
          {systemSection.stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="oz-forest-card p-4 md:p-6 group"
            >
              <span className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-[#effc5f] text-[#021f0d] flex items-center justify-center text-sm md:text-xl font-black mb-3 md:mb-5 shadow-[0_0_20px_rgba(239,252,95,0.3)]">
                {i + 1}
              </span>
              <h3 className="text-base md:text-xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-[#5df3c2] transition-colors mb-2 md:mb-3">{stage.title}</h3>
              <div className="space-y-2">
                {stage.steps.map((step) => (
                  <p key={step.title} className="text-xs md:text-sm text-white/60 font-medium leading-relaxed">
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
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              From Concept to Deployment in <span className="underline decoration-4 underline-offset-8">4 Weeks</span>
            </p>
            <a href="#application" className="oz-btn-primary mt-5 md:mt-8 px-6 md:px-10 text-sm md:text-lg inline-flex">
              Request This Machine →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
