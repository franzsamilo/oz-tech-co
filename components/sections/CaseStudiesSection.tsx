"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { caseStudies } from "@/data/seedPageContent";

export default function CaseStudiesSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [iframeStatus, setIframeStatus] = useState<Record<string, "loading" | "loaded" | "failed">>({});
  const cardsPerView = 1;
  const total = caseStudies.length;
  const visibleStudies = useMemo(
    () =>
      Array.from({ length: Math.min(cardsPerView, total) }, (_, i) => caseStudies[(startIndex + i) % total]),
    [startIndex, total]
  );

  const goNext = () => setStartIndex((prev) => (prev + 1) % total);
  const goPrev = () => setStartIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timeouts: Array<ReturnType<typeof setTimeout>> = [];
    visibleStudies.forEach((study) => {
      const url = (study as any).url as string | undefined;
      if (!url || iframeStatus[url]) return;
      setIframeStatus((prev) => ({ ...prev, [url]: "loading" }));
      const timeout = setTimeout(() => {
        setIframeStatus((prev) => {
          if (prev[url] === "loaded") return prev;
          return { ...prev, [url]: "failed" };
        });
      }, 3500);
      timeouts.push(timeout);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [visibleStudies, iframeStatus]);

  return (
    <section
      id="proof"
      data-theme="light"
      className="oz-section-secondary bg-white text-[#021f0d] relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-5 sm:gap-6 lg:gap-8">
          <div className="lg:w-[58%]">
            <div className="flex items-center justify-start gap-3 mb-4 md:mb-6">
              <span className="oz-badge oz-badge-green">
                The Evidence
              </span>
            </div>

            {visibleStudies.map((study) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl md:rounded-[36px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card h-[42vh] min-h-[280px] sm:min-h-[320px] sm:h-[45vh] lg:h-[70vh] border-b-2 border-[#effc5f]"
              >
                {(study as any).url && iframeStatus[(study as any).url] !== "failed" && (
                  <div className="absolute inset-0">
                    <iframe
                      src={(study as any).url}
                      title={`${study.title} preview`}
                      className="w-full h-full"
                      loading="lazy"
                      onLoad={() =>
                        setIframeStatus((prev) => ({
                          ...prev,
                          [(study as any).url]: "loaded",
                        }))
                      }
                      onError={() =>
                        setIframeStatus((prev) => ({
                          ...prev,
                          [(study as any).url]: "failed",
                        }))
                      }
                    />
                    {iframeStatus[(study as any).url] !== "loaded" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#021f0d]/70 text-white/70 text-xs uppercase tracking-[0.3em]">
                        Loading preview
                      </div>
                    )}
                  </div>
                )}
                {iframeStatus[(study as any).url] === "failed" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#021f0d]/80 text-white/60 text-xs uppercase tracking-[0.3em]">
                    Preview blocked
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#021f0d] via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2]">
                    {study.client}
                  </p>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/50">
                    Case {startIndex + 1} of {total}
                  </p>
                </div>
              </motion.div>
            ))}

            <div className="mt-4 md:mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex min-h-11 min-w-[5.5rem] items-center justify-center gap-1.5 px-4 py-2.5 md:px-4 md:py-2 rounded-xl border border-[#021f0d]/15 text-xs md:text-sm font-bold text-[#021f0d]/70 hover:text-[#006c40] hover:border-[#006c40]/30 transition-colors touch-manipulation"
                aria-label="Previous case study"
              >
                <ChevronLeft size={16} />
                Prev
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex min-h-11 min-w-[5.5rem] items-center justify-center gap-1.5 px-4 py-2.5 md:px-4 md:py-2 rounded-xl border border-[#021f0d]/15 text-xs md:text-sm font-bold text-[#021f0d]/70 hover:text-[#006c40] hover:border-[#006c40]/30 transition-colors touch-manipulation"
                aria-label="Next case study"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:w-[42%] flex flex-col justify-center text-left">
            {visibleStudies.map((study) => (
              <motion.div
                key={`${study.title}-details`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl md:rounded-[32px] border border-[#d4dce6]/60 border-t-[3px] border-t-[#5df3c2] shadow-xl p-4 sm:p-5 md:p-6"
              >
                <ScrollReveal
                  textClassName="text-[#021f0d]"
                  textSize="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tighter leading-[1.05]"
                >
                  {study.title}
                </ScrollReveal>
                <p className="mt-3 text-sm md:text-base text-[#021f0d]/70 font-medium">
                  {study.challenge}
                </p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-[#d4dce6]/60 p-3 bg-[#f9fafb]">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#006c40]/60 font-black mb-2">Built</p>
                    <p className="text-sm md:text-base font-semibold text-[#021f0d]">{study.built}</p>
                  </div>
                  <div className="rounded-2xl border border-[#d4dce6]/60 p-3 bg-[#f9fafb]">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#006c40]/60 font-black mb-2">Result</p>
                    <p className="text-sm md:text-base font-semibold text-[#021f0d]">{study.result}</p>
                  </div>
                  <div className="rounded-2xl border border-[#d4dce6]/60 p-3 bg-[#f9fafb]">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#006c40]/60 font-black mb-2">Timeline</p>
                    <p className="text-sm md:text-base font-semibold text-[#021f0d]">{study.timeline}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href="#application"
                    className="oz-btn-primary w-full min-h-11 justify-center text-xs md:text-sm touch-manipulation"
                  >
                    Build Something Like This <ArrowRight size={16} strokeWidth={3} />
                  </a>
                  <a
                    href={(study as any).url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs font-bold text-[#006c40]/60 hover:text-[#006c40] uppercase tracking-widest transition-colors py-2"
                  >
                    View Live Project &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
