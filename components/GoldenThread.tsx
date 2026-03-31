"use client";

import { useEffect, useRef, useState } from "react";

export default function GoldenThread() {
  const threadRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [inDarkSection, setInDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollTop / docHeight);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const isDark = entry.target.getAttribute("data-theme") === "dark";
            setInDarkSection(isDark);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[data-theme]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop thread */}
      <div
        ref={threadRef}
        className="fixed left-10 top-0 w-[2px] h-full z-50 hidden md:block pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, #effc5f ${scrollProgress * 100}%, rgba(239,252,95,0.08) ${scrollProgress * 100}%)`,
          boxShadow: inDarkSection
            ? "0 0 8px rgba(239,252,95,0.3)"
            : "none",
          opacity: inDarkSection ? 1 : 0.4,
          transition: "opacity 0.6s ease, box-shadow 0.6s ease",
        }}
      />

      {/* Mobile dot indicator */}
      <MobileDots scrollProgress={scrollProgress} />
    </>
  );
}

function MobileDots({ scrollProgress }: { scrollProgress: number }) {
  const acts = [
    { label: "Arrival", position: 0 },
    { label: "Road", position: 0.25 },
    { label: "City", position: 0.5 },
    { label: "Curtain", position: 0.75 },
  ];

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:hidden pointer-events-none">
      {acts.map((act) => (
        <div
          key={act.label}
          className="w-1.5 h-1.5 rounded-full transition-all duration-500"
          style={{
            background:
              scrollProgress >= act.position ? "#effc5f" : "rgba(239,252,95,0.2)",
            boxShadow:
              scrollProgress >= act.position
                ? "0 0 6px rgba(239,252,95,0.4)"
                : "none",
          }}
          aria-label={act.label}
        />
      ))}
    </div>
  );
}
