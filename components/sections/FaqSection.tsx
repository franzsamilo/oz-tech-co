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
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-[#f9fafb]"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          Addressing The Skeptics.
        </ScrollReveal>

        <div className="mt-16 space-y-4 text-left">
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
                className={`w-full text-left p-8 rounded-[32px] border-2 transition-all ${
                  openFaq === i
                    ? "bg-white border-[#5df3c2] shadow-xl"
                    : "bg-white border-[#021f0d]/5 hover:border-[#006c40]/20"
                }`}
              >
                <div className="flex justify-between items-center w-full gap-4">
                  <h3 className="text-xl md:text-2xl font-heading font-black uppercase tracking-tighter text-[#021f0d]">
                    {faq.q}
                  </h3>
                  <span className={`text-3xl font-black transition-transform duration-500 shrink-0 ${openFaq === i ? 'rotate-45 text-[#5df3c2]' : 'text-[#021f0d]/20'}`}>
                    +
                  </span>
                </div>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="overflow-hidden mt-6"
                  >
                    <p className="text-lg text-[#021f0d]/60 leading-relaxed font-medium">
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
