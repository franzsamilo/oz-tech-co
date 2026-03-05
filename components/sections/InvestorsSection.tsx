"use client";

import { motion } from "framer-motion";
import ScrollFloat from "@/components/ScrollFloat";
import { investors } from "@/data/seedPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function InvestorsSection() {
  return (
    <section
      id="investors"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <ScrollFloat className="text-[#021f0d] text-center" textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-none uppercase">
          {investors.headline}
        </ScrollFloat>

        <div className="mt-8 md:mt-10 grid gap-4 md:flex md:flex-wrap md:justify-center md:gap-6 text-left">
          {investors.want.map((profile, i) => (
            <motion.div
              key={profile.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: i * 0.1 }}
              className="p-4 md:p-7 rounded-3xl md:rounded-[38px] bg-white border-2 border-[#021f0d]/5 shadow-lg hover:border-[#006c40]/20 transition-all group md:w-[300px] lg:w-[320px]"
            >
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-3 md:mb-6 text-xs md:text-sm">0{i+1}</span>
              <h4 className="text-base md:text-xl font-heading font-black text-[#021f0d] uppercase tracking-tighter mb-2 md:mb-3 group-hover:text-[#006c40] transition-colors">{profile.title}</h4>
              <p className="text-xs md:text-base text-[#021f0d]/60 font-medium leading-relaxed">{profile.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...cardMotion} className="mt-5 md:mt-7 p-4 md:p-7 rounded-3xl md:rounded-[40px] bg-[#021f0d] text-white text-left">
          <h3 className="text-xs md:text-sm font-black text-red-500 uppercase tracking-wide md:tracking-widest mb-3 md:mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Absolute Disqualifiers
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {investors.dontWant.map((item: string) => (
              <p key={item} className="text-xs md:text-sm font-medium text-white/50 italic flex gap-2">
                <span className="text-red-500 font-bold shrink-0 text-[10px] mt-0.5">✕</span>
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
