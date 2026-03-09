"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ClientApplicationForm from "@/components/ClientApplicationForm";
import Script from "next/script";

export default function ClientApplicationSection() {
  const [showForm, setShowForm] = useState(false);
  const [activePath, setActivePath] = useState<"form" | "calendar">("form");
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleStartIntake = () => {
    setShowModal(true);
  };

  const handleSelectPath = (path: "form" | "calendar") => {
    setShowForm(true);
    setActivePath(path);
    setShowModal(false);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section
      id="client-application"
      className="px-6 md:px-10 py-12 md:py-16 min-h-screen bg-[#021f0d] text-white relative overflow-hidden oz-section-glow"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#5df3c2] font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[10px] md:text-xs mb-6 md:mb-10"
        >
          Ready to Apply
        </motion.div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-none uppercase mb-4 md:mb-6">
          Apply for a Founding Member Spot.
        </h2>
        <p className="text-sm md:text-lg font-medium text-white/50 max-w-2xl mx-auto leading-relaxed italic mb-8 md:mb-10">
          If you have a clear vision, revenue validation, and the budget to move fast, apply below. We review within 48 hours.
        </p>

        <div className="p-6 md:p-8 rounded-3xl md:rounded-[40px] bg-white text-[#021f0d] shadow-2xl text-left max-w-4xl mx-auto">
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
            className="oz-btn-primary w-full justify-center text-xs md:text-sm"
          >
            Start Founding Member Intake
          </button>
        </div>

        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#021f0d]/80 backdrop-blur-sm px-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg rounded-3xl bg-white text-[#021f0d] shadow-2xl p-6 md:p-8 text-left oz-glass-card oz-skew-frame oz-vine-border relative"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#d4dce6]/60 text-[#021f0d]/70 hover:text-[#021f0d] hover:border-[#006c40]/30 transition"
                aria-label="Close modal"
              >
                ✕
              </button>
              <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#006c40] mb-3">
                Quick Choice
              </p>
              <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter mb-3">
                Want to Book a Call Instead?
              </h3>
              <p className="text-sm md:text-base text-[#021f0d]/70 leading-relaxed mb-6">
                If you’re ready to talk, book a call now. Prefer to qualify first? Continue to the intake form.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectPath("calendar")}
                  className="oz-btn-primary w-full justify-center text-xs md:text-sm"
                >
                  Book a Call
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectPath("form")}
                  className="oz-btn-secondary w-full justify-center text-xs md:text-sm"
                >
                  Continue to Form
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

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

            {activePath === "form" ? (
              <ClientApplicationForm />
            ) : (
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
                <Script src="https://connect.civy.ph/js/form_embed.js" strategy="afterInteractive" />
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
