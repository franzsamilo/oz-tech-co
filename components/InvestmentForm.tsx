"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function InvestmentForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#d4dce6] bg-white p-8 md:p-10 shadow-md">
        <h3 className="text-2xl font-heading font-semibold text-[#0f172a]">
          Thank You for Applying!
        </h3>
        <p className="mt-3 text-base md:text-lg text-[#475569]">
          We’ll review your application within 48 hours. If you’re a strategic
          fit, we’ll email you to schedule a 30-minute Platform Audit call.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="space-y-8 rounded-2xl border border-[#d4dce6] bg-white p-8 md:p-10 shadow-md"
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">
          Basic Information
        </h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <input
            required
            name="fullName"
            placeholder="Full Name*"
            className="w-full rounded-lg border border-[#d4dce6] px-5 py-4 text-base md:text-lg focus:border-[#c48a3f] focus:outline-none"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email Address*"
            className="w-full rounded-lg border border-[#d4dce6] px-5 py-4 text-base md:text-lg focus:border-[#c48a3f] focus:outline-none"
          />
          <input
            name="phone"
            placeholder="Phone Number (optional)"
            className="w-full rounded-lg border border-[#d4dce6] px-5 py-4 text-base md:text-lg focus:border-[#c48a3f] focus:outline-none"
          />
          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            className="w-full rounded-lg border border-[#d4dce6] px-5 py-4 text-base md:text-lg focus:border-[#c48a3f] focus:outline-none"
          />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">
          Investor Qualification
        </h3>
        <div className="mt-3 space-y-3 text-base md:text-lg text-[#0f172a]">
          <label className="flex items-start gap-2">
            <input type="radio" name="accredited" required />
            Yes - I have annual income of $200K+ or net worth of $1M+.
          </label>
          <label className="flex items-start gap-2">
            <input type="radio" name="accredited" />
            No - I do not meet accredited investor requirements.
          </label>
          <label className="flex items-start gap-2">
            <input type="radio" name="accredited" />
            Unsure - Please explain accredited investor requirements.
          </label>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">
          Investment Intent
        </h3>
        <div className="mt-3 grid gap-3 text-base md:text-lg text-[#0f172a]">
          <label className="flex items-center gap-2">
            <input type="radio" name="range" required />
            $10,000
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="range" />
            $15,000
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="range" />
            $20,000
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="range" />
            $25,000
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="range" />
            Still exploring / want to learn more
          </label>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">Strategic Fit</h3>
        <div className="mt-3 grid gap-3 text-base md:text-lg text-[#0f172a]">
          {[
            "The retainer business model",
            "Technology sovereignty mission",
            "SaaS growth potential",
            "Team track record",
            "Market opportunity",
            "Values alignment",
            "Personal connection to the problem",
          ].map((item) => (
            <label key={item} className="flex items-start gap-2">
              <input type="checkbox" name="fit" />
              {item}
            </label>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">
          Value Beyond Capital
        </h3>
        <textarea
          name="value"
          rows={4}
          placeholder="Beyond capital, what value can you bring to Oz Tech?"
          className="mt-3 w-full rounded-lg border border-[#d4dce6] px-5 py-4 text-base md:text-lg focus:border-[#c48a3f] focus:outline-none"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#0f172a]">
          Legal Acknowledgment
        </h3>
        <label className="mt-3 flex items-start gap-2 text-base md:text-lg text-[#0f172a]">
          <input type="checkbox" required />
          I understand and acknowledge this investment involves significant
          risk, including loss of my entire investment, and is suitable for
          accredited investors only.
        </label>
      </motion.div>

      <motion.button
        variants={itemVariants}
        type="submit"
        className="w-full rounded-lg bg-[#1e3a5f] px-8 py-4 text-base md:text-lg font-semibold text-white transition hover:bg-[#162c4a] hover:shadow-[0_0_0_4px_rgba(196,138,63,0.25)]"
      >
        Submit My Application
      </motion.button>
    </motion.form>
  );
}
