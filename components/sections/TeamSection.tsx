"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const teamMembers = [
  { name: "Cris Vinson", image: "/members/Cris.png" },
  { name: "Jed Matthew Mamosto", image: "/members/Jed.png" },
  { name: "Louie Dale Cervera", image: "/members/Louie.png" },
  { name: "Franz Eliezer Samilo", image: "/members/Franz.png" },
];

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
};

export default function TeamSection() {
  return (
    <section
      id="founders"
      className="px-6 md:px-10 py-8 md:py-10 section-viewport flex items-center justify-center relative overflow-hidden bg-white"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-4 py-1.5 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-[#006c40] mb-6 md:mb-10">
          The Human Engine
        </span>
        <ScrollReveal
          textClassName="text-[#021f0d] text-center"
          textSize="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
        >
          Proven Engineers. Product Visionaries.
        </ScrollReveal>

        <motion.div
          {...cardMotion}
          className="mt-8 md:mt-10 relative group cursor-pointer"
        >
          <Link href="/team">
            <div className="relative h-[260px] sm:h-[300px] md:h-[420px] w-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl">
              <Image
                src="/software-design.jpg"
                alt="The OZ Team"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[10000ms]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#021f0d] via-[#021f0d]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-12 text-white text-left">
                <p className="text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#5df3c2] mb-2 md:mb-4">Founding Personnel</p>
                <h3 className="text-xl md:text-4xl font-heading font-black uppercase tracking-tighter leading-none mb-3 md:mb-5">
                  Meet The Assets Behind The Machine.
                </h3>
                <div className="flex items-center gap-3 md:gap-6">
                  <div className="oz-btn-primary px-4 md:px-8 group/btn text-[10px] md:text-sm">
                    Examine The Team <ArrowRight className="inline-block ml-3 group-hover/btn:translate-x-2 transition-transform" size={16} />
                  </div>
                  <div className="hidden sm:flex -space-x-3">
                    {teamMembers.map((m, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-3 border-[#021f0d] bg-white/10 backdrop-blur-md overflow-hidden relative">
                        <Image src={m.image} alt={m.name} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
