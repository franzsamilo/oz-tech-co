"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

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
    setError("Incorrect password. Please try again.");
  };

  if (isUnlocked) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">
            OZ Tech Seed Round
          </h1>
          <p className="mt-2 text-sm text-white/70">
            This page is password protected for webinar and event attendees.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="seed-password"
              className="mb-2 block text-sm font-medium text-white/80"
            >
              Access Password
            </label>
            <input
              id="seed-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0a0a0a] px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-white/90 px-4 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Unlock Page
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-white/50">
          If you need access, contact the OZ Tech team for the password.
        </p>
      </motion.div>
    </div>
  );
}
