"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Zap } from "lucide-react";

const teamMembers = [
  {
    name: "Cris Vinson",
    title: "Co-Founder & Strategic Lead",
    image: "/members/Cris.png",
    bio: "Visionary strategist behind the Unlimited Build Method. Cris has orchestrated over 100 successful product launches, specializing in high-velocity growth and human-centric software models.",
    expertise: [
      "Business Strategy",
      "Client Relations",
      "Product Vision",
      "Team Leadership",
    ],
    motto: "Software should empower ownership, not create dependency.",
    details: [
      "10+ Years in Strategic Operations",
      "Built systems generating $100M+ for clients",
      "Specialist in Radical Transparency models"
    ]
  },
  {
    name: "Jed Matthew Mamosto",
    title: "Tech Lead & Head Engineer",
    image: "/members/Jed.png",
    bio: "The architect of stability. Jed leads our engineering team with a focus on scalable infrastructure and seamless AI integration. He ensures that every line of code is a long-term asset.",
    expertise: [
      "Full-Stack Dev",
      "Systems Architect",
      "Database Design",
      "AI Integration",
    ],
    motto: "Engineering assets, not just writing code.",
    details: [
      "Engineered Civy's primary payment backbone",
      "Expert in low-latency AI response systems",
      "Infrastructure specialist focusing on 99.9% uptime"
    ]
  },
  {
    name: "Louie Dale Cervera",
    title: "Backend Software Engineer",
    image: "/members/Louie.png",
    bio: "Scale specialist. Louie designs the robust backends that drive our most complex payment routing and multi-tenant systems. His focus is on security and performance at scale.",
    expertise: [
      "Server Architecture",
      "Security Protocols",
      "Cloud Scale",
      "Core Logic",
    ],
    motto: "Complexity is the enemy of reliability.",
    details: [
      "Architected secure multi-tenant cloud infrastructure",
      "Cloud security specialist for conservation platforms",
      "Performance optimization guru"
    ]
  },
  {
    name: "Matthew Ledesma",
    title: "Project Manager",
    image: "/members/Matthew L..png",
    bio: "The guard of velocity. Matthew maintains the 4-week launch rhythm that defines OZ Tech. He bridges the gap between vision and deployment with ruthless efficiency.",
    expertise: [
      "Execution Roadmap",
      "Daily Ops",
      "Project Velocity",
      "Quality Guard",
    ],
    motto: "Speed is a byproduct of clarity.",
    details: [
      "Project lead for the Mentoria platform scale",
      "Expert in 2-week agile sprint management",
      "Quality assurance specialist"
    ]
  },
  {
    name: "Franz Eliezer Samilo",
    title: "Frontend Software Engineer",
    image: "/members/Franz.png",
    bio: "Craftsman of experience. Franz translates complex data into intuitive, high-conversion interfaces. He is the guardian of the OZ Tech visual identity and unit economic clarity.",
    expertise: [
      "Human-Centric Design",
      "Brand Identity",
      "Visual Craft",
      "Product Design",
    ],
    motto: "Visuals should command respect and drive results.",
    details: [
      "Designer of the primary OZ Tech investment portal",
      "Specialist in high-conversion UI/UX patterns",
      "Expert in GSAP and high-performance web animations"
    ]
  },
];

export default function TeamClient() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <main
      data-theme="dark"
      className="min-h-screen w-full bg-[#021f0d] text-white selection:bg-[#5df3c2] selection:text-[#021f0d] overflow-hidden lg:h-screen lg:w-screen lg:fixed lg:inset-0"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 oz-maze-overlay opacity-20" />
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[#5df3c2]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[#5df3c2]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>


      {/* Team Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row lg:h-full">

        {/* Left Side: Dynamic Image Area */}
        <div className="lg:w-[45%] h-[45vh] min-h-[320px] lg:h-full relative shrink-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={teamMembers[activeIdx].image}
                alt={teamMembers[activeIdx].name}
                fill
                className="object-cover object-center lg:object-[center_20%]"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#021f0d] via-[#021f0d]/40 to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-transparent lg:to-[#021f0d]/60" />
            </motion.div>
          </AnimatePresence>

          {/* Social Proof Overlays */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex justify-between items-end z-20">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-white/5 backdrop-blur-xl p-6 rounded-[32px] border border-white/10 hidden xl:block max-w-xs"
            >
              <p className="font-mono text-[#effc5f] uppercase tracking-[0.3em] text-[10px] mb-4">Founding Asset</p>
              <p className="text-lg font-black italic leading-tight text-white">"{teamMembers[activeIdx].motto}"</p>
            </motion.div>

            {/* Member thumbnail navigation */}
            <div className="flex gap-3">
               {teamMembers.map((member, i) => (
                 <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative w-12 h-12 overflow-hidden transition-all duration-500 rounded-lg border ${
                    i === activeIdx
                      ? "border-[#5df3c2] scale-110 shadow-[0_0_16px_rgba(93,243,194,0.3)]"
                      : "border-[#5df3c2]/30 opacity-60 hover:opacity-90 hover:border-[#5df3c2]/60"
                  }`}
                 >
                   <Image
                     src={member.image}
                     alt={member.name}
                     fill
                     className="object-cover object-center"
                   />
                   {i === activeIdx && (
                     <div className="absolute inset-0 bg-[#5df3c2]/10" />
                   )}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Bio Area */}
        <div className="lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-8 sm:py-12 relative lg:overflow-hidden lg:h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl w-full mx-auto flex flex-col justify-center min-h-full lg:min-h-0"
            >
              <div className="flex items-center gap-4 mb-5 lg:mb-8">
                <span className="font-mono text-[#effc5f] uppercase tracking-widest text-xs">Personnel 0{activeIdx + 1}</span>
                <div className="h-px w-10 lg:w-20 bg-[#effc5f]/30" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-heading font-black uppercase tracking-tighter leading-none mb-3 lg:mb-4 text-white oz-gold-underline oz-visible">
                {teamMembers[activeIdx].name}
              </h1>

              <h2 className="font-mono text-[#effc5f] uppercase tracking-widest text-xs mb-5 lg:mb-8 leading-none">
                {teamMembers[activeIdx].title}
              </h2>

              <p className="text-sm sm:text-base xl:text-lg text-white/80 font-medium leading-relaxed mb-6 lg:mb-10 max-w-2xl">
                {teamMembers[activeIdx].bio}
              </p>

              {/* Bio card with oz-forest-card and gem-cut clip-path */}
              <div
                className="oz-forest-card p-5 lg:p-8 mb-6 lg:mb-10"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
              >
                <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="font-mono text-[#effc5f]/60 uppercase tracking-widest text-[10px]">Core Expertise</h3>
                    <div className="space-y-2 lg:space-y-3">
                      {teamMembers[activeIdx].expertise.map((exp) => (
                        <div key={exp} className="flex gap-3 lg:gap-4 items-center">
                          <span className="w-5 h-5 lg:w-6 lg:h-6 rounded bg-[#5df3c2]/10 border border-[#5df3c2]/20 flex items-center justify-center text-[#5df3c2]">
                             <Zap size={10} />
                          </span>
                          <span className="text-sm lg:text-lg font-black uppercase tracking-tight text-white">{exp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 lg:space-y-6">
                    <h3 className="font-mono text-[#effc5f]/60 uppercase tracking-widest text-[10px]">Strategic Impact</h3>
                    <div className="space-y-2 lg:space-y-3">
                      {teamMembers[activeIdx].details.map((detail) => (
                        <div key={detail} className="flex gap-3 lg:gap-4 items-start">
                          <span className="w-5 h-5 lg:w-6 lg:h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mt-1 shrink-0">
                             <Shield size={10} />
                          </span>
                          <span className="text-xs lg:text-base font-medium text-white/80 leading-tight italic">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 lg:pt-8 border-t border-white/10 flex flex-wrap gap-4 sm:gap-5 lg:gap-8 items-center pb-8 lg:pb-0">
                <a href="/#application" className="oz-btn-primary px-6 lg:px-12 text-xs sm:text-sm lg:text-base group whitespace-nowrap min-h-11 inline-flex items-center justify-center touch-manipulation">
                  Apply with Oz <ArrowRight className="inline-block ml-2 lg:ml-4 group-hover:translate-x-2 transition-transform" />
                </a>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <Link href="/" className="text-[#effc5f] hover:text-white font-black uppercase tracking-widest text-[10px] lg:text-xs transition-colors flex items-center gap-3 whitespace-nowrap min-h-11 touch-manipulation">
                    <ArrowLeft size={14} className="text-[#effc5f]" /> Back home
                  </Link>
                  <Link href="/invest" className="text-white/35 hover:text-[#5df3c2] font-black uppercase tracking-widest text-[10px] lg:text-xs transition-colors whitespace-nowrap min-h-11 inline-flex items-center touch-manipulation">
                    Investor deck
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators for active member */}
          <div className="absolute top-1/2 right-6 lg:right-12 -translate-y-1/2 hidden xl:flex flex-col gap-4 lg:gap-8">
            {teamMembers.map((_, i) => (
               <div
                 key={i}
                 className={`w-1.5 rounded-full transition-all duration-500 ${
                   i === activeIdx
                     ? 'bg-[#effc5f] h-8 lg:h-10'
                     : 'bg-[#effc5f]/20 h-4 lg:h-6'
                 }`}
               />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
