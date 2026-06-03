import Image from "next/image";
import Link from "next/link";

export default function BlogIndexHero() {
  return (
    <section
      data-theme="dark"
      className="oz-section-primary bg-[#021f0d] text-white relative overflow-hidden oz-hero-glow"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image src="/ozlogo.png" alt="OZ Tech" width={32} height={32} className="rounded-lg" />
          <Link
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.3em] text-[#5df3c2] hover:text-white transition-colors"
          >
            OZ Tech
          </Link>
        </div>
        <span className="oz-badge oz-badge-gold">
          <span className="w-2 h-2 rounded-full bg-[#effc5f] animate-pulse" />
          Field Notes
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tighter leading-[0.95] max-w-4xl mx-auto">
          What We&apos;re Learning{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-r from-[#effc5f] to-[#5df3c2]">
            While We Build
          </span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/60 font-medium max-w-2xl mx-auto leading-relaxed">
          Real engineers sharing real lessons. No agency fluff — just what we figured out on
          client projects, in the lab, and at 2am when something broke.
        </p>
      </div>
    </section>
  );
}
