"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/data/seedPageContent";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-theme="dark"
      className="px-5 sm:px-8 lg:px-12 pt-5 md:pt-8 pb-8 md:pb-12 section-viewport flex flex-col items-center justify-center relative overflow-hidden bg-[#021f0d] text-white"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col items-center text-center oz-hero-entrance">
        <div className="flex items-center gap-3 mb-4 md:mb-9">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#5df3c2]">OZ Tech</span>
        </div>

        <span className="oz-badge oz-badge-gold mb-5 md:mb-8">
          <span className="w-2 h-2 rounded-full bg-[#effc5f] animate-pulse" />
          {heroContent.statement?.split(".")[0] || "Raising $100,000 to scale"}
        </span>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.92] tracking-tighter uppercase">
          We&apos;re Pulling Back the{" "}
          <span className="text-[#5df3c2]">
            Curtain
          </span>{" "}
          on Software
        </h1>

        <p className="mt-4 md:mt-8 text-sm md:text-xl text-white/70 max-w-2xl leading-relaxed font-medium">
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

        <p className="mt-4 md:mt-6 text-[10px] md:text-xs font-bold text-white/65 uppercase tracking-[0.16em] md:tracking-widest">
          100+ Projects Delivered · $100M+ Revenue Generated · 4-Week Launches
        </p>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
        <a href="#truth" className="oz-scroll-cue">
          <ChevronDown size={28} strokeWidth={2} className="text-[#5df3c2]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
