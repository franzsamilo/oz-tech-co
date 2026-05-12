"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ClientApplicationForm from "@/components/ClientApplicationForm";
import { riseVariant } from "@/lib/animations";
import Script from "next/script";

export default function ClientApplicationSection() {
  const [showForm, setShowForm] = useState(false);
  const [activePath, setActivePath] = useState<"form" | "calendar">("form");
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleStartIntake = () => {
    setShowForm(true);
    setActivePath("form");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section
      id="application"
      data-theme="dark"
      className="oz-section-primary bg-gradient-to-b from-[#021f0d] via-[#04301b] to-[#021f0d] text-white relative overflow-hidden pb-[max(2.5rem,env(safe-area-inset-bottom))]"
    >
      {/* Radial gold glow centered on form area */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239,252,95,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 text-center">
        <motion.div
          {...riseVariant}
        >
          <span className="oz-badge oz-badge-gold">
            Ready to Apply
          </span>
        </motion.div>
        <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[1.05] uppercase mb-4 md:mb-6 px-1 text-white">
          Apply for a Founding Member Spot.
        </h2>
        <p className="text-sm md:text-lg font-medium text-white/50 max-w-2xl mx-auto leading-relaxed italic mb-8 md:mb-10">
          If you have a clear vision, revenue validation, and the budget to move fast, apply below. We review within 48 hours.
        </p>

        <div className="p-4 sm:p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-white text-[#021f0d] shadow-2xl text-left max-w-4xl mx-auto">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mb-3">
            Fast Qualification
          </p>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Clear vision and commitment to build fast.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Budget aligned at $3,500/month.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Ready to give feedback every 2 weeks.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Open to being a public case study.</p>
          </div>
          <button
            type="button"
            onClick={handleStartIntake}
            className="oz-btn-primary w-full justify-center text-xs md:text-sm min-h-12 touch-manipulation"
          >
            Start Founding Member Intake
          </button>
        </div>

        {showForm && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 md:mt-10 p-4 md:p-6 rounded-3xl md:rounded-[40px] bg-white text-[#021f0d] shadow-2xl text-left"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#006c40]">
                  Choose Your Path
                </p>
                <p className="text-sm md:text-base text-[#021f0d]/70 font-medium">
                  Complete the form or book a call directly.
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActivePath("form")}
                  className={`min-h-11 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all touch-manipulation ${
                    activePath === "form"
                      ? "bg-[#021f0d] text-white border-[#021f0d]"
                      : "bg-white text-[#021f0d] border-[#d4dce6]/60"
                  }`}
                >
                  Form
                </button>
                <button
                  type="button"
                  onClick={() => setActivePath("calendar")}
                  className={`min-h-11 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all touch-manipulation ${
                    activePath === "calendar"
                      ? "bg-[#021f0d] text-white border-[#021f0d]"
                      : "bg-white text-[#021f0d] border-[#d4dce6]/60"
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>

            <div className={activePath === "form" ? "" : "hidden"} aria-hidden={activePath !== "form"}>
              <ClientApplicationForm />
            </div>
            {activePath === "calendar" && (
              <div className="rounded-2xl border border-[#d4dce6]/60 bg-[#f9fafb] p-3 sm:p-4 md:p-6">
                <div className="rounded-xl overflow-hidden border border-[#d4dce6]/60 bg-white min-h-[480px] sm:min-h-[560px] md:min-h-[600px]">
                  <iframe
                    src="https://connect.civy.ph/widget/booking/6wcV7lvcjOxdBntDuIGj"
                    className="min-h-[480px] sm:min-h-[560px] md:min-h-[600px] w-full"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    id="iOnZgkuDwzd0FqcU9roG_1772876686888"
                    title="Book a call"
                  />
                </div>
                <Script src="https://connect.civy.ph/js/form_embed.js" strategy="afterInteractive" />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
