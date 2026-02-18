"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, Zap, Target, Cpu, MessageSquare, Globe } from "lucide-react";
import PillNav from "@/components/PillNav";
import OzLogo from "@/components/OzLogo";

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

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/#truth" },
  { label: "System", href: "/#system" },
  { label: "Case Studies", href: "/#proof" },
  { label: "Unit Math", href: "/#model" },
  { label: "Investor Terms", href: "/#investment" },
  { label: "Team", href: "/team" },
  { label: "FAQ", href: "/#faq" },
  { label: "Apply Now", href: "/#application" },
];

export default function TeamPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <main className="h-screen w-screen bg-[#021f0d] text-white selection:bg-[#5df3c2] selection:text-[#021f0d] overflow-hidden fixed inset-0">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 oz-maze-overlay opacity-20" />
        <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[#5df3c2]/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-[#5df3c2]/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>


      {/* Team Content */}
      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Dynamic Image Area */}
        <div className="lg:w-[45%] h-[40vh] lg:h-full relative flex-shrink-0 overflow-hidden">
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
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end z-20">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-white/5 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 hidden xl:block max-w-xs"
            >
              <p className="text-[#5df3c2] font-black uppercase tracking-[0.3em] text-[10px] mb-4">Founding Asset</p>
              <p className="text-lg font-black italic leading-tight">"{teamMembers[activeIdx].motto}"</p>
            </motion.div>
            
            <div className="flex gap-4">
               {teamMembers.map((_, i) => (
                 <button 
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-12 rounded-full transition-all duration-500 flex items-center justify-center overflow-hidden border ${
                    i === activeIdx ? "w-24 bg-[#5df3c2] border-[#5df3c2]" : "w-12 bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                 >
                   {i === activeIdx ? (
                     <span className="text-[#021f0d] font-black text-xs">0{i+1}</span>
                   ) : (
                     <span className="text-white/40 font-black text-xs">0{i+1}</span>
                   )}
                 </button>
               ))}
            </div>
          </div>
        </div>

        {/* Right Side: Detailed Bio Area */}
        <div className="lg:w-[55%] h-full flex flex-col justify-center px-8 sm:px-12 md:px-24 py-12 relative overflow-y-auto lg:overflow-hidden scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl w-full mx-auto flex flex-col justify-center min-h-full lg:min-h-0"
            >
              <div className="flex items-center gap-6 mb-6 lg:mb-8">
                <span className="text-xs lg:text-sm font-black uppercase tracking-[0.5em] text-[#5df3c2]">Personnel 0{activeIdx + 1}</span>
                <div className="h-px w-12 lg:w-20 bg-[#5df3c2]/30" />
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-heading font-black uppercase tracking-tighter leading-none mb-4 lg:mb-4">
                {teamMembers[activeIdx].name}
              </h1>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-heading font-bold text-[#5df3c2] uppercase italic tracking-tighter mb-6 lg:mb-8 leading-none">
                {teamMembers[activeIdx].title}
              </h2>

              <p className="text-base sm:text-lg xl:text-xl text-white/70 font-medium leading-relaxed mb-8 lg:mb-10 max-w-2xl">
                {teamMembers[activeIdx].bio}
              </p>

              <div className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-8 lg:mb-12">
                <div className="space-y-4 lg:space-y-6">
                  <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2]/40">Core Expertise</h3>
                  <div className="space-y-2 lg:space-y-3">
                    {teamMembers[activeIdx].expertise.map((exp) => (
                      <div key={exp} className="flex gap-3 lg:gap-4 items-center">
                        <span className="w-5 h-5 lg:w-6 lg:h-6 rounded bg-[#5df3c2]/10 border border-[#5df3c2]/20 flex items-center justify-center text-[#5df3c2]">
                           <Zap size={10} />
                        </span>
                        <span className="text-base lg:text-lg font-black uppercase tracking-tight">{exp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 lg:space-y-6">
                  <h3 className="text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2]/40">Strategic Impact</h3>
                  <div className="space-y-2 lg:space-y-3">
                    {teamMembers[activeIdx].details.map((detail) => (
                      <div key={detail} className="flex gap-3 lg:gap-4 items-start">
                        <span className="w-5 h-5 lg:w-6 lg:h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mt-1 shrink-0">
                           <Shield size={10} />
                        </span>
                        <span className="text-sm lg:text-base font-medium text-white/60 leading-tight italic">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 lg:pt-8 border-t border-white/10 flex flex-wrap gap-6 lg:gap-8 items-center pb-8 lg:pb-0">
                <a href="/#application" className="oz-btn-primary px-8 lg:px-12 text-sm lg:text-base group whitespace-nowrap">
                  Back the Team <ArrowRight className="inline-block ml-2 lg:ml-4 group-hover:translate-x-2 transition-transform" />
                </a>
                <Link href="/" className="text-white/40 hover:text-white font-black uppercase tracking-widest text-[10px] lg:text-xs transition-colors flex items-center gap-3 whitespace-nowrap">
                  <ArrowLeft size={14} /> Back to Deck
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page Indicator for Desk */}
          <div className="absolute top-1/2 right-6 lg:right-12 -translate-y-1/2 hidden xl:flex flex-col gap-4 lg:gap-8 opacity-20">
            {teamMembers.map((_, i) => (
               <div key={i} className={`w-px h-8 lg:h-12 transition-all duration-500 ${i === activeIdx ? 'bg-[#5df3c2] h-16 lg:h-20 opacity-100' : 'bg-white'}`} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
