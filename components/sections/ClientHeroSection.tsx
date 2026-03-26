"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { clientHero } from "@/data/clientPageContent";

export default function ClientHeroSection() {
  return (
    <section
      id="client-hero"
      className="px-4 sm:px-6 md:px-10 pt-4 sm:pt-5 md:pt-8 pb-6 sm:pb-8 md:pb-12 section-viewport flex flex-col items-center justify-center relative overflow-hidden bg-[#f9fafb] oz-maze-overlay oz-hero-magic oz-hero-bg oz-hero-gradient"
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center text-center oz-hero-entrance px-1">
        <div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-9">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#006c40]">OZ Tech</span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mb-5 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
          {clientHero.preHeadline}
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#021f0d] leading-[0.92] tracking-tighter uppercase oz-gold-line max-w-5xl break-words">
          We&apos;re the Engineering Team That Turns Your{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#006c40] to-[#5df3c2] oz-hero-aurora">
            Vision
          </span>{" "}
          Into Working Technology
        </h1>

        <div className="mt-4 md:mt-8 max-w-4xl space-y-4 md:space-y-5">
          <p className="text-sm md:text-xl text-[#021f0d]/72 leading-relaxed font-medium">
            {clientHero.subheadline}
          </p>

          <p className="text-sm md:text-lg text-[#021f0d]/62 leading-relaxed font-medium">
            You bring the vision. We bring the engineering.
          </p>
        </div>

        <div className="mt-6 md:mt-9">
          <a
            href="#client-how"
            className="oz-btn-primary min-h-11 min-w-[min(100%,220px)] md:min-w-[280px] shadow-2xl hover:shadow-[#effc5f]/40 text-sm md:text-lg inline-flex items-center justify-center gap-3 touch-manipulation px-6 w-full max-w-sm sm:w-auto"
          >
            {clientHero.cta} <ArrowRight size={20} strokeWidth={3} />
          </a>
        </div>

        <p className="mt-5 md:mt-6 text-[10px] md:text-xs font-bold text-[#021f0d]/40 uppercase tracking-[0.16em] md:tracking-widest max-w-4xl">
          {clientHero.trustLine}
        </p>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <a href="#client-audience" className="oz-scroll-cue">
          <ChevronDown size={28} strokeWidth={2} className="text-[#006c40]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
