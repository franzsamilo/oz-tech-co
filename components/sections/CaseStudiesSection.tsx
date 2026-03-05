"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies } from "@/data/seedPageContent";

export default function CaseStudiesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const cardsPerView = 2;
  const total = caseStudies.length;
  const visibleStudies = useMemo(
    () =>
      Array.from({ length: Math.min(cardsPerView, total) }, (_, i) => caseStudies[(startIndex + i) % total]),
    [startIndex, total]
  );

  const goNext = () => setStartIndex((prev) => (prev + 1) % total);
  const goPrev = () => setStartIndex((prev) => (prev - 1 + total) % total);

  return (
    <section
      id="proof"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          The Evidence
        </span>

        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95]"
        >
          Hundreds of Launches. Millions in Value.
        </ScrollReveal>

        <p className="mt-4 text-sm md:text-base text-[#021f0d]/60 max-w-2xl mx-auto font-medium">
          Proof over promises. Browse real client outcomes and measured business impact.
        </p>

        <div className="mt-6 md:mt-8 flex items-center justify-between gap-3 md:gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-xl border border-[#021f0d]/15 text-xs md:text-sm font-bold text-[#021f0d]/70 hover:text-[#006c40] hover:border-[#006c40]/30 transition-colors"
            aria-label="Previous case studies"
          >
            <ChevronLeft size={16} />
            Prev
          </button>
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#021f0d]/40">
            Carousel Position {startIndex + 1} of {total}
          </p>
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 rounded-xl border border-[#021f0d]/15 text-xs md:text-sm font-bold text-[#021f0d]/70 hover:text-[#006c40] hover:border-[#006c40]/30 transition-colors"
            aria-label="Next case studies"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="mt-4 md:mt-5 grid md:grid-cols-2 gap-4 md:gap-6 text-left">
          {visibleStudies.map((study, idx) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${idx === 1 ? "hidden md:block" : ""} p-4 md:p-7 rounded-3xl md:rounded-[36px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card`}
            >
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#5df3c2] mb-3 md:mb-4">
                {study.client}
              </p>
              <h3 className="text-lg md:text-2xl font-heading font-black uppercase tracking-tighter mb-3 md:mb-4">{study.title}</h3>
              <p className="text-sm md:text-base text-white/60 font-medium mb-3 md:mb-5">{study.challenge}</p>
              <p className="text-base md:text-lg font-black text-[#5df3c2] mb-4 md:mb-6">{study.result}</p>
              <a
                href={(study as any).url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white/10 border border-white/20 text-xs md:text-sm font-bold text-white hover:bg-white/20 hover:border-[#5df3c2] transition-all group/link"
              >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#5df3c2] animate-pulse" />
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
