"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1200,
  className = "",
}: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
      const start = performance.now();
      const animate = (t: number) => {
        const progress = Math.min(1, (t - start) / durationMs);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run();
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <div ref={ref} className="inline-block">
      <span className={className}>
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
}
