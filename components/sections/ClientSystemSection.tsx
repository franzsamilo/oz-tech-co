"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientSystem } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientSystemSection() {
  return (
    <section
      id="client-system"
      className="px-4 sm:px-6 md:px-10 py-10 md:py-14 section-viewport flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#5df3c2] mb-7 md:mb-11"
        >
          The Execution Engine
        </motion.div>

        <ScrollFloat
          textClassName="text-white text-center"
          textSize="text-2xl sm:text-5xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase leading-[0.95] px-1"
        >
          {clientSystem.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid md:grid-cols-3 gap-4 md:gap-6 text-left">
          {clientSystem.stages.map((stage, stageIdx) => (
            <motion.div
              key={stage.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: stageIdx * 0.1 }}
              className="p-4 md:p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#5df3c2]/30 transition-all group"
            >
              <span className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-sm md:text-xl font-black mb-3 md:mb-5 shadow-[0_0_20px_rgba(93,243,192,0.3)]">
                {stageIdx + 1}
              </span>
              <h3 className="text-base md:text-xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-[#5df3c2] transition-colors mb-2 md:mb-3">
                {stage.title}
              </h3>
              <div className="space-y-2">
                {stage.steps.map((step) => (
                  <p key={step.title} className="text-xs md:text-sm text-white/60 font-medium leading-relaxed">
                    <span className="text-[#5df3c2] font-bold">{step.title.replace(/Step \d+: /, "")}</span> —{" "}
                    {step.detail.split(".")[0]}.
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
          <div className="absolute inset-0 oz-maze-overlay opacity-20" />
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              Vision to Launch in 4 Weeks. Then We Scale It.
            </p>
            <a href="#application" className="oz-btn-secondary mt-5 md:mt-8 px-6 md:px-10 text-sm md:text-lg inline-flex min-h-11 items-center justify-center touch-manipulation w-full max-w-md mx-auto sm:w-auto">
              Start the Build Cycle
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
