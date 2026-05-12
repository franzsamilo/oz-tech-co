"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { clientApplicationFields } from "@/data/clientPageContent";

interface AppField {
  label: string;
  type: string;
  name: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

interface AppSection {
  section: string;
  fields: AppField[];
}

export default function ClientApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);

  const sections = clientApplicationFields as unknown as AppSection[];
  const totalSteps = sections.length;

  const validateCurrentStep = (): boolean => {
    const form = formRef.current;
    if (!form) return true;
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      `[data-step="${step}"] input, [data-step="${step}"] select, [data-step="${step}"] textarea`
    );
    for (const input of Array.from(inputs)) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => {
      const next = Math.min(prev + 1, totalSteps - 1);
      if (next !== prev) {
        requestAnimationFrame(() => {
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  };
  const handlePrev = () => {
    setStep((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next !== prev) {
        requestAnimationFrame(() => {
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const entries: Record<string, string | string[]> = {};
    for (const key of Array.from(new Set(formData.keys()))) {
      const values = formData.getAll(key).map((v) => (typeof v === "string" ? v : ""));
      entries[key] = values.length > 1 ? values : values[0] ?? "";
    }

    const fullName = typeof entries.fullName === "string" ? entries.fullName : "";
    const payload = {
      formKind: "client" as const,
      firstName: fullName.split(" ")[0] || "",
      lastName: fullName.split(" ").slice(1).join(" ") || "",
      email: typeof entries.email === "string" ? entries.email : "",
      phone: typeof entries.phone === "string" ? entries.phone : "",
      companyName: typeof entries.company === "string" ? entries.company : "",
      source: "Client Landing Page",
      tags: ["OZ Tech Client Intake", "Founding Member Application"],
      entries,
    };

    try {
      const response = await fetch("/api/ghl-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const detail =
          typeof result?.details === "string"
            ? result.details
            : typeof result?.error === "string"
            ? result.error
            : "Submission failed. Please try again or email us directly.";
        setSubmitError(detail);
        console.error("GHL lead capture failed:", result);
        return;
      }
      setSubmitted(true);
    } catch (error) {
      console.error("GHL lead capture failed:", error);
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[28px] sm:rounded-[40px] border-2 border-[#d4dce6]/60 bg-white p-6 sm:p-10 md:p-14 shadow-2xl text-center oz-glass-card oz-skew-frame oz-vine-border">
        <div className="w-20 h-20 bg-[#5df3c2]/15 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl text-[#006c40]">✓</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-black text-[#021f0d] uppercase tracking-tighter">
          Application Received
        </h3>
        <p className="mt-4 text-lg text-[#021f0d]/70 max-w-md mx-auto leading-relaxed">
          We review applications within 48 hours. If it's a strong fit, we'll
          email you to schedule a Platform Audit call.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="text-left space-y-8 text-[#021f0d]"
      style={{ colorScheme: "light" }}
    >
      <div ref={topRef} className="flex items-center justify-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006c40]/70">
          Step {step + 1} of {totalSteps}
        </p>
      </div>

      {sections.map((section, sIdx) => {
        const isActive = sIdx === step;
        return (
          <div
            key={section.section}
            data-step={sIdx}
            hidden={!isActive}
            aria-hidden={!isActive}
            className={isActive ? "" : "hidden"}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 sm:p-6 md:p-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#d4dce6]/60 shadow-xl oz-glass-card oz-skew-frame oz-vine-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#021f0d] text-white flex items-center justify-center font-bold">
                  0{sIdx + 1}
                </span>
                <h3 className="text-lg sm:text-2xl font-heading font-black text-[#021f0d] uppercase tracking-tighter leading-tight">
                  {section.section}
                </h3>
              </div>

              <div className="grid gap-6">
                {section.fields.map((field) => {
                  const required = isActive && field.required;
                  return (
                    <div key={field.name} className="space-y-3">
                      <label className="block text-sm font-bold uppercase tracking-widest text-[#006c40]/70">
                        {field.label}
                      </label>

                      {["text", "email", "tel", "url"].includes(field.type) && (
                        <input
                          required={required}
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder || field.label}
                          className="w-full h-12 sm:h-14 rounded-xl border-2 border-[#d4dce6]/60 px-4 sm:px-6 text-base sm:text-lg text-[#021f0d] placeholder:text-[#021f0d]/40 bg-white focus:border-[#006c40] focus:outline-none transition-colors"
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          required={required}
                          name={field.name}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full rounded-xl border-2 border-[#d4dce6]/60 p-4 sm:p-6 text-base sm:text-lg text-[#021f0d] placeholder:text-[#021f0d]/40 bg-white focus:border-[#006c40] focus:outline-none transition-colors"
                        />
                      )}

                      {field.type === "radio" && (
                        <div className="grid gap-3">
                          {field.options?.map((opt) => (
                            <label
                              key={opt}
                              className="flex min-h-12 items-center gap-3 p-3 sm:p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group touch-manipulation"
                            >
                              <input
                                type="radio"
                                name={field.name}
                                required={required}
                                value={opt}
                                className="w-4 h-4 accent-[#006c40]"
                              />
                              <span className="text-base font-medium text-[#021f0d]/70 group-hover:text-[#006c40]">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "select" && (
                        <select
                          name={field.name}
                          required={required}
                          className="w-full h-12 sm:h-14 rounded-xl border-2 border-[#d4dce6]/60 px-4 sm:px-6 text-base sm:text-lg text-[#021f0d] focus:border-[#006c40] focus:outline-none bg-white"
                        >
                          <option value="">Select option...</option>
                          {field.options?.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      )}

                      {field.type === "checkbox" && (
                        <div className="grid sm:grid-cols-2 gap-3">
                          {field.options?.map((opt) => (
                            <label
                              key={opt}
                              className="flex min-h-12 items-center gap-3 p-3 sm:p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group touch-manipulation"
                            >
                              <input
                                type="checkbox"
                                name={field.name}
                                value={opt}
                                className="w-4 h-4 accent-[#006c40]"
                              />
                              <span className="text-sm font-medium text-[#021f0d]/70 group-hover:text-[#006c40]">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === "checkbox-group" && (
                        <div className="space-y-3">
                          {field.options?.map((opt) => (
                            <label
                              key={opt}
                              className="flex min-h-12 items-start gap-4 p-3 sm:p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#006c40]/20 cursor-pointer transition-colors group touch-manipulation"
                            >
                              <input
                                type="checkbox"
                                name={field.name}
                                value={opt}
                                required={required}
                                className="mt-1 w-4 h-4 accent-[#006c40]"
                              />
                              <span className="text-sm font-semibold text-[#021f0d]/70 group-hover:text-[#006c40]">
                                {opt}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        );
      })}

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={step === 0}
          className="min-h-11 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#d4dce6]/60 text-[#021f0d]/70 disabled:opacity-40 touch-manipulation"
        >
          Back
        </button>
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="min-h-11 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#021f0d] bg-[#021f0d] text-white touch-manipulation"
          >
            Next
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="min-h-[3.5rem] sm:min-h-[4rem] px-8 sm:px-10 rounded-[20px] sm:rounded-[24px] bg-[#effc5f] text-[#021f0d] text-sm sm:text-base font-heading font-black uppercase tracking-widest shadow-2xl hover:bg-[#d7e851] transition-all flex items-center justify-center gap-3 oz-button-glow disabled:opacity-60 touch-manipulation"
          >
            {submitting ? "Submitting..." : "Submit My Application"}
            <span className="text-xl">→</span>
          </motion.button>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-600 font-semibold text-center">
          {submitError}
        </p>
      )}
    </form>
  );
}
