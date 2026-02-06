"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface HackerProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  className?: string;
  imageObjectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  imagePosition?: string;
  imageScale?: number;
  imageBottom?: string;
}

const HackerProfileCard: React.FC<HackerProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  className = "",
  imageObjectFit = "cover",
  imagePosition = "center",
  imageScale = 1,
  imageBottom = "-1px",
}) => {
  const [scanlinePosition, setScanlinePosition] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animate scanline
  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePosition((prev) => (prev + 2) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ aspectRatio: '3/4' }}
    >
      {/* Main Card Container */}
      <motion.div
        className="relative w-full h-full border-2 border-[#5EE414]/50 bg-[#0a0a0a] overflow-hidden"
        style={{
          boxShadow: `
            0 0 20px rgba(94, 228, 20, 0.3),
            inset 0 0 20px rgba(94, 228, 20, 0.1)
          `,
        }}
        animate={{
          borderColor: glitchActive
            ? [
                "rgba(94, 228, 20, 0.5)",
                "rgba(135, 211, 46, 0.8)",
                "rgba(94, 228, 20, 0.5)",
              ]
            : "rgba(94, 228, 20, 0.5)",
        }}
        transition={{ duration: 0.1 }}
      >
        {/* Scanline Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: `linear-gradient(
              to bottom,
              transparent 0%,
              transparent ${scanlinePosition}%,
              rgba(94, 228, 20, 0.1) ${scanlinePosition}%,
              rgba(94, 228, 20, 0.1) ${scanlinePosition + 0.5}%,
              transparent ${scanlinePosition + 0.5}%,
              transparent 100%
            )`,
            animation: "scanlineMove 3s linear infinite",
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(94, 228, 20, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(94, 228, 20, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Glitch Effect Overlay */}
        {glitchActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              x: [0, -2, 2, 0],
            }}
            transition={{ duration: 0.1 }}
            style={{
              background: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(94, 228, 20, 0.1) 2px,
                  rgba(94, 228, 20, 0.1) 4px
                )
              `,
              mixBlendMode: "screen",
            }}
          />
        )}

        {/* Corner Brackets - Hacker Terminal Style */}
        <div className="absolute top-2 left-2 text-[#5EE414] font-mono text-xs z-30">
          [&gt;
        </div>
        <div className="absolute top-2 right-2 text-[#5EE414] font-mono text-xs z-30">
          &lt;]
        </div>
        <div className="absolute bottom-2 left-2 text-[#5EE414] font-mono text-xs z-30">
          [&gt;
        </div>
        <div className="absolute bottom-2 right-2 text-[#5EE414] font-mono text-xs z-30">
          &lt;]
        </div>

        {/* Avatar Image Container */}
        <div className="absolute inset-0 z-10">
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              transform: `scale(${imageScale})`,
            }}
          >
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className={`object-${imageObjectFit}`}
              style={{
                objectPosition: imagePosition,
                bottom: imageBottom,
              }}
              priority
            />
            {/* Image Scanline Effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent 0%,
                  transparent ${scanlinePosition}%,
                  rgba(94, 228, 20, 0.2) ${scanlinePosition}%,
                  rgba(94, 228, 20, 0.2) ${scanlinePosition + 1}%,
                  transparent ${scanlinePosition + 1}%,
                  transparent 100%
                )`,
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/95 to-transparent p-4 border-t-2 border-[#5EE414]/30">
          {/* Terminal-style prompt */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#5EE414] font-mono text-xs">$</span>
            <span className="text-[#5EE414]/60 font-mono text-xs">
              profile_scan.exe
            </span>
          </div>

          {/* Name */}
          <motion.h3
            className="text-white font-mono text-lg sm:text-xl md:text-2xl font-bold mb-1"
            animate={{
              textShadow: glitchActive
                ? [
                    "0 0 5px rgba(94, 228, 20, 0.8)",
                    "2px 0 5px rgba(135, 211, 46, 0.8)",
                    "-2px 0 5px rgba(94, 228, 20, 0.8)",
                    "0 0 5px rgba(94, 228, 20, 0.8)",
                  ]
                : "0 0 10px rgba(94, 228, 20, 0.5)",
            }}
            transition={{ duration: 0.1 }}
          >
            {name.split("").map((char, index) => (
              <motion.span
                key={index}
                animate={{
                  color: glitchActive
                    ? [
                        "#5EE414",
                        "#87D32E",
                        "#5EE414",
                      ]
                    : "#ffffff",
                }}
                transition={{
                  duration: 0.05,
                  delay: index * 0.01,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>

          {/* Title */}
          <motion.p
            className="text-[#5EE414] font-mono text-xs sm:text-sm md:text-base"
            animate={{
              opacity: glitchActive ? [1, 0.7, 1] : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            {`> ${title}`}
          </motion.p>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-[#5EE414] rounded-full animate-pulse" />
            <span className="text-[#5EE414]/70 font-mono text-[10px] sm:text-xs">
              STATUS: ONLINE
            </span>
          </div>
        </div>

        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-5"
          animate={{
            boxShadow: [
              "0 0 20px rgba(94, 228, 20, 0.3)",
              "0 0 30px rgba(94, 228, 20, 0.5)",
              "0 0 20px rgba(94, 228, 20, 0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            border: "2px solid rgba(94, 228, 20, 0.3)",
          }}
        />
      </motion.div>

      {/* CSS Animation for Scanline */}
      <style jsx>{`
        @keyframes scanlineMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HackerProfileCard;
