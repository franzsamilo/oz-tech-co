"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import OzLogo from "./OzLogo";
import { ChevronRight } from "lucide-react";

const STORAGE_KEY = "oztech_seed_access";

const getPassword = () => process.env.NEXT_PUBLIC_PASSWORD?.trim() ?? "";

interface PasswordLockProps {
  onUnlock?: () => void;
}

export default function PasswordLock({ onUnlock }: PasswordLockProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsUnlocked(true);
      onUnlock?.();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expected = getPassword();
    if (!expected) {
      setError("Access not configured. Please contact the administrator.");
      return;
    }
    if (password.trim() === expected) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setError("");
      onUnlock?.();
      return;
    }
    setError("Invalid access code. Please verify and try again.");
  };

  if (isUnlocked) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center bg-[#021f0d] px-4 py-6 overflow-y-auto overflow-x-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006c40]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[400px]"
      >
        <div className="relative p-10 md:p-14 flex flex-col items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="rounded-2xl bg-[#021f0d] p-3 shadow-[0_0_30px_rgba(239,252,95,0.15)]">
              <OzLogo size={48} variant="main" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-10"
          >
            <h1 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tighter mb-3">
              Seed Access <span className="text-[#effc5f]">Portal</span>
            </h1>
            <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto font-mono">
              Enter your terminal code.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="w-full space-y-8">
            <div className="relative">
              <input
                id="seed-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border-0 border-b-2 border-[#effc5f] bg-transparent text-white font-mono text-center tracking-[0.3em] placeholder:text-white/20 placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:border-[#5df3c2] rounded-none transition-colors"
                placeholder="CODE"
                autoComplete="current-password"
                suppressHydrationWarning
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <span className="text-xs font-bold text-[#fe5858] uppercase tracking-widest">
                  {error}
                </span>
              </motion.div>
            )}

            <button
              type="submit"
              className="oz-btn-primary w-full justify-center"
              suppressHydrationWarning
            >
              <span className="relative flex items-center justify-center gap-2">
                Initialize Search <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/20 font-mono"
          >
            <div className="h-px w-8 bg-white/10" />
            Technology Sovereignty v1.0
            <div className="h-px w-8 bg-white/10" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
