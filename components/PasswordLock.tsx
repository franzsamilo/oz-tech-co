"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import OzLogo from "./OzLogo";
import { ChevronRight, Lock } from "lucide-react";

const STORAGE_KEY = "oztech_seed_access";
const DEFAULT_PASSWORD = "OZTECH2026SEED";

const getPassword = () =>
  process.env.NEXT_PUBLIC_PASSWORD?.trim() || DEFAULT_PASSWORD;

interface PasswordLockProps {
  onUnlock?: () => void;
}

export default function PasswordLock({ onUnlock }: PasswordLockProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsUnlocked(true);
      onUnlock?.();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === getPassword()) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setError("");
      onUnlock?.();
      return;
    }
    setError("Invalid access code. Please verify and try again.");
    // Shake animation effect could be added here
  };

  if (isUnlocked) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-[#021f0d] px-4 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#006c40]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#5df3c2]/10 rounded-full blur-[80px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-[440px]"
      >
        <div className="absolute inset-0 bg-white/2 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.5)]" />
        
        <div className="relative p-10 md:p-14 flex flex-col items-center">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <div className="rounded-2xl bg-[#021f0d] p-3 shadow-[0_0_30px_rgba(0,108,64,0.4)] oz-glow">
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
              Seed Access <span className="text-[#5df3c2]">Portal</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
              Welcome to the OZ Tech Sovereignty Round. Please enter your terminal code.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative">
              <div 
                className={`absolute inset-0 bg-[#5df3c2]/10 rounded-2xl transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`} 
              />
              <div className="relative">
                 <input
                  id="seed-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 px-12 text-center text-white font-mono tracking-[0.3em] placeholder:text-white/20 placeholder:font-sans placeholder:tracking-normal focus:border-[#5df3c2]/60 focus:outline-none transition-all"
                  placeholder="CODE"
                  autoComplete="current-password"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center"
              >
                <span className="text-xs font-bold text-[#fe5858] uppercase tracking-widest bg-[#fe5858]/10 px-4 py-2 rounded-full border border-[#fe5858]/30">
                  {error}
                </span>
              </motion.div>
            )}

            <button
              type="submit"
              className="group relative w-full h-14 rounded-2xl bg-[#effc5f] text-[#021f0d] font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-[#d7e851] active:scale-[0.98] shadow-[0_10px_30px_rgba(239,252,95,0.25)] overflow-hidden oz-button-glow"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                Initialize Search <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-white/20"
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
