"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import InvestmentForm from "@/components/InvestmentForm";
import Script from "next/script";

export default function ApplicationSection() {
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
      className="oz-section-secondary bg-[#021f0d] text-white relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-6 md:mb-10"
        >
          <span className="oz-badge oz-badge-gold">
            The Selection Process
          </span>
        </motion.div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-none uppercase mb-4 md:mb-6">
          Become an Owner.
        </h2>
        <p className="text-sm md:text-lg font-medium text-white/50 max-w-2xl mx-auto leading-relaxed italic mb-6 md:mb-10">
          We are looking for strategic partners who believe in software sovereignty. If you believe businesses should own their tools, apply below.
        </p>

        <div className="oz-city-card p-6 md:p-8 text-left max-w-3xl mx-auto">
          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#006c40] mb-3">
            Fast Qualification
          </p>
          <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Own your software stack, not subscriptions.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Active strategic operator, not passive observer.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Comfortable with transparent execution cadence.</p>
            <p className="text-xs md:text-sm font-semibold text-[#021f0d]/80">Aligned with long-term technology sovereignty.</p>
          </div>
          <button
            type="button"
            onClick={handleStartIntake}
            className="oz-btn-primary w-full justify-center text-xs md:text-sm"
          >
            Start Strategic Partner Intake
          </button>
        </div>

        {showForm && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 md:mt-10 oz-city-card p-4 md:p-6 text-left"
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
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
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
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
              <InvestmentForm />
            </div>
            {activePath === "calendar" && (
              <div className="rounded-2xl border border-[#d4dce6]/60 bg-[#f9fafb] p-4 md:p-6">
                <div className="rounded-xl overflow-hidden border border-[#d4dce6]/60 bg-white">
                  <iframe
                    src="https://connect.civy.ph/widget/booking/6wcV7lvcjOxdBntDuIGj"
                    style={{ width: "100%", border: "none", overflow: "hidden" }}
                    scrolling="no"
                    id="iOnZgkuDwzd0FqcU9roG_1772876686888"
                    title="Book a call"
                  />
                </div>
                <Script
                  src="https://connect.civy.ph/js/form_embed.js"
                  strategy="afterInteractive"
                />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
