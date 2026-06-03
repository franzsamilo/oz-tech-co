"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const STORAGE_KEY = "oz-blog-cta-dismissed-v1";

export default function BlogFloatingCTA() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setMounted(true);
    const isDismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    setDismissed(isDismissed);
    if (!isDismissed) {
      const t = window.setTimeout(() => setOpen(true), 1400);
      return () => window.clearTimeout(t);
    }
  }, []);

  const handleDismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  if (!mounted || dismissed) return null;
  if (pathname?.startsWith("/blog") || pathname?.startsWith("/studio")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2.5rem)] pointer-events-none">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="bubble"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto relative w-[280px] sm:w-[300px] bg-white border border-[#021f0d]/10 rounded-2xl shadow-[0_24px_60px_-20px_rgba(2,31,13,0.35)] p-5"
          >
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#021f0d] text-white flex items-center justify-center hover:bg-[#006c40] transition-colors shadow-[0_4px_12px_rgba(2,31,13,0.3)]"
            >
              <X size={13} strokeWidth={3} />
            </button>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#006c40] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#effc5f] animate-pulse" />
              Field Notes
            </p>
            <p className="text-[15px] text-[#021f0d] leading-snug mb-4">
              Hey — you can read about how we actually design things over here too. A short field note on what we&apos;re learning while building.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-[#006c40] hover:text-[#021f0d] transition-colors"
            >
              Read the field note →
            </Link>
            <span
              aria-hidden="true"
              className="absolute -bottom-2 right-7 w-4 h-4 rotate-45 bg-white border-r border-b border-[#021f0d]/10"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close field note callout" : "Open field note callout"}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto relative w-14 h-14 rounded-full border-2 border-[#021f0d] overflow-hidden shadow-[0_12px_28px_-6px_rgba(2,31,13,0.45)] bg-white"
      >
        <Image
          src="/blog1/franz-author.jpg"
          alt="Franz, OZ Tech"
          fill
          sizes="200px"
          className="object-cover scale-[1.5]"
          style={{ objectPosition: "50% 42%", transformOrigin: "50% 42%" }}
        />
        {!open ? (
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#effc5f] border-2 border-white animate-pulse"
          />
        ) : null}
      </motion.button>
    </div>
  );
}
