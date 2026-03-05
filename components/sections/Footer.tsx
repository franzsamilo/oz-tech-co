"use client";

import Link from "next/link";
import OzLogo from "@/components/OzLogo";

export default function Footer() {
  return (
    <footer className="px-6 py-16 bg-white border-t border-[#021f0d]/5 text-center flex flex-col items-center">
      <OzLogo className="w-8 h-8 grayscale opacity-20 mb-6" />
      <p className="text-[#021f0d]/30 text-xs font-black uppercase tracking-[0.4em] mb-3">OZ Tech Development Corp</p>
      <p className="text-[#021f0d]/50 text-sm font-medium italic mb-6 max-w-xs">
        &quot;We don&apos;t build software for rent. We engineer assets for ownership.&quot;
      </p>
      <div className="flex gap-8 mb-8">
        <Link href="/" className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">Home</Link>
        <Link href="/team" className="hidden md:inline text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">The Team</Link>
        <a href="#application" className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">Back the Machine</a>
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/20">
        © 2026 OZ Tech Co. Built for Technology Sovereignty.
      </div>
    </footer>
  );
}
