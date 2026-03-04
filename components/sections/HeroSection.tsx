"use client";

import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/data/seedPageContent";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="px-6 md:px-10 py-16 md:py-20 min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#f9fafb] oz-maze-overlay oz-hero-magic oz-hero-bg"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <Image src="/ozlogo.png" alt="OZ Tech" width={36} height={36} className="rounded-lg" />
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#006c40]">OZ Tech</span>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-[#006c40] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
          {heroContent.statement?.split(".")[0] || "Raising $100,000 to scale"}
        </span>

        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-[#021f0d] leading-[0.92] tracking-tighter uppercase oz-gold-line">
          We&apos;re Pulling Back the{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#006c40] to-[#5df3c2] oz-hero-aurora">
            Curtain
          </span>{" "}
          on Software
        </h1>

        <p className="mt-8 text-lg md:text-2xl text-[#021f0d]/70 max-w-2xl leading-relaxed font-medium">
          {heroContent.subheadline}
        </p>

        <div className="mt-10">
          <a
            href="#application"
            className="oz-btn-primary min-w-[280px] shadow-2xl hover:shadow-[#effc5f]/40 text-lg inline-flex items-center justify-center gap-3"
          >
            {heroContent.cta}
            <ArrowRight size={20} strokeWidth={3} />
          </a>
        </div>

        <p className="mt-6 text-xs font-bold text-[#021f0d]/40 uppercase tracking-widest">
          100+ Projects Delivered · $100M+ Revenue Generated · 4-Week Launches
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#truth" className="oz-scroll-cue">
          <ChevronDown size={28} strokeWidth={2} className="text-[#006c40]/40 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
