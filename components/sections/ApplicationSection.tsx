"use client";

import { motion } from "framer-motion";
import InvestmentForm from "@/components/InvestmentForm";

export default function ApplicationSection() {
  return (
    <section
      id="application"
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#5df3c2] font-black uppercase tracking-[0.4em] text-xs mb-12"
        >
          The Selection Process
        </motion.div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none uppercase mb-8">
          Become an Owner.
        </h2>
        <p className="text-xl font-medium text-white/50 max-w-2xl mx-auto leading-relaxed italic mb-16">
          We are looking for strategic partners who believe in software sovereignty. If you believe businesses should own their tools, apply below.
        </p>

        <div className="p-8 md:p-14 rounded-[48px] bg-white text-[#021f0d] shadow-2xl">
          <InvestmentForm />
        </div>
      </div>
    </section>
  );
}
