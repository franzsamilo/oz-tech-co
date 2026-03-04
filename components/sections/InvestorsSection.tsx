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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <ScrollFloat className="text-[#021f0d] text-center" textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
          {investors.headline}
        </ScrollFloat>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {investors.want.slice(0, 3).map((profile, i) => (
            <motion.div
              key={profile.title}
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: i * 0.1 }}
              className="p-8 md:p-10 rounded-[40px] bg-white border-2 border-[#021f0d]/5 shadow-lg hover:border-[#006c40]/20 transition-all group"
            >
              <span className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6 text-sm">0{i+1}</span>
              <h4 className="text-xl font-heading font-black text-[#021f0d] uppercase tracking-tighter mb-3 group-hover:text-[#006c40] transition-colors">{profile.title}</h4>
              <p className="text-base text-[#021f0d]/60 font-medium leading-relaxed">{profile.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...cardMotion}
          className="mt-10 p-8 md:p-10 rounded-[40px] bg-[#021f0d] text-white text-left"
        >
          <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Absolute Disqualifiers
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {investors.dontWant.map((item: string) => (
              <p key={item} className="text-sm font-medium text-white/50 italic flex gap-2">
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
