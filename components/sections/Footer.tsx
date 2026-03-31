"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import OzLogo from "@/components/OzLogo";

const linkClass =
  "inline-flex min-h-11 items-center justify-center px-2 text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/40 hover:text-[#5df3c2] transition-colors touch-manipulation";

export default function Footer() {
  const pathname = usePathname();
  const isInvest = pathname === "/invest";
  const ctaLabel = isInvest ? "Back the Machine" : "Apply";

  return (
    <footer
      data-theme="dark"
      className="oz-section-tertiary bg-[#021f0d] text-center flex flex-col items-center"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full flex flex-col items-center">
        <div className="oz-divider-dark-line mb-12 w-full" />
        <OzLogo className="w-8 h-8 grayscale opacity-40 mb-6" />
        <p className="text-white/30 text-xs font-black uppercase tracking-[0.4em] mb-3">OZ Tech Development Corp</p>
        <p className="text-white/50 text-sm font-medium italic mb-6 max-w-xs px-2">
          &quot;We don&apos;t build software for rent. We engineer assets for ownership.&quot;
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8 sm:gap-y-3 mb-8 max-w-md"
          aria-label="Footer"
        >
          <a href="#application" className="oz-btn-primary px-6 py-3 text-[10px] sm:text-xs">
            {ctaLabel}
          </a>
        </nav>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 mb-6">
          <Link href="/" className={linkClass}>
            Home
          </Link>
          <Link href="/team" className={linkClass}>
            The Team
          </Link>
          {!isInvest ? (
            <Link href="/invest" className={linkClass}>
              For investors
            </Link>
          ) : null}
        </div>
        <div className="text-[10px] font-black uppercase tracking-widest text-white/20 px-2">
          © 2026 OZ Tech Co. Built for Technology Sovereignty.
        </div>
      </div>
    </footer>
  );
}
