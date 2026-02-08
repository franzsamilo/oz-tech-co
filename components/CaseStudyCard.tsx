"use client";

import { motion } from "motion/react";

interface CaseStudyCardProps {
  title: string;
  client: string;
  challenge: string;
  built: string;
  result: string;
  timeline: string;
}

export default function CaseStudyCard({
  title,
  client,
  challenge,
  built,
  result,
  timeline,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-[#d4dce6]/60 border-l-4 border-l-[#5df3c2] bg-white backdrop-blur-sm p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#021f0d]">
        {title}
      </h3>
      <p className="mt-2 text-base md:text-lg text-[#021f0d]/70">{client}</p>
      <div className="mt-4 space-y-3 text-base md:text-lg text-[#021f0d]">
        <p>
          <span className="font-semibold">Challenge:</span> {challenge}
        </p>
        <p>
          <span className="font-semibold">Built:</span> {built}
        </p>
        <p>
          <span className="font-semibold">Result:</span> {result}
        </p>
        <p>
          <span className="font-semibold">Timeline:</span> {timeline}
        </p>
      </div>
    </motion.div>
  );
}
