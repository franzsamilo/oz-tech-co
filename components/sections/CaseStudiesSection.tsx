"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies } from "@/data/seedPageContent";

export default function CaseStudiesSection() {
  return (
    <section
      id="proof"
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40] mb-12">
          The Evidence
        </span>

        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95]"
        >
          Hundreds of Launches. Millions in Value.
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 md:p-10 rounded-[40px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card"
            >
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-4">
                {study.client}
              </p>
              <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter mb-4">{study.title}</h3>
              <p className="text-lg text-white/60 font-medium mb-6">{study.challenge}</p>
              <p className="text-xl font-black text-[#5df3c2] mb-8">{study.result}</p>
              <a
                href={(study as any).url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-sm font-bold text-white hover:bg-white/20 hover:border-[#5df3c2] transition-all group/link"
              >
                <div className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
                <span className="group-hover/link:text-[#effc5f] transition-colors">{(study as any).url?.replace('https://', '')}</span>
                <ArrowRight size={14} strokeWidth={3} className="group-hover/link:-rotate-45 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
