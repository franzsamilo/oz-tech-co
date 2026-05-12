"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { clientSystem } from "@/data/clientPageContent";
import { riseVariant } from "@/lib/animations";

export default function ClientSystemSection() {
  return (
    <section
      id="client-system"
      data-theme="dark"
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <motion.div
          {...riseVariant}
          className="oz-badge oz-badge-gold mb-7 md:mb-11"
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
              {...riseVariant}
              transition={{ ...riseVariant.transition, delay: stageIdx * 0.08 }}
              className="oz-forest-card p-4 md:p-6 group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
            >
              <span className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-[#effc5f] text-[#021f0d] flex items-center justify-center text-sm md:text-xl font-black mb-3 md:mb-5">
                {stageIdx + 1}
              </span>
              <h3 className="text-base md:text-xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-[#effc5f] transition-colors mb-2 md:mb-3">
                {stage.title}
              </h3>
              <div className="space-y-2">
                {stage.steps.map((step) => (
                  <p key={step.title} className="text-xs md:text-sm text-white/60 font-medium leading-relaxed">
                    <span className="text-[#effc5f] font-bold">{step.title.replace(/Step \d+: /, "")}</span> —{" "}
                    {step.detail.split(".")[0]}.
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...riseVariant}
          className="mt-7 md:mt-10 p-5 md:p-8 rounded-[32px] md:rounded-[48px] bg-[#021f0d] border border-white/10 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#effc5f]" />
          <div className="relative z-10">
            <p className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter uppercase leading-none">
              Vision to Launch in 4 Weeks. Then We Scale It.
            </p>
            <a href="#application" className="oz-btn-primary mt-5 md:mt-8 px-6 md:px-10 text-sm md:text-lg inline-flex min-h-11 items-center justify-center touch-manipulation w-full max-w-md mx-auto sm:w-auto">
              Start the Build Cycle →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
