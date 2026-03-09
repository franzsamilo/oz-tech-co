"use client";

import { useMemo, useState } from "react";
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

const stepsPerView = 1;

export default function ClientApplicationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const sections = clientApplicationFields as unknown as AppSection[];
  const totalSteps = Math.ceil(sections.length / stepsPerView);
  const currentSections = useMemo(
    () => sections.slice(step * stepsPerView, step * stepsPerView + stepsPerView),
    [sections, step]
  );

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const entries = Object.fromEntries(formData.entries());

    const payload = {
      firstName: (entries.fullName as string | undefined)?.split(" ")[0] || "",
      lastName:
        (entries.fullName as string | undefined)?.split(" ").slice(1).join(" ") || "",
      email: entries.email || "",
      phone: entries.phone || "",
      companyName: entries.company || "",
      source: entries.source || "Client Landing Page",
      tags: ["OZ Tech Client Intake", "Founding Member Application"],
      customFields: entries,
    };

    try {
      const response = await fetch("/api/ghl-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setSubmitError("Submission failed. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch (error) {
      setSubmitError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[40px] border-2 border-[#d4dce6]/60 bg-white p-10 md:p-14 shadow-2xl text-center oz-glass-card oz-skew-frame oz-vine-border">
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
    <form onSubmit={handleSubmit} className="text-left space-y-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#006c40]/70">
          Step {step + 1} of {totalSteps}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#d4dce6]/60 text-[#021f0d]/70 disabled:opacity-40"
          >
            Back
          </button>
          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#021f0d] bg-[#021f0d] text-white"
            >
              Next
            </button>
          ) : null}
        </div>
      </div>

      {currentSections.map((section, sIdx) => (
        <motion.div
          key={section.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 md:p-10 rounded-[32px] border-2 border-[#d4dce6]/60 shadow-xl oz-glass-card oz-skew-frame oz-vine-border"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-10 rounded-xl bg-[#021f0d] text-white flex items-center justify-center font-bold">
              0{step + 1}
            </span>
            <h3 className="text-2xl font-heading font-black text-[#021f0d] uppercase tracking-tighter">
              {section.section}
            </h3>
          </div>

          <div className="grid gap-6">
            {section.fields.map((field) => (
              <div key={field.name} className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-widest text-[#006c40]/70">
                  {field.label}
                </label>

                {["text", "email", "tel", "url"].includes(field.type) && (
                  <input
                    required={field.required}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || field.label}
                    className="w-full h-14 rounded-xl border-2 border-[#d4dce6]/60 px-6 text-lg focus:border-[#006c40] focus:outline-none transition-colors"
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    required={field.required}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-xl border-2 border-[#d4dce6]/60 p-6 text-lg focus:border-[#006c40] focus:outline-none transition-colors"
                  />
                )}

                {field.type === "radio" && (
                  <div className="grid gap-3">
                    {field.options?.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group"
                      >
                        <input
                          type="radio"
                          name={field.name}
                          required={field.required}
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
                    required={field.required}
                    className="w-full h-14 rounded-xl border-2 border-[#d4dce6]/60 px-6 text-lg focus:border-[#006c40] focus:outline-none bg-white"
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
                        className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group"
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
                        className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#006c40]/20 cursor-pointer transition-colors group"
                      >
                        <input
                          type="checkbox"
                          name={field.name}
                          value={opt}
                          required={field.required}
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
            ))}
          </div>
        </motion.div>
      ))}

      {step === totalSteps - 1 ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="w-full h-20 rounded-[32px] bg-[#effc5f] text-[#021f0d] text-xl font-heading font-black uppercase tracking-widest shadow-2xl hover:bg-[#d7e851] transition-all flex items-center justify-center gap-4 oz-button-glow disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit My Application"}{" "}
          <span className="text-2xl">→</span>
        </motion.button>
      ) : null}

      {submitError && (
        <p className="text-sm text-red-600 font-semibold text-center">
          {submitError}
        </p>
      )}
    </form>
  );
}
