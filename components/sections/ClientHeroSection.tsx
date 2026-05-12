"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { clientHero } from "@/data/clientPageContent";

export default function ClientHeroSection() {
  return (
    <section
      id="client-hero"
      data-theme="dark"
      className="px-5 sm:px-8 lg:px-12 pt-4 sm:pt-5 md:pt-8 pb-6 sm:pb-8 md:pb-12 section-viewport flex flex-col items-center justify-center relative overflow-hidden bg-[#021f0d] oz-hero-glow"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col items-center text-center oz-hero-entrance px-1">
        <div className="flex items-center gap-3 mb-4 sm:mb-5 md:mb-9">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#5df3c2]">OZ Tech</span>
        </div>

        <span className="oz-badge oz-badge-gold">
          <span className="w-2 h-2 rounded-full bg-[#effc5f] animate-pulse" />
          {clientHero.preHeadline}
        </span>

        <h1 className="mt-5 md:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.92] tracking-tighter uppercase max-w-5xl break-words">
          We&apos;re the Engineering Team That Turns Your{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#effc5f] to-[#5df3c2]">
            Vision
          </span>{" "}
          Into Working Technology
        </h1>

        <div className="mt-4 md:mt-8 max-w-4xl space-y-4 md:space-y-5">
          <p className="text-sm md:text-xl text-white/70 leading-relaxed font-medium">
            {clientHero.subheadline}
          </p>
          <p className="text-sm md:text-lg text-white/60 leading-relaxed font-medium">
            You bring the vision. We bring the engineering.
          </p>
        </div>

        <div className="mt-6 md:mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 sm:justify-center">
          <a
            href="#application"
            className="oz-btn-primary min-h-11 min-w-[min(100%,220px)] md:min-w-[280px] text-sm md:text-lg inline-flex items-center justify-center gap-3 touch-manipulation px-6 w-full max-w-sm sm:w-auto"
          >
            {clientHero.cta} <ArrowRight size={20} strokeWidth={3} />
          </a>
          <a
            href="#client-how"
            className="text-xs sm:text-sm font-bold uppercase tracking-widest text-white/55 hover:text-[#5df3c2] transition-colors min-h-11 inline-flex items-center"
          >
            See how it works →
          </a>
        </div>

        <p className="mt-5 md:mt-6 text-[10px] md:text-xs font-mono text-white/65 uppercase tracking-[0.16em] md:tracking-widest max-w-4xl">
          {clientHero.trustLine}
        </p>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <a href="#client-audience" className="oz-scroll-cue" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(93,243,194,0.15)' }}>
          <ChevronDown size={28} strokeWidth={2} className="text-[#5df3c2]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
