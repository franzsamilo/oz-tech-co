"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/data/seedPageContent";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="px-6 md:px-10 pt-5 md:pt-8 pb-8 md:pb-12 section-viewport flex flex-col items-center justify-center relative overflow-hidden bg-[#f9fafb] oz-maze-overlay oz-hero-magic oz-hero-bg oz-hero-gradient"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center oz-hero-entrance">
        <div className="flex items-center gap-3 mb-4 md:mb-9">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#006c40]">OZ Tech</span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mb-5 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
          {heroContent.statement?.split(".")[0] || "Raising $100,000 to scale"}
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-[#021f0d] leading-[0.92] tracking-tighter uppercase oz-gold-line">
          We&apos;re Pulling Back the{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#006c40] to-[#5df3c2] oz-hero-aurora">
            Curtain
          </span>{" "}
          on Software
        </h1>

        <p className="mt-4 md:mt-8 text-sm md:text-xl text-[#021f0d]/70 max-w-2xl leading-relaxed font-medium">
          {heroContent.subheadline}
        </p>

        <div className="mt-5 md:mt-10">
          <a
            href="#application"
            className="oz-btn-primary min-w-[220px] md:min-w-[280px] shadow-2xl hover:shadow-[#effc5f]/40 text-sm md:text-lg inline-flex items-center justify-center gap-3"
          >
            {heroContent.cta}
            <ArrowRight size={20} strokeWidth={3} />
          </a>
        </div>

        <p className="mt-4 md:mt-6 text-[10px] md:text-xs font-bold text-[#021f0d]/40 uppercase tracking-[0.16em] md:tracking-widest">
          100+ Projects Delivered · $100M+ Revenue Generated · 4-Week Launches
        </p>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <a href="#truth" className="oz-scroll-cue">
          <ChevronDown size={28} strokeWidth={2} className="text-[#006c40]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
