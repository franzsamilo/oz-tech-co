"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientFaqs } from "@/data/clientPageContent";

export default function ClientFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="client-faq"
      data-theme="light"
      className="oz-section-tertiary bg-[#f9fafb] pb-[max(2.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
        <span className="oz-badge oz-badge-green">
          FAQ
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase px-1"
        >
          Questions You Probably Have (Answered Honestly)
        </ScrollReveal>

        <div className="mt-6 md:mt-10 space-y-3 md:space-y-4 text-left max-w-3xl mx-auto">
          {clientFaqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`w-full min-h-12 text-left p-3.5 md:p-6 rounded-2xl md:rounded-[32px] transition-all touch-manipulation ${
                  openFaq === i
                    ? "bg-white border-l-[3px] border-l-[#effc5f] border border-[#021f0d]/5 shadow-xl"
                    : "bg-white border border-[#021f0d]/5 shadow-sm hover:shadow-md hover:border-[#006c40]/20"
                }`}
              >
                <div className="flex justify-between items-center w-full gap-4">
                  <h3 className="text-[13px] sm:text-base md:text-xl font-heading font-black uppercase tracking-tight text-[#021f0d]">
                    {faq.q}
                  </h3>
                  <span
                    className={`text-lg sm:text-xl md:text-3xl font-black transition-transform duration-500 shrink-0 ${
                      openFaq === i ? "rotate-45 text-[#effc5f]" : "text-[#021f0d]/20"
                    }`}
                  >
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
