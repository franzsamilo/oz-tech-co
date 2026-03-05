"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { faqs } from "@/data/seedPageContent";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="px-5 md:px-10 py-10 md:py-16 min-h-screen bg-[#f9fafb]"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          Addressing The Skeptics.
        </ScrollReveal>

        <div className="mt-6 md:mt-10 space-y-3 md:space-y-4 text-left">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`w-full text-left p-3.5 md:p-6 rounded-2xl md:rounded-[32px] border-2 transition-all ${
                  openFaq === i
                    ? "bg-white border-[#5df3c2] shadow-xl"
                    : "bg-white border-[#021f0d]/5 hover:border-[#006c40]/20"
                }`}
              >
                <div className="flex justify-between items-center w-full gap-4">
                  <h3 className="text-[13px] sm:text-base md:text-xl font-heading font-black uppercase tracking-tight text-[#021f0d]">
                    {faq.q}
                  </h3>
                  <span className={`text-lg sm:text-xl md:text-3xl font-black transition-transform duration-500 shrink-0 ${openFaq === i ? 'rotate-45 text-[#5df3c2]' : 'text-[#021f0d]/20'}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden mt-3 md:mt-5"
                  >
                    <p className="text-xs sm:text-sm md:text-base text-[#021f0d]/70 leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
