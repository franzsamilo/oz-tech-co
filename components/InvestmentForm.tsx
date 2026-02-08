"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { applicationFields } from "@/data/seedPageContent";

interface AppField {
  label: string;
  type: string;
  name: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  helpText?: string;
}

interface AppSection {
  section: string;
  fields: AppField[];
}

export default function InvestmentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sections = applicationFields as unknown as AppSection[];

  if (submitted) {
    return (
      <div className="rounded-[40px] border-2 border-[#d4dce6]/60 bg-white p-12 md:p-16 shadow-2xl text-center">
        <div className="w-20 h-20 bg-[#5df3c2]/15 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-4xl text-[#006c40]">✓</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-heading font-black text-[#021f0d] uppercase tracking-tighter">
          Application Received
        </h3>
        <p className="mt-4 text-lg text-[#021f0d]/70 max-w-md mx-auto leading-relaxed">
          We review all strategic applications within 48 hours. If there's an alignment, we'll reach out to schedule your Platform Audit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="text-left space-y-12">
      {sections.map((section, sIdx) => (
        <motion.div 
          key={section.section}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[32px] border-2 border-[#d4dce6]/60 shadow-xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-10 h-10 rounded-xl bg-[#021f0d] text-white flex items-center justify-center font-bold">0{sIdx + 1}</span>
            <h3 className="text-2xl font-heading font-black text-[#021f0d] uppercase tracking-tighter">{section.section}</h3>
          </div>

          <div className="grid gap-8">
            {section.fields.map((field) => (
              <div key={field.name} className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-widest text-[#006c40]/70">
                  {field.label}
                </label>
                
                {['text', 'email', 'tel', 'url'].includes(field.type) && (
                  <input
                    required={field.required}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder || field.label}
                    className="w-full h-14 rounded-xl border-2 border-[#d4dce6]/60 px-6 text-lg focus:border-[#006c40] focus:outline-none transition-colors"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    required={field.required}
                    name={field.name}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-xl border-2 border-[#d4dce6]/60 p-6 text-lg focus:border-[#006c40] focus:outline-none transition-colors"
                  />
                )}

                {field.type === 'radio' && (
                  <div className="grid gap-3">
                    {field.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group">
                        <input type="radio" name={field.name} required={field.required} value={opt} className="w-4 h-4 accent-[#006c40]" />
                        <span className="text-base font-medium text-[#021f0d]/70 group-hover:text-[#006c40]">{opt}</span>
                      </label>
                    ))}
                    {field.helpText && <p className="text-xs text-[#021f0d]/60 italic mt-2">{field.helpText}</p>}
                  </div>
                )}

                {field.type === 'select' && (
                  <select name={field.name} required={field.required} className="w-full h-14 rounded-xl border-2 border-[#d4dce6]/60 px-6 text-lg focus:border-[#006c40] focus:outline-none bg-white">
                    <option value="">Select option...</option>
                    {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                )}

                {field.type === 'checkbox' && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {field.options?.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#5df3c2]/40 cursor-pointer transition-colors group">
                        <input type="checkbox" name={field.name} value={opt} className="w-4 h-4 accent-[#006c40]" />
                        <span className="text-sm font-medium text-[#021f0d]/70 group-hover:text-[#006c40]">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === 'checkbox-group' && (
                  <div className="space-y-3">
                    {field.options?.map((opt) => (
                      <label key={opt} className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#d4dce6]/30 hover:border-[#006c40]/20 cursor-pointer transition-colors group">
                        <input type="checkbox" required={field.required} className="mt-1 w-4 h-4 accent-[#006c40]" />
                        <span className="text-sm font-semibold text-[#021f0d]/70 group-hover:text-[#006c40]">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full h-20 rounded-[32px] bg-[#effc5f] text-[#021f0d] text-xl font-heading font-black uppercase tracking-widest shadow-2xl hover:bg-[#d7e851] transition-all flex items-center justify-center gap-4 oz-button-glow"
      >
        Submit Initial Application <span className="text-2xl">→</span>
      </motion.button>
    </form>
  );
}
