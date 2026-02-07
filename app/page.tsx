"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import StaggeredMenu from "@/components/StaggeredMenu";
import PasswordLock from "@/components/PasswordLock";
import CaseStudyCard from "@/components/CaseStudyCard";
import InvestmentForm from "@/components/InvestmentForm";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollVelocity from "@/components/ScrollVelocity";
import LogoLoop from "@/components/LogoLoop";
import OzLogo from "@/components/OzLogo";
import { 
  heroContent, 
  truthSection, 
  visionSection, 
  systemSection, 
  caseStudies, 
  byTheNumbers, 
  businessModel, 
  opportunity, 
  investmentTerms, 
  investors, 
  risks, 
  faqs, 
  testimonials
} from "@/data/seedPageContent";

const sections = [
  { id: "hero", label: "Home" },
  { id: "truth", label: "Truth" },
  { id: "vision", label: "Vision" },
  { id: "system", label: "System" },
  { id: "proof", label: "Proof" },
  { id: "showcase", label: "Showcase" },
  { id: "business-model", label: "Model" },
  { id: "investment", label: "Investment" },
  { id: "founders", label: "Founders" },
  { id: "application", label: "Apply" },
];

const headerLinks = [
  { id: "hero", label: "Home" },
  { id: "proof", label: "Proof" },
  { id: "investment", label: "Investment" },
  { id: "founders", label: "Founders" },
  { id: "faq", label: "FAQ" },
  { id: "application", label: "Apply" },
];

const teamMembers = [
  {
    name: "Cris Vinson",
    title: "Co-Founder & Strategic Lead",
    image: "/members/Cris.png",
    expertise: ["Business Strategy", "Client Relations", "Product Vision", "Team Leadership"]
  },
  {
    name: "Jed Matthew Mamosto",
    title: "Tech Lead & Head Engineer",
    image: "/members/Jed.png",
    expertise: ["Full-Stack Dev", "Systems Architect", "Database Design", "AI Integration"]
  },
  {
    name: "Louie Dale Cervera",
    title: "Backend Software Engineer",
    image: "/members/Louie.png",
    expertise: ["Server Architecture", "Security Protocols", "Cloud Scale", "Core Logic"]
  },
  {
    name: "Matthew Ledesma",
    title: "Project Manager",
    image: "/members/Matthew L..png",
    expertise: ["Execution Roadmap", "Daily Ops", "Project Velocity", "Quality Guard"]
  },
  {
    name: "Franz Eliezer Samilo",
    title: "Frontend Software Engineer",
    image: "/members/Franz.png",
    expertise: ["Human-Centric Design", "Brand Identity", "Visual Craft", "Product Design"]
  }
];

const trustLogos = [
  { node: <span className="text-sm font-semibold text-[#1e3a5f]">Web Summit</span> },
  { node: <span className="text-sm font-semibold text-[#1e3a5f]">2 Comma Club</span> },
  { node: <span className="text-sm font-semibold text-[#1e3a5f]">Gold SaaS Award</span> },
  { node: <span className="text-sm font-semibold text-[#1e3a5f]">Mentoria</span> },
  { node: <span className="text-sm font-semibold text-[#1e3a5f]">Rare PH</span> },
];

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [renderRest, setRenderRest] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  
  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4 },
  };

  useEffect(() => {
    const stored = localStorage.getItem("oztech_seed_access");
    if (stored === "true") setIsUnlocked(true);
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;
    const schedule = () => setRenderRest(true);
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(schedule, { timeout: 1200 });
    } else {
      setTimeout(schedule, 600);
    }
  }, [isUnlocked]);

  // Auto-rotate team carousel
  useEffect(() => {
    if (!renderRest) return;
    const interval = setInterval(() => {
      setCurrentMemberIndex((prev) => (prev + 1) % teamMembers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [renderRest]);

  return (
    <div className="bg-[#f8fafc] text-[#0f172a] overflow-x-hidden">
      <PasswordLock onUnlock={() => setIsUnlocked(true)} />
      
      {isUnlocked && (
        <div className="relative">
          {/* Premium Header */}
          <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-[#1e3a5f]/5">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:py-6 md:px-10">
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                <OzLogo size={40} className="md:w-[48px] md:h-[48px] w-[36px] h-[36px]" />
                <span className="text-xl md:text-2xl font-heading font-black tracking-tighter uppercase text-[#0f172a]">OZ Tech</span>
              </div>
              
              <div className="flex items-center gap-4 md:gap-10">
                <nav className="hidden lg:flex items-center gap-10 text-sm font-display font-bold uppercase tracking-widest text-[#475569]">
                  {headerLinks.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="hover:text-[#c48a3f] transition-colors">
                      {s.label}
                    </a>
                  ))}
                </nav>
                
                <div className="flex items-center gap-3 md:gap-6">
                  <a href="#application" className="hidden xs:inline-flex rounded-full bg-[#1e3a5f] px-6 md:px-8 py-2.5 md:py-3.5 text-xs md:text-sm font-display font-bold uppercase tracking-widest text-white hover:bg-[#c48a3f] transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                    Apply Now
                  </a>
                  <div className="md:hidden flex items-center">
                    <StaggeredMenu 
                      isFixed={true}
                      position="right"
                      items={sections.map(s => ({ label: s.label, ariaLabel: s.label, link: `#${s.id}` }))}
                      colors={["#0f172a", "#1e3a5f", "#c48a3f"]}
                      accentColor="#c48a3f"
                      menuButtonColor="#1e3a5f"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="relative pt-20">
            {/* Hero Section */}
            <section id="hero" className="px-6 md:px-10 py-16 md:py-24 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#0f172a] leading-[1.05] tracking-tighter uppercase text-balance">
                      We're Pulling Back the <span className="text-[#c48a3f]">Curtain</span> on Software
                    </h1>
                    <p className="mt-8 text-xl md:text-2xl text-[#475569] max-w-2xl leading-relaxed text-balance">
                      {heroContent.subheadline}
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
                      <a href="#application" className="w-full sm:w-auto bg-[#c48a3f] text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-widest hover:bg-[#a67535] transition-all text-center">
                        {heroContent.cta}
                      </a>
                      <p className="text-[#1e3a5f] font-semibold text-lg italic">
                        {heroContent.trustLine}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] md:min-h-[500px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl lg:mt-0 mt-8"
                  >
                    <Image src="/software-team.jpg" alt="Team" fill className="object-cover" />
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Banner */}
            <div className="relative z-10 w-full mb-12 px-6 md:px-10">
              <div className="overflow-hidden rounded-3xl bg-white border border-[#1e3a5f]/10 shadow-xl">
                <ScrollVelocity
                  texts={["Fast Launch", "Ownership First", "AI Built", "No Retainers", "Real Profit", "Legacy Focused"]}
                  velocity={20}
                  className="text-2xl md:text-4xl font-display font-black text-[#1e3a5f]"
                  parallaxClassName="py-10"
                />
              </div>
            </div>

            {/* Truth Section */}
            <section id="truth" className="px-6 md:px-10 py-20 md:py-32 flex flex-col justify-center">
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex justify-start mb-8">
                  <span className="rounded-full bg-[#1e3a5f]/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#1e3a5f]">Truth</span>
                </div>
                <ScrollFloat textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                  {truthSection.headline}
                </ScrollFloat>
                <div className="mt-16 grid lg:grid-cols-2 gap-12">
                  <motion.div {...cardMotion} className="bg-white p-10 rounded-[32px] border-2 border-[#d4dce6]/40 shadow-xl">
                    <ul className="space-y-6 text-xl text-[#475569]">
                      {truthSection.bullets.map(b => (
                        <li key={b} className="flex gap-4 items-start">
                          <span className="h-2 w-2 rounded-full bg-[#c48a3f] mt-3 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div {...cardMotion} className="bg-[#1e3a5f] text-white p-10 rounded-[32px] shadow-2xl flex flex-col justify-center">
                    <p className="text-2xl md:text-3xl font-heading font-bold italic">"{truthSection.truth}"</p>
                    <p className="mt-8 text-xl opacity-80 leading-relaxed">{truthSection.difference}</p>
                  </motion.div>
                </div>
              </div>
            </section>

            {renderRest && (
              <>
                {/* Vision / Model */}
                <section id="vision" className="px-6 md:px-10 py-20 md:py-32 flex flex-col justify-center section-alt">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="flex justify-start mb-8">
                      <span className="rounded-full bg-[#c48a3f]/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#c48a3f]">Model</span>
                    </div>
                    <ScrollReveal textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      {visionSection.headline}
                    </ScrollReveal>
                    <div className="mt-16 grid lg:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <motion.div {...cardMotion} className="bg-white p-6 md:p-10 rounded-3xl border border-[#d4dce6]/60 shadow-lg">
                           <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">The Real Cost of Renting</h3>
                           <div className="space-y-4">
                             {visionSection.math.map((m, i) => (
                               <div key={m} className={`flex flex-col sm:flex-row justify-between p-4 rounded-xl gap-2 ${i === visionSection.math.length - 1 ? 'bg-[#c48a3f]/10 border-2 border-[#c48a3f]/20 font-bold' : 'bg-[#f8fafc]'}`}>
                                 <span className="text-sm md:text-base">{m.split(':')[0]}</span>
                                 <span className="text-[#1e3a5f] font-black">{m.split(':')[1]}</span>
                               </div>
                             ))}
                           </div>
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        {visionSection.approach.map((a, i) => (
                          <motion.div key={a} {...cardMotion} className="bg-white p-8 rounded-3xl border border-[#d4dce6]/40 shadow-xl flex flex-col items-center text-center">
                            <span className="text-4xl mb-4 text-[#c48a3f]">★</span>
                            <p className="font-bold text-xl md:text-2xl leading-tight text-[#0f172a]">{a}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* System Section */}
                <section id="system" className="px-6 md:px-10 py-20 md:py-32 flex flex-col justify-center">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="flex justify-start mb-8">
                      <span className="rounded-full bg-[#1e3a5f]/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#1e3a5f]">System</span>
                    </div>
                    <ScrollFloat textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      {systemSection.headline}
                    </ScrollFloat>
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                      {systemSection.stages.map((stage, sIdx) => (
                        <motion.div key={stage.title} {...cardMotion} className="bg-white rounded-3xl border border-[#d4dce6]/60 p-8 shadow-xl hover:-translate-y-2 transition-transform">
                          <h3 className="text-2xl font-black text-[#0f172a] mb-8 border-b pb-4">{stage.title}</h3>
                          <div className="space-y-8">
                            {stage.steps.map((step, i) => (
                              <div key={step.title} className="relative pl-8">
                                <span className="absolute left-0 top-0 text-3xl font-black text-[#1e3a5f]/10">{i + 1}</span>
                                <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                                <p className="text-sm text-[#475569]">{step.detail}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Proof Section */}
                <section id="proof" className="px-6 md:px-10 py-24 md:py-32 section-alt relative overflow-hidden">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="flex justify-start mb-8">
                      <span className="rounded-full bg-[#1e3a5f]/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#1e3a5f]">Proof</span>
                    </div>
                    <ScrollReveal textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      We've Done This 100+ Times. <br className="hidden md:block" /> Here's What We've Built.
                    </ScrollReveal>
                    
                    <div className="mt-24 space-y-32">
                      {caseStudies.map((study, idx) => (
                        <motion.div 
                          key={study.title} 
                          {...cardMotion}
                          className="group relative grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start"
                        >
                          <div className="relative">
                            <span className="absolute -top-16 -left-8 text-[120px] font-heading font-black text-[#1e3a5f]/5 leading-none select-none">
                              0{idx + 1}
                            </span>
                            <div className="relative z-10">
                              <h3 className="text-3xl md:text-4xl font-heading font-black text-[#0f172a] mb-4 uppercase tracking-tighter">
                                {study.title}
                              </h3>
                              <p className="text-xl text-[#c48a3f] font-display font-bold uppercase tracking-[0.2em]">
                                {study.client}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-8 relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#1e3a5f]/10 hidden md:block" />
                            <div className="md:pl-8 space-y-8">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f]/40 mb-2">The Challenge</h4>
                                <p className="text-xl text-[#475569] leading-relaxed">{study.challenge}</p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f]/40 mb-2">What We Built</h4>
                                <p className="text-xl text-[#475569] leading-relaxed font-semibold">{study.built}</p>
                              </div>
                            </div>
                            <div className="md:pl-8 space-y-8">
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f]/40 mb-2">The Result</h4>
                                <p className="text-2xl font-heading font-bold text-[#0f172a] italic leading-tight">
                                  "{study.result}"
                                </p>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1e3a5f]/40 mb-2">Timeline</h4>
                                <p className="text-lg text-[#1e3a5f] font-bold">{study.timeline}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Showcase Section (Bento Grid) */}
                <section id="showcase" className="px-6 md:px-10 py-24 md:py-32 flex flex-col justify-center relative bg-[#f8fafc]">
                  <div className="max-w-[1400px] mx-auto w-full">
                    <div className="flex justify-start mb-8">
                      <span className="rounded-full bg-[#1e3a5f]/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#1e3a5f]">Showcase</span>
                    </div>
                    <ScrollReveal textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      Crafted Interfaces, Built for Real Businesses
                    </ScrollReveal>
                    
                    <div className="mt-20 space-y-8">
                      {/* Hero Showcase Row */}
                      <div className="grid lg:grid-cols-12 gap-8 h-full">
                        <motion.div {...cardMotion} className="lg:col-span-8 relative overflow-hidden rounded-[40px] border-2 border-[#d4dce6]/60 bg-white shadow-2xl group min-h-[400px]">
                           <Image src="/software-design.jpg" alt="Design" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                           <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/10 to-transparent opacity-80" />
                           <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                             <h3 className="text-3xl md:text-5xl font-black text-white leading-none uppercase mb-2">Design Systems That Drive Profit.</h3>
                             <p className="text-lg text-white/70 max-w-lg">Engineered for conversion and longevity.</p>
                           </div>
                        </motion.div>
                        
                        {/* THE 0 MISSED DEADLINES CARD - Matching Hero Image Height */}
                        <div className="lg:col-span-4 flex flex-col">
                          {byTheNumbers.filter(s => s.label.toLowerCase().includes("missed")).map((stat) => (
                            <motion.div 
                              key={stat.label} 
                              {...cardMotion} 
                              className="flex-1 p-8 md:p-12 rounded-[40px] border-4 border-red-500/30 bg-red-500/[0.04] ring-8 ring-red-500/5 shadow-2xl flex flex-col justify-center text-center relative overflow-hidden group"
                            >
                               <div className="absolute -top-6 -right-6 text-9xl opacity-5 transform rotate-12 group-hover:rotate-45 transition-transform duration-700">🚫</div>
                               <div className="text-7xl md:text-9xl font-black mb-2 text-red-500 tracking-tighter">
                                 {stat.value}
                               </div>
                               <div className="text-xl md:text-2xl font-black uppercase tracking-[0.3em] text-red-600/60">{stat.label}</div>
                               <div className="mt-6 text-sm font-bold text-red-500/40 uppercase tracking-widest">A Record We're Proud Of</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Other Metrics Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {byTheNumbers.filter(s => !s.label.toLowerCase().includes("missed")).map((stat) => (
                          <motion.div key={stat.label} {...cardMotion} className="p-10 rounded-[32px] border-2 border-[#d4dce6]/60 bg-white shadow-xl flex flex-col justify-center text-center hover:border-[#1e3a5f]/20 transition-colors group">
                             <div className="text-5xl md:text-6xl font-black mb-1 text-[#1e3a5f] tracking-tighter group-hover:scale-110 transition-transform">
                               {stat.value}{stat.suffix || ""}
                             </div>
                             <div className="text-sm font-bold uppercase tracking-widest text-[#475569]/60">{stat.label}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Investment Terms */}
                <section id="investment" className="px-6 md:px-10 py-20 md:py-32 section-alt">
                  <div className="max-w-7xl mx-auto w-full">
                     <ScrollFloat textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      {investmentTerms.headline}
                    </ScrollFloat>
                    <div className="mt-16 grid md:grid-cols-2 gap-8">
                      <motion.div {...cardMotion} className="bg-white p-10 rounded-[32px] border-2 border-[#d4dce6]/60 shadow-xl">
                        <h3 className="text-2xl font-bold text-[#1e3a5f] mb-8">SAFE Structure</h3>
                        <ul className="space-y-4 text-xl text-[#475569]">
                          {investmentTerms.terms.map(t => <li key={t}>• {t}</li>)}
                        </ul>
                      </motion.div>
                      <motion.div {...cardMotion} className="bg-white p-10 rounded-[32px] border-2 border-[#c48a3f]/30 shadow-xl">
                        <h3 className="text-2xl font-bold text-[#c48a3f] mb-8">Investor Perks</h3>
                        <ul className="space-y-4 text-xl text-[#475569]">
                          {investmentTerms.perks.map(p => <li key={p}>• {p}</li>)}
                        </ul>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Founders Carousel */}
                <section id="founders" className="px-6 md:px-10 py-20 md:py-32 flex flex-col justify-center relative overflow-hidden bg-white">
                  <div className="max-w-7xl mx-auto w-full">
                     <ScrollReveal textClassName="text-[#0f172a]" textSize="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading">
                      Meet the Team Building <br className="hidden md:block" /> the Future of Ownership
                    </ScrollReveal>
                    <div className="mt-16 relative overflow-hidden rounded-[40px] border-2 border-[#d4dce6]/60 bg-white shadow-2xl">
                      <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden bg-[#0f172a]">
                          <motion.div key={currentMemberIndex} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="absolute inset-0">
                            <Image src={teamMembers[currentMemberIndex].image} alt={teamMembers[currentMemberIndex].name} fill className="object-cover object-center" />
                          </motion.div>
                          <div className="absolute bottom-10 left-10 right-10 flex gap-2">
                            {teamMembers.map((_, i) => (
                              <div key={i} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-[#c48a3f]" animate={{ width: currentMemberIndex === i ? "100%" : "0%" }} transition={{ duration: currentMemberIndex === i ? 5 : 0, ease: "linear" }} />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-12 md:p-16 lg:p-20 flex flex-col justify-center">
                          <motion.div key={`info-${currentMemberIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 className="text-4xl md:text-6xl font-heading font-black text-[#0f172a] mb-2 uppercase tracking-tighter">
                              {teamMembers[currentMemberIndex].name}
                            </h3>
                            <p className="text-xl md:text-2xl text-[#c48a3f] font-bold uppercase tracking-widest mb-10">
                              {teamMembers[currentMemberIndex].title}
                            </p>
                            <div className="flex flex-wrap gap-2">
                               {teamMembers[currentMemberIndex].expertise.map(skill => (
                                 <span key={skill} className="px-4 py-2 bg-[#f8fafc] border rounded-xl text-sm font-bold text-[#1e3a5f]">{skill}</span>
                               ))}
                            </div>
                            <div className="mt-12 flex gap-4">
                              {teamMembers.map((_, i) => (
                                <button key={i} onClick={() => setCurrentMemberIndex(i)} className={`w-3 h-3 rounded-full ${currentMemberIndex === i ? 'bg-[#c48a3f] scale-125' : 'bg-[#1e3a5f]/10'}`} />
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Risks & FAQ */}
                <section className="px-6 md:px-10 py-20 md:py-32 bg-[#0f172a] text-white">
                  <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-heading font-black mb-12">The Risks</h2>
                      <div className="space-y-6">
                        {risks.map((r, i) => (
                          <motion.div key={i} {...cardMotion} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
                            <span className="text-red-500 font-bold">⚠️</span>
                            <p className="text-xl opacity-80">{r}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-5xl font-heading font-black mb-12">FAQ</h2>
                      <div className="space-y-4">
                        {faqs.map((f, i) => (
                          <div key={i} className="border-b border-white/10 pb-4">
                            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left text-2xl font-bold py-4 flex justify-between items-center group">
                              <span className="group-hover:text-[#c48a3f] transition-colors">{f.q}</span>
                              <ChevronDown className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                            </button>
                            <motion.div initial={false} animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }} className="overflow-hidden">
                              <p className="pb-6 text-xl opacity-60 text-balance">{f.a}</p>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Apply Section */}
                <section id="application" className="px-6 md:px-10 py-24 md:py-40 flex flex-col items-center text-center">
                  <ScrollReveal textClassName="text-[#0f172a]" textSize="text-3xl sm:text-5xl md:text-7xl font-heading">
                    Join the Movement for <br/> Technology Sovereignty
                  </ScrollReveal>
                  <p className="mt-8 text-xl md:text-3xl text-[#475569] max-w-3xl leading-relaxed text-balance">
                    We're looking for partners, not just capital. If you believe software should be an asset, not an expense, apply below.
                  </p>
                  <div className="mt-16 w-full max-w-4xl">
                    <InvestmentForm />
                  </div>
                </section>
              </>
            )}
          </main>
          
          <footer className="px-6 py-12 border-t border-[#d4dce6]/40 text-center text-[#475569]/60 text-sm">
            © 2026 OZ Tech Co. Built for Technology Sovereignty. All rights reserved.
          </footer>
        </div>
      )}
    </div>
  );
}
