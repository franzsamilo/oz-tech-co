"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

interface StickyApplyBarProps {
  label: string;
  href?: string;
  /** Show only after the user has scrolled this many viewport heights from the top. Default 1.2 (~past hero). */
  threshold?: number;
}

export default function StickyApplyBar({
  label,
  href = "#application",
  threshold = 1.2,
}: StickyApplyBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let frame = 0;
    const handler = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const triggerPx = window.innerHeight * threshold;
        const scrolled = window.scrollY > triggerPx;
        const nearBottom =
          window.scrollY + window.innerHeight >
          document.documentElement.scrollHeight - window.innerHeight * 0.6;
        setVisible(scrolled && !nearBottom);
      });
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold, dismissed]);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 pointer-events-none transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-[#5df3c2]/25 bg-[#021f0d]/95 backdrop-blur-md shadow-2xl px-3 py-2 sm:px-4 sm:py-3">
          <a
            href={href}
            className="oz-btn-primary flex-1 min-h-11 px-4 sm:px-6 text-xs sm:text-sm inline-flex items-center justify-center gap-2 touch-manipulation"
          >
            {label}
            <ArrowRight size={16} strokeWidth={3} />
          </a>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="shrink-0 w-9 h-9 rounded-full border border-white/15 text-white/55 hover:text-white hover:border-white/30 transition flex items-center justify-center text-lg leading-none touch-manipulation"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
