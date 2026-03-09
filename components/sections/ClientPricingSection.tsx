"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { clientPricing } from "@/data/clientPageContent";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function ClientPricingSection() {
  const [openPanel, setOpenPanel] = useState<"included" | "addons" | "terms" | null>("included");

  return (
    <section
      id="client-pricing"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center bg-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          Transparent Pricing
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          {clientPricing.headline}
        </ScrollReveal>
        <motion.p {...cardMotion} className="mt-4 text-sm md:text-lg text-[#021f0d]/70 max-w-3xl mx-auto">
          {clientPricing.rate}
        </motion.p>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 bg-[#021f0d] text-white p-5 md:p-10 rounded-3xl md:rounded-[48px] shadow-2xl relative overflow-hidden oz-emerald-card text-left hidden md:block"
        >
          <div className="absolute top-0 right-0 p-6 md:p-12 text-[12vw] font-black opacity-5 select-none leading-none">$3,500</div>
          <div className="relative z-10">
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#5df3c2] mb-3 md:mb-5">
              Founding Member Rate
            </p>
            <h3 className="text-2xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-3 md:mb-5 leading-none">
              $3,500 / Month
            </h3>
            <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed mb-4 md:mb-8">{clientPricing.rate}</p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-8">
              {clientPricing.included.map((t: string) => (
                <span key={t} className="px-3 md:px-5 py-2 md:py-3 rounded-xl bg-white/10 border border-white/20 font-bold text-[10px] md:text-sm uppercase tracking-wide md:tracking-widest">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 md:pt-8 border-t border-white/10">
              <p className="text-[10px] md:text-xs font-black uppercase tracking-wide md:tracking-widest text-[#5df3c2] mb-2 md:mb-4">
                Add-ons & Terms
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-black mb-2">Add-ons</p>
                  {clientPricing.addOns.map((item) => (
                    <p key={item} className="text-xs md:text-sm text-white/70 font-medium">
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/50 font-black mb-2">Payment Terms</p>
                  {clientPricing.terms.map((item) => (
                    <p key={item} className="text-xs md:text-sm text-white/70 font-medium">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 md:hidden text-left bg-[#021f0d] text-white rounded-3xl p-4 shadow-2xl oz-emerald-card">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5df3c2] mb-3">Founding Member Rate</p>
          <h3 className="text-xl font-heading font-black uppercase tracking-tighter mb-3 leading-tight">
            $3,500 / Month
          </h3>
          <p className="text-xs text-white/70 font-medium leading-relaxed mb-4">
            {clientPricing.rate}
          </p>

          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "included" ? null : "included")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px]"
            >
              Included
              <span className="text-xs">{openPanel === "included" ? "−" : "+"}</span>
            </button>
            {openPanel === "included" && (
              <div className="flex flex-wrap gap-2 px-1 pb-2">
                {clientPricing.included.map((t: string) => (
                  <span key={t} className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 font-bold text-[10px] uppercase tracking-wide">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "addons" ? null : "addons")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px]"
            >
              Add-ons
              <span className="text-xs">{openPanel === "addons" ? "−" : "+"}</span>
            </button>
            {openPanel === "addons" && (
              <div className="grid gap-2 px-1 pb-2 text-xs font-bold text-white/80">
                {clientPricing.addOns.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "terms" ? null : "terms")}
              className="w-full text-left flex items-center justify-between rounded-2xl border border-white/10 px-3 py-2 font-bold uppercase tracking-[0.2em] text-[10px]"
            >
              Payment Terms
              <span className="text-xs">{openPanel === "terms" ? "−" : "+"}</span>
            </button>
            {openPanel === "terms" && (
              <div className="grid gap-2 px-1 pb-2 text-xs font-bold text-white/80">
                {clientPricing.terms.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        <motion.p {...cardMotion} className="mt-6 text-sm md:text-lg text-[#021f0d]/70">
          {clientPricing.totalValue}
        </motion.p>
      </div>
    </section>
  );
}
