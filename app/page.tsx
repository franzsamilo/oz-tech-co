"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion"; // Corrected import from "motion/react" to "framer-motion"
import { ChevronDown, ArrowRight } from "lucide-react";
import StaggeredMenu from "@/components/StaggeredMenu";
import PillNav from "@/components/PillNav";
import PasswordLock from "@/components/PasswordLock";
import CaseStudyCard from "@/components/CaseStudyCard";
import InvestmentForm from "@/components/InvestmentForm";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollVelocity from "@/components/ScrollVelocity";
import LogoLoop from "@/components/LogoLoop";
import OzLogo from "@/components/OzLogo";
import StatCounter from "@/components/StatCounter";
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
  testimonials,
} from "@/data/seedPageContent";

const sections = [
  { id: "hero", label: "Home" },
  { id: "truth", label: "Truth" },
  { id: "vision", label: "Vision" },
  { id: "system", label: "System" },
  { id: "proof", label: "Proof" },
  { id: "model", label: "Model" },
  { id: "opportunity", label: "Opportunity" },
  { id: "investment", label: "Terms" },
  { id: "investors", label: "Investors" },
  { id: "founders", label: "Founders" },
  { id: "risks", label: "Risks" },
  { id: "faq", label: "FAQ" },
  { id: "application", label: "Apply" },
];

const headerLinks = [
  { id: "hero", label: "Home" },
  { id: "truth", label: "Story" },
  { id: "system", label: "System" },
  { id: "proof", label: "Proof" },
  { id: "model", label: "Model" },
  { id: "investment", label: "Terms" },
  { id: "founders", label: "Team" },
  { id: "faq", label: "FAQ" },
  { id: "application", label: "Apply" },
];

const teamMembers = [
  {
    name: "Cris Vinson",
    title: "Co-Founder & Strategic Lead",
    image: "/members/Cris.png",
    expertise: [
      "Business Strategy",
      "Client Relations",
      "Product Vision",
      "Team Leadership",
    ],
  },
  {
    name: "Jed Matthew Mamosto",
    title: "Tech Lead & Head Engineer",
    image: "/members/Jed.png",
    expertise: [
      "Full-Stack Dev",
      "Systems Architect",
      "Database Design",
      "AI Integration",
    ],
  },
  {
    name: "Louie Dale Cervera",
    title: "Backend Software Engineer",
    image: "/members/Louie.png",
    expertise: [
      "Server Architecture",
      "Security Protocols",
      "Cloud Scale",
      "Core Logic",
    ],
  },
  {
    name: "Matthew Ledesma",
    title: "Project Manager",
    image: "/members/Matthew L..png",
    expertise: [
      "Execution Roadmap",
      "Daily Ops",
      "Project Velocity",
      "Quality Guard",
    ],
  },
  {
    name: "Franz Eliezer Samilo",
    title: "Frontend Software Engineer",
    image: "/members/Franz.png",
    expertise: [
      "Human-Centric Design",
      "Brand Identity",
      "Visual Craft",
      "Product Design",
    ],
  },
];

const trustLogos = [
  {
    node: (
      <span className="text-sm font-semibold text-[#006c40]">Web Summit</span>
    ),
  },
  {
    node: (
      <span className="text-sm font-semibold text-[#006c40]">2 Comma Club</span>
    ),
  },
  {
    node: (
      <span className="text-sm font-semibold text-[#006c40]">
        Gold SaaS Award
      </span>
    ),
  },
  {
    node: (
      <span className="text-sm font-semibold text-[#006c40]">Mentoria</span>
    ),
  },
  {
    node: <span className="text-sm font-semibold text-[#006c40]">Rare PH</span>,
  },
];

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [renderRest, setRenderRest] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("#hero");

  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.4 },
  };

  const pillNavItems = [
    { label: "Home", href: "#hero" },
    ...headerLinks
      .filter((link) => link.id !== "hero")
      .map((link) => ({ label: link.label, href: `#${link.id}` })),
  ];

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

  useEffect(() => {
    if (!renderRest) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Identify the section that is most prominent in the top 40% of the screen
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0,
        // Wide detection zone centered in the upper half of the screen
        rootMargin: "-15% 0px -55% 0px",
      }
    );

    // Only observe sections that have a corresponding navigation link
    headerLinks.forEach((navLink) => {
      const el = document.getElementById(navLink.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [renderRest]);

  return (
    <div className="bg-[#f8fafc] text-[#021f0d] overflow-x-hidden">
      <PasswordLock onUnlock={() => setIsUnlocked(true)} />

      {isUnlocked && (
        <div className="relative">
          {/* Premium Header */}
          <header className="fixed top-0 left-0 right-0 z-100 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16 md:px-10">
              <div className="hidden lg:flex items-center pointer-events-auto rounded-full">
                <div className="origin-left">
                  <PillNav
                    items={pillNavItems}
                    embedded={true}
                    showLogo={true}
                    logo="/ozlogo.png"
                    logoAlt="OZ Tech"
                    baseColor="#021f0d"
                    pillColor="#5df3c2"
                    hoverPillBgColor="#5df3c2"
                    hoveredPillTextColor="#021f0d"
                    pillTextColor="#5df3c2"
                    className="gap-2"
                    initialLoadAnimation={false}
                  />
                </div>
              </div>
              <div className="md:hidden flex items-center pointer-events-auto">
                <StaggeredMenu
                  isFixed={true}
                  position="right"
                  activeLink={activeSection}
                  items={sections.map((s) => ({
                    label: s.label,
                    ariaLabel: s.label,
                    link: `#${s.id}`,
                  }))}
                  colors={["#021f0d", "#006c40", "#5df3c2"]}
                  accentColor="#5df3c2"
                  menuButtonColor="#006c40"
                />
              </div>
            </div>
          </header>

          <main className="relative">
            {/* Hero Section */}
            <section
              id="hero"
              className="px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen flex flex-col justify-center relative overflow-hidden bg-[#f9fafb] oz-maze-overlay oz-hero-magic oz-hero-bg"
            >
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
                  <div className="space-y-10">
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.12 } },
                      }}
                    >
                      <motion.h1 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black text-[#021f0d] leading-[0.95] tracking-tighter uppercase oz-gold-line"
                      >
                        We're Pulling Back the{" "}
                        <span className="text-[#006c40] bg-clip-text text-transparent bg-linear-to-r from-[#006c40] to-[#5df3c2] oz-hero-aurora">
                          Curtain
                        </span>{" "}
                        on Software
                      </motion.h1>
                      
                      <motion.p 
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        className="mt-8 text-xl md:text-2xl text-[#021f0d]/80 max-w-2xl leading-relaxed font-medium"
                      >
                        {heroContent.subheadline}
                      </motion.p>
                      
                      <motion.div 
                        variants={{
                          hidden: { opacity: 0, scale: 0.95 },
                          visible: { opacity: 1, scale: 1 }
                        }}
                        className="mt-12 flex flex-col sm:flex-row items-center gap-8"
                      >
                        <a
                          href="#application"
                          className="oz-btn-primary w-full sm:w-auto min-w-[280px] shadow-2xl hover:shadow-[#effc5f]/40"
                        >
                          {heroContent.cta}
                        </a>
                        <div className="flex flex-col">
                          <p className="text-[#006c40] font-black text-lg tracking-tight uppercase">
                            Investor Trust Proof
                          </p>
                          <div className="flex gap-4 mt-1">
                            <div className="flex -space-x-2">
                              {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                                  <div className="w-full h-full bg-linear-to-br from-[#006c40] to-[#5df3c2] opacity-40" />
                                </div>
                              ))}
                            </div>
                            <p className="text-xs font-bold text-[#021f0d]/60 leading-none flex items-center uppercase tracking-widest">
                              100+ Projects <br/> Delivered
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Value Prop Animated Stats Section */}
                    <div className="pt-8 border-t border-[#021f0d]/5 grid grid-cols-2 md:grid-cols-3 gap-8">
                      <div>
                        <div className="text-3xl md:text-4xl font-black text-[#006c40] tracking-tighter flex items-baseline">
                          <StatCounter value={100} suffix="+" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#021f0d]/40 mt-1">
                          Projects Delivered
                        </p>
                      </div>
                      <div>
                        <div className="text-3xl md:text-4xl font-black text-[#006c40] tracking-tighter flex items-baseline">
                          <StatCounter value={100} suffix="M+" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#021f0d]/40 mt-1">
                          Revenue Generated
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <div className="text-3xl md:text-4xl font-black text-[#006c40] tracking-tighter flex items-baseline">
                          <StatCounter value={4} suffix=" Wks" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#021f0d]/40 mt-1">
                          Avg Launch Time
                        </p>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(2,31,13,0.3)] border-[16px] border-white oz-frame oz-skew-frame"
                  >
                    <Image
                      src="/software-team.jpg"
                      alt="The OZ Tech Team"
                      fill
                      className="object-cover transition-transform duration-10000 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#021f0d]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                      <div className="p-4 md:p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                        <div className="flex items-center gap-3 mb-2">
                           <div className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
                           <p className="text-xs md:text-sm font-bold text-white uppercase tracking-widest">The Asset Engine</p>
                        </div>
                        <p className="text-lg md:text-xl text-white font-black leading-tight uppercase tracking-tighter">
                          Building <span className="text-[#5df3c2]">Digital Sovereignty</span> <br/> For Market Leaders.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Banner - Re-engineered for focus per Audit #6 */}
            <div className="relative z-10 w-full mb-16 overflow-hidden">
               <div className="bg-[#021f0d] py-6 shadow-2xl">
                <ScrollVelocity
                  texts={["Radical Transparency • Technology Sovereignty • Unlimited Build Method • Zero Dependency • Accredited Strategic Partners Only"]}
                  velocity={15}
                  className="text-xl md:text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-[0.3em]"
                  parallaxClassName="py-2"
                />
              </div>
            </div>

            {/* Social Proof Bento Grid Section (New Phase) */}
            <section id="proof-bento" className="px-6 md:px-10 pb-20 md:pb-32">
              <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:grid-rows-[repeat(2,300px)]">
                  {/* Primary Hero Stat Card */}
                  <motion.div 
                    {...cardMotion}
                    className="md:col-span-8 md:row-span-2 bg-white rounded-[40px] border-2 border-[#021f0d]/10 shadow-[0_20px_50px_-20px_rgba(2,31,13,0.1)] p-12 flex flex-col justify-between overflow-hidden relative group"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#5df3c2]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="relative z-10">
                      <span className="text-xs font-black uppercase tracking-[0.4em] text-[#006c40]">Historical Performance</span>
                      <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-[#021f0d] mt-4 tracking-tighter leading-none">
                        <StatCounter value={100} suffix="+" />
                      </h2>
                      <p className="text-2xl md:text-3xl font-heading font-black uppercase text-[#006c40] mt-2">Projects Successfully Delivered</p>
                    </div>
                    <div className="relative z-10 mt-12 grid grid-cols-2 gap-8 border-t border-[#021f0d]/5 pt-8">
                       <div>
                         <p className="text-sm font-bold text-[#021f0d]/40 uppercase tracking-widest">Client Satisfaction</p>
                         <p className="text-2xl font-black text-[#021f0d]">98.4%</p>
                       </div>
                       <div>
                         <p className="text-sm font-bold text-[#021f0d]/40 uppercase tracking-widest">Investor ROI Focus</p>
                         <p className="text-2xl font-black text-[#021f0d]">PRIMARY</p>
                       </div>
                    </div>
                  </motion.div>

                  {/* Revenue Card */}
                  <motion.div 
                    {...cardMotion}
                    transition={{ ...cardMotion.transition, delay: 0.1 }}
                    className="md:col-span-4 bg-[#021f0d] rounded-[40px] p-10 flex flex-col justify-center text-white oz-emerald-card oz-sparkle-bg shadow-2xl"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#5df3c2]">Value Generated</span>
                    <h3 className="text-5xl font-heading font-black mt-2 tracking-tight">
                      <StatCounter value={100} suffix="M+" className="text-white" />
                    </h3>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-2">Annual Revenue for Clients</p>
                  </motion.div>

                  {/* Missed Deadlines Card - RED ACCENT (Relocated) */}
                  <motion.div 
                    {...cardMotion}
                    transition={{ ...cardMotion.transition, delay: 0.2 }}
                    className="md:col-span-4 bg-red-500 rounded-[40px] p-10 flex flex-col justify-center text-white shadow-[0_20px_50px_-10px_rgba(239,68,68,0.3)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-400 opacity-50" />
                    <div className="relative z-10">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Execution Reliability</span>
                      <h3 className="text-6xl font-heading font-black mt-2 tracking-tight uppercase">
                        ZERO
                      </h3>
                      <p className="text-sm font-bold text-white/80 uppercase tracking-widest mt-2">Missed Deadlines</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Truth Section - Overhauled for Emotional Impact */}
            <section
              id="truth"
              className="px-6 md:px-10 py-24 md:py-40 bg-[#021f0d] text-white relative overflow-hidden oz-maze-overlay"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-[#021f0d]/50 to-[#021f0d] z-0" />
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-4xl">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-start mb-12"
                  >
                    <span className="rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2]">
                      The Harsh Reality
                    </span>
                  </motion.div>
                  
                  <ScrollFloat
                    textClassName="text-white leading-[0.95] tracking-tighter"
                    textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black"
                  >
                    {truthSection.headline}
                  </ScrollFloat>
                </div>

                <div className="mt-24 grid lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7 space-y-8">
                    {truthSection.bullets.map((b, i) => (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex gap-8 items-center"
                      >
                        <span className="text-3xl font-black text-[#5df3c2]/40 group-hover:text-[#5df3c2] transition-colors leading-none">0{i+1}</span>
                        <span className="text-xl md:text-2xl font-heading font-medium text-white/80">{b}</span>
                      </motion.div>
                    ))}
                    
                    <motion.div 
                       {...cardMotion}
                       className="p-10 rounded-[40px] bg-linear-to-br from-[#5df3c2]/20 to-transparent border border-[#5df3c2]/20 mt-12"
                    >
                      <h3 className="text-2xl font-black text-[#5df3c2] uppercase tracking-tighter mb-4">Why this matters to you</h3>
                      <p className="text-xl text-white/70 leading-relaxed font-medium">
                        Investors lose money when software is a liability. We've seen hundreds of businesses bleed capital into broken integrations and "magic" black-box agencies. We're here to stop the bleed.
                      </p>
                    </motion.div>
                  </div>

                  <div className="lg:col-span-5 sticky top-32">
                    <motion.div
                      {...cardMotion}
                      className="bg-white text-[#021f0d] p-12 rounded-[48px] shadow-2xl shadow-[#5df3c2]/10 relative overflow-hidden oz-sparkle-bg"
                    >
                      <div className="absolute top-0 right-0 p-8 text-6xl opacity-10">"</div>
                      <p className="text-3xl md:text-4xl font-heading font-black italic leading-tight text-[#006c40]">
                        {truthSection.truth}
                      </p>
                      <div className="mt-12 pt-8 border-t border-[#021f0d]/10">
                        <p className="text-xl text-[#021f0d]/70 leading-relaxed italic uppercase font-bold tracking-tight">
                          {truthSection.difference}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {renderRest && (
              <>
                {/* Vision Section - Re-engineered for Data Highlight per Audit #13 */}
                <section
                  id="vision"
                  className="px-6 md:px-10 py-24 md:py-40 flex flex-col justify-center bg-[#f9fafb] relative overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="flex justify-center mb-12">
                      <span className="rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40]">
                        Technology Sovereignty
                      </span>
                    </div>
                    
                    <div className="text-center max-w-5xl mx-auto">
                      <ScrollReveal
                         textClassName="text-[#021f0d] text-center"
                         textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95]"
                      >
                         {visionSection.headline}
                      </ScrollReveal>
                    </div>

                    {/* Standalone Data Row - Technical Change per user request */}
                    <div className="mt-24 w-full bg-white border-2 border-[#021f0d]/5 rounded-[48px] p-8 md:p-16 shadow-2xl overflow-hidden relative group">
                       <div className="grid md:grid-cols-3 gap-12 relative z-10">
                          {visionSection.math.slice(0, 3).map((line, i) => (
                            <div key={i} className="space-y-2">
                               <p className="text-xs font-bold text-[#021f0d]/40 uppercase tracking-widest">{line.split(":")[0]}</p>
                               <p className="text-4xl font-heading font-black text-[#006c40]">{line.split(":")[1]}</p>
                            </div>
                          ))}
                       </div>
                       <div className="mt-12 pt-12 border-t border-[#021f0d]/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                          <p className="text-2xl font-heading font-black text-[#021f0d]/60 italic max-w-xl">
                            "{visionSection.math[visionSection.math.length - 1]}"
                          </p>
                          <div className="text-right">
                             <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Annual Capital Loss</p>
                             <p className="text-5xl font-heading font-black text-red-500">$33,500/yr</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-24 grid lg:grid-cols-2 gap-12">
                        <div className="p-12 rounded-[48px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card oz-maze-overlay">
                           <h3 className="text-4xl font-heading font-black text-[#5df3c2] uppercase tracking-tighter leading-none mb-10">The SaaS Renting Trap</h3>
                           <div className="space-y-6">
                              {visionSection.renting.map((item) => (
                                <div key={item} className="flex gap-4 items-start group">
                                  <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-1">✕</span>
                                  <p className="text-xl font-medium text-white/80">{item}</p>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="p-12 rounded-[48px] bg-white border-2 border-[#006c40]/20 shadow-2xl flex flex-col justify-between">
                           <div>
                             <h3 className="text-4xl font-heading font-black text-[#006c40] uppercase tracking-tighter leading-none mb-10">Our Approach</h3>
                             <div className="space-y-6">
                                {visionSection.approach.map((item) => (
                                  <div key={item} className="flex gap-4 items-start group">
                                    <span className="w-6 h-6 rounded-full bg-[#5df3c2] text-[#006c40] flex items-center justify-center font-bold text-xs shrink-0 mt-1">✓</span>
                                    <p className="text-xl font-black text-[#006c40]">{item}</p>
                                  </div>
                                ))}
                             </div>
                           </div>
                           <div className="mt-12 p-8 rounded-3xl bg-[#f9fafb] border-2 border-[#5df3c2]/30">
                              <p className="text-sm font-bold text-[#006c40] leading-relaxed italic uppercase tracking-wider">
                                {visionSection.visionTagline}
                              </p>
                           </div>
                        </div>
                    </div>
                  </div>
                </section>

                {/* System Section - Overhauled for Journey Reveal per Audit #13 */}
                <section
                  id="system"
                  className="px-6 md:px-10 py-24 md:py-40 bg-[#021f0d] text-white relative overflow-hidden"
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <div className="absolute top-0 left-1/2 -ml-[1px] w-[2px] h-full bg-linear-to-b from-[#5df3c2]/0 via-[#5df3c2]/20 to-[#5df3c2]/0" />
                  </div>

                  <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="text-center mb-20">
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="inline-block rounded-full bg-[#5df3c2]/10 border border-[#5df3c2]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-8"
                       >
                          The Execution Engine
                       </motion.div>
                       <ScrollFloat
                          textClassName="text-white text-center"
                          textSize="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter uppercase leading-[0.95]"
                       >
                          {systemSection.headline}
                       </ScrollFloat>
                    </div>

                    <div className="relative mt-32">
                         {/* Centered Journey Line */}
                         <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -ml-[1px] w-[2px] bg-linear-to-b from-[#5df3c2] via-[#006c40] to-[#5df3c2] opacity-30" />
                         
                         <div className="space-y-24 md:space-y-32">
                              {systemSection.stages.flatMap(stage => stage.steps).map((step, i) => (
                                 <motion.div
                                   key={step.title}
                                   initial={{ opacity: 0, y: 50 }}
                                   whileInView={{ opacity: 1, y: 0 }}
                                   viewport={{ once: true, margin: "-100px" }}
                                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                   className="relative grid lg:grid-cols-2 gap-12 lg:gap-32 items-center"
                                 >
                                    {/* Content Side */}
                                    <div className={`order-1 ${i % 2 !== 0 ? 'lg:order-2 lg:text-left' : 'lg:text-right'}`}>
                                       <div className="p-10 md:p-12 rounded-[56px] bg-white/5 border border-white/10 hover:border-[#5df3c2]/40 hover:bg-white/10 transition-all group oz-emerald-card oz-maze-overlay h-full">
                                          <div className={`flex items-center gap-6 mb-8 ${i % 2 !== 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                             <span className="w-16 h-16 rounded-2xl bg-[#5df3c2] text-[#021f0d] flex items-center justify-center text-3xl font-black shadow-[0_0_30px_rgba(93,243,192,0.4)]">
                                                {i + 1}
                                             </span>
                                             <div className={i % 2 !== 0 ? 'lg:text-left' : 'lg:text-right'}>
                                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#5df3c2]/60">Stage {Math.floor(i/3) + 1}</p>
                                                <h3 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter text-white group-hover:text-[#5df3c2] transition-colors">{step.title}</h3>
                                             </div>
                                          </div>
                                          <p className="text-xl text-white/70 leading-relaxed font-medium">
                                             {step.detail}
                                          </p>
                                       </div>
                                    </div>
                                    
                                    {/* Spacer Side for Layout Balance */}
                                    <div className={i % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'} />
                                    
                                    {/* Connector Circle - Absolute Centered */}
                                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-20">
                                       <div className="w-14 h-14 rounded-full bg-[#021f0d] border-4 border-[#5df3c2] shadow-[0_0_30px_rgba(93,243,192,0.4)] flex items-center justify-center">
                                          <div className="w-2 h-2 rounded-full bg-[#5df3c2] animate-ping" />
                                       </div>
                                    </div>
                                 </motion.div>
                              ))}
                         </div>
                    </div>

                    <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       className="mt-40 p-12 md:p-20 rounded-[80px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] text-center shadow-2xl relative overflow-hidden"
                    >
                       <div className="absolute inset-0 oz-maze-overlay opacity-20" />
                       <div className="relative z-10 max-w-4xl mx-auto">
                           <h4 className="text-xs font-black uppercase tracking-[0.5em] mb-8">Ultimate Velocity</h4>
                           <p className="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none">
                              From Concept to Deployment in <span className="underline decoration-4 underline-offset-8">4 Weeks</span>
                           </p>
                           <a href="#application" className="oz-btn-secondary mt-12 px-12 text-lg">
                              Request This Machine
                           </a>
                       </div>
                    </motion.div>
                  </div>
                </section>

                {/* Proof Section - Overhauled for Emotional Results per Audit #13 */}
                <section
                  id="proof"
                  className="px-6 md:px-10 py-24 md:py-40 bg-white relative overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="flex justify-center mb-16">
                      <span className="rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40]">
                        The Evidence
                      </span>
                    </div>
                    <div className="text-center mb-24">
                      <ScrollReveal
                         textClassName="text-[#021f0d] text-center"
                         textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95]"
                      >
                         Hundreds of Launches. <br/> Millions in Value.
                      </ScrollReveal>
                    </div>

                    <div className="mt-24 space-y-48">
                      {caseStudies.map((study, idx) => (
                        <motion.div
                          key={study.title}
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="relative grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
                        >
                          {/* Emotional Result Highlight */}
                          <div className={`lg:col-span-5 ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                             <div className="relative">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#006c40] mb-4 block">Proven Outcome 0{idx+1}</span>
                                <h3 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#021f0d] tracking-tighter leading-none mb-8">
                                   {study.result.split(',')[0]}
                                </h3>
                                <p className="text-2xl font-bold text-[#006c40] italic leading-tight">
                                   "{study.result.split(',').slice(1).join(',')}"
                                </p>
                                <a 
                                  href={(study as any).url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="mt-12 p-6 md:p-8 rounded-[32px] bg-[#021f0d] border border-[#5df3c2]/20 group/link hover:border-[#5df3c2] hover:shadow-[0_0_30px_rgba(93,243,194,0.2)] transition-all duration-300 block relative overflow-hidden"
                                >
                                   <div className="absolute inset-0 bg-linear-to-r from-[#5df3c2]/10 via-transparent to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
                                   
                                   <div className="relative z-10 flex justify-between items-start md:items-center gap-4 mb-3">
                                      <div className="flex items-center gap-2">
                                         <div className="w-2 h-2 rounded-full bg-[#5df3c2] animate-pulse" />
                                         <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5df3c2]">Live Verification</p>
                                      </div>
                                      <div className="w-8 h-8 rounded-full bg-[#5df3c2] flex items-center justify-center text-[#021f0d] transform group-hover/link:scale-110 group-hover/link:rotate-[-45deg] transition-all duration-300">
                                        <ArrowRight size={14} strokeWidth={3} />
                                      </div>
                                   </div>
                                   
                                   <p className="relative z-10 text-lg md:text-xl font-bold text-white group-hover/link:text-[#effc5f] transition-colors truncate font-mono tracking-tight">
                                      {(study as any).url?.replace('https://', '')}
                                   </p>
                                </a>
                             </div>
                          </div>

                          {/* Technical Proof Card */}
                          <div className="lg:col-span-7">
                             <div className="p-10 md:p-16 rounded-[60px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card oz-maze-overlay">
                                <div className="absolute top-0 right-0 p-12 text-sm font-black text-[#5df3c2]/20 uppercase tracking-widest">{study.timeline}</div>
                                <div className="relative z-10">
                                   <p className="text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-6">Client: {study.client}</p>
                                   <h4 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tighter mb-8">{study.title}</h4>
                                   
                                   <div className="space-y-8 pt-8 border-t border-white/10">
                                      <div>
                                         <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">The Critical Challenge</p>
                                         <p className="text-xl md:text-2xl font-medium text-white/80 leading-relaxed">{study.challenge}</p>
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>


                {/* Business Model Section - Overhauled for Premium Investor context per Audit #13 */}
                <section
                  id="model"
                  className="py-24 md:py-40 bg-[#021f0d] text-white overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-[#5df3c2]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  
                  <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-24">
                       <ScrollFloat className="text-white text-center" textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
                          {businessModel.headline}
                       </ScrollFloat>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 items-stretch">
                      {/* Current State */}
                       <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[60px] space-y-10 group hover:bg-white/10 transition-all flex flex-col h-full"
                      >
                        <h3 className="text-xl md:text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-[0.2em]">
                          01. Current State
                        </h3>
                        <div className="space-y-6 flex-1">
                          {businessModel.currentState.map((item) => (
                            <div key={item} className="flex gap-4 items-start">
                              <span className="w-2 h-2 rounded-full bg-[#5df3c2] mt-3 shrink-0" />
                              <p className="text-lg md:text-xl opacity-80 font-medium leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Unit Economics */}
                       <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 md:p-12 rounded-[60px] space-y-10 shadow-2xl relative overflow-hidden text-[#021f0d] oz-sparkle-bg flex flex-col h-full"
                      >
                        <h3 className="text-xl md:text-2xl font-heading font-black uppercase tracking-[0.2em] text-[#006c40]">
                          02. Unit Math
                        </h3>
                        <div className="space-y-4 flex-1">
                          {businessModel.perClient.map((item) => {
                            const [label, val] = item.split(':');
                            const moneyValues = val.match(/\$[\d,.]+/g) || [];
                            
                            return (
                              <div
                                key={item}
                                className="p-4 md:p-6 bg-[#f9fafb] rounded-[32px] border-2 border-[#021f0d]/5 text-center sm:text-left"
                              >
                                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#006c40]/40 mb-2">
                                  {label}
                                </p>
                                <div className="text-xl sm:text-3xl md:text-5xl font-heading font-black text-[#006c40] tracking-tighter flex flex-wrap gap-y-1 justify-center sm:justify-start items-baseline">
                                  {moneyValues.length > 0 ? (
                                    moneyValues.map((mv, idx) => (
                                      <span key={idx} className="flex items-center">
                                        {idx > 0 && <span className="opacity-20 mx-1">-</span>}
                                        <StatCounter 
                                          value={parseFloat(mv.replace(/[^0-9.]/g, ''))} 
                                          prefix="$"
                                          className="text-[#006c40]"
                                        />
                                        {idx === moneyValues.length - 1 && val.includes('/month') && (
                                          <span className="text-xs sm:text-xl md:text-2xl opacity-40 lowercase ml-1 font-bold">/mo</span>
                                        )}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-xl sm:text-3xl md:text-4xl">{val}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>

                      {/* Capacity & Exit */}
                       <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-linear-to-br from-[#021f0d] to-[#006c40] p-8 md:p-12 rounded-[60px] space-y-10 shadow-2xl oz-emerald-card oz-maze-overlay border border-white/10 flex flex-col h-full"
                      >
                        <h3 className="text-xl md:text-2xl font-heading font-black text-[#5df3c2] uppercase tracking-[0.2em]">
                          03. The Vision
                        </h3>
                        <div className="space-y-6 flex-1">
                          {businessModel.capacity.map((item) => (
                             <div key={item} className="flex gap-4 items-start">
                               <span className="text-[#5df3c2] font-black mt-1">→</span>
                               <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">{item}</p>
                             </div>
                          ))}
                        </div>
                        <div className="pt-10 border-t border-white/10">
                           <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#5df3c2] mb-4">Strategic Exit (5-7 Yr)</p>
                           <p className="text-xl md:text-2xl font-heading font-black text-white tracking-widest leading-tight uppercase">Acquisition or Direct Secondary</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Projections Row - ANIMATED */}
                    <div className="mt-32 p-12 md:p-20 rounded-[80px] bg-white text-[#021f0d] relative overflow-hidden oz-sparkle-bg">
                       <div className="absolute top-0 right-0 p-12 text-8xl opacity-5 font-black uppercase tracking-tighter select-none">GROWTH</div>
                       <div className="relative z-10">
                          <h3 className="text-4xl md:text-6xl font-heading font-black text-center mb-20 uppercase tracking-tighter">
                             Scaling to $3M ARR
                          </h3>
                          <div className="grid md:grid-cols-3 gap-16 relative">
                            {businessModel.projection.map((proj) => {
                              const parts = proj.split(':');
                              const month = parts[0];
                              const rest = parts[1] || '';
                              // Extract only the dollar values, e.g., ["$105,000", "$135,000", "$1.26", "$1.62"]
                              // Including decimals for ARR values
                              const moneyValues = rest.match(/\$[\d,.]+/g) || [];
                              // Only take the first two values (the MRR range)
                              const numbers = moneyValues.slice(0, 2).map(v => parseFloat(v.replace(/[^0-9.]/g, '')));
                              const suffix = rest.includes('K') ? 'K' : rest.includes('M') ? 'M' : '';
                              
                              return (
                                <div key={proj} className="text-center group">
                                  <div className="text-sm font-black uppercase tracking-[0.5em] text-[#006c40]/40 mb-6 group-hover:text-[#006c40] transition-colors">
                                    {month}
                                  </div>
                                  <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter flex items-center justify-center flex-wrap gap-x-2 text-[#021f0d]">
                                    {numbers.map((num, idx) => (
                                      <span key={idx} className="flex items-center">
                                        {idx > 0 && <span className="opacity-20 mr-2">-</span>}
                                        <StatCounter 
                                          value={num} 
                                          prefix="$"
                                          suffix={suffix} 
                                          className="text-[#021f0d]"
                                        />
                                      </span>
                                    ))}
                                  </div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-[#021f0d]/40 mt-4">Target Monthly Revenue</p>
                                </div>
                              );
                            })}
                          </div>
                       </div>
                    </div>
                  </div>
                </section>

                {/* Opportunity Section - Overhauled for Growth context per Audit #13 */}
                <section
                  id="opportunity"
                  className="px-6 md:px-10 py-24 md:py-40 bg-white relative overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-24">
                       <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40] mb-8"
                       >
                          The Market Gap
                       </motion.div>
                       <ScrollFloat className="text-[#021f0d] text-center" textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
                          {opportunity.headline}
                       </ScrollFloat>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                       {/* Primary Pillar */}
                       <motion.div 
                          {...cardMotion}
                          className="lg:col-span-8 p-12 md:p-16 rounded-[60px] bg-[#021f0d] text-white shadow-2xl relative overflow-hidden oz-emerald-card oz-maze-overlay"
                       >
                          <h3 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter leading-none mb-10">
                             {opportunity.pillars[0].title}
                          </h3>
                          <p className="text-2xl md:text-3xl font-medium text-white/80 leading-relaxed max-w-2xl">
                             {opportunity.pillars[0].description}
                          </p>
                          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/10">
                             {opportunity.marketSize.map((size) => (
                                <div key={size}>
                                   <p className="text-xs font-black uppercase tracking-widest text-[#5df3c2] mb-2">Market Data</p>
                                   <p className="text-lg font-bold opacity-80">{size}</p>
                                </div>
                             ))}
                          </div>
                       </motion.div>

                       {/* Supporting Pillars */}
                       <div className="lg:col-span-4 grid gap-8">
                          {opportunity.pillars.slice(1).map((pillar, i) => (
                             <motion.div 
                                key={pillar.title}
                                {...cardMotion}
                                transition={{ ...cardMotion.transition, delay: (i + 1) * 0.1 }}
                                className="p-10 rounded-[48px] bg-white border-2 border-[#021f0d]/5 shadow-xl hover:border-[#5df3c2]/30 transition-all flex flex-col justify-center"
                             >
                                <h4 className="text-2xl font-heading font-black text-[#021f0d] uppercase tracking-tighter mb-4">{pillar.title}</h4>
                                <p className="text-lg text-[#021f0d]/70 font-medium leading-relaxed">{pillar.description}</p>
                             </motion.div>
                          ))}
                       </div>
                    </div>

                    <div className="mt-20 p-12 rounded-[60px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                       <div className="absolute inset-0 oz-maze-overlay opacity-10" />
                       <div className="relative z-10">
                          <h3 className="text-4xl font-heading font-black uppercase tracking-tighter leading-none">Unfair Advantages</h3>
                          <p className="text-xl font-bold mt-2 opacity-60">Why OZ Tech always wins</p>
                       </div>
                       <div className="relative z-10 flex flex-wrap gap-4 justify-center md:justify-end">
                          {opportunity.advantages.map((adv) => (
                             <span key={adv} className="px-6 py-3 rounded-2xl bg-[#021f0d] text-white font-black text-sm uppercase tracking-widest shadow-lg">
                                {adv}
                             </span>
                          ))}
                       </div>
                    </div>
                  </div>
                </section>

                {/* Risks - Radical Transparency per Audit #13 */}
                <section id="risks" className="py-24 md:py-40 bg-[#021f0d] text-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
                  <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-24">
                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-[#5df3c2] font-black uppercase tracking-[0.6em] text-xs mb-8"
                       >
                          Radical Transparency
                       </motion.div>
                       <ScrollFloat className="text-white text-center" textSize="text-4xl sm:text-6xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-none">
                          The Risk Realities
                       </ScrollFloat>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      {(risks as any[]).map((risk, i) => (
                        <motion.div
                          key={risk.category}
                          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="bg-white/5 border border-white/10 p-12 rounded-[50px] relative overflow-hidden group hover:bg-white/10 transition-all"
                        >
                          <span className="text-8xl font-black text-white/5 absolute top-0 right-0 p-8 leading-none">0{i+1}</span>
                          <h3 className="text-3xl font-heading font-black text-[#5df3c2] mb-8 uppercase tracking-tighter">
                            {risk.category}
                          </h3>
                          <ul className="space-y-6 mb-12">
                            {risk.items.map((item: string) => (
                              <li
                                key={item}
                                className="text-xl text-white/90 flex gap-4 leading-relaxed italic"
                              >
                                <span className="text-red-500 font-bold shrink-0 mt-2 text-xs">✕</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <div className="pt-8 border-t border-white/10">
                            <p className="text-xs font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-4">OZ Safeguard Strategy</p>
                            <ul className="space-y-3">
                              {(risk as any).mitigation.map((m: string) => (
                                <li
                                  key={m}
                                  className="text-lg text-white font-black flex gap-3 lowercase first-letter:uppercase"
                                >
                                  <span className="text-[#5df3c2]">✓</span> {m}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Investment Terms - PREMIUM SAFE Card */}
                <section
                  id="investment"
                  className="px-6 md:px-10 py-24 md:py-40 bg-white relative overflow-hidden"
                >
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-24">
                       <ScrollReveal
                         textClassName="text-[#021f0d] text-center"
                         textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
                       >
                         {investmentTerms.headline}
                       </ScrollReveal>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12 items-stretch">
                       {/* The SAFE Offering */}
                       <div className="lg:col-span-12">
                          <motion.div
                             initial={{ opacity: 0, scale: 0.98 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             viewport={{ once: true }}
                             className="bg-[#021f0d] text-white p-12 md:p-20 rounded-[80px] shadow-3xl relative overflow-hidden oz-emerald-card oz-maze-overlay"
                          >
                             <div className="absolute top-0 right-0 p-20 text-[20vw] font-black opacity-5 select-none leading-none">SAFE</div>
                             <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                                <div>
                                   <p className="text-xs font-black uppercase tracking-[0.5em] text-[#5df3c2] mb-8">Primary Instrument</p>
                                   <h3 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-10 leading-none">
                                      {investmentTerms.instrument}
                                   </h3>
                                   <p className="text-2xl text-white/70 font-medium leading-relaxed mb-12">
                                      {investmentTerms.instrumentDetail}
                                   </p>
                                   <div className="flex flex-wrap gap-4">
                                      {investmentTerms.terms.map((t: string) => (
                                         <span key={t} className="px-8 py-4 rounded-2xl bg-white/10 border border-white/20 font-black text-sm uppercase tracking-widest">{t}</span>
                                      ))}
                                   </div>
                                </div>
                                <div className="space-y-8">
                                   <div className="p-10 rounded-[48px] bg-white text-[#021f0d] shadow-2xl oz-sparkle-bg">
                                      <h4 className="text-xs font-black uppercase tracking-widest text-[#006c40] mb-8">Projected Simulation</h4>
                                      <div className="space-y-8">
                                         {investmentTerms.returns.map((r, i) => (
                                            <div key={i} className="flex flex-col">
                                               <p className="text-xs font-black uppercase tracking-widest text-[#021f0d]/40 mb-1">Scenario Prototype</p>
                                               <p className="text-3xl font-heading font-black text-[#006c40] tracking-tight lowercase first-letter:uppercase">{r}</p>
                                            </div>
                                         ))}
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </motion.div>
                       </div>

                       {/* Perks & Safeguards */}
                       <div className="lg:col-span-8">
                          <div className="grid md:grid-cols-2 gap-8 h-full">
                             {(investmentTerms.perks as any[]).map((category, idx) => (
                                <motion.div 
                                   key={category.category}
                                   {...cardMotion}
                                   transition={{ ...cardMotion.transition, delay: idx * 0.1 }}
                                   className="p-10 rounded-[48px] bg-[#f9fafb] border-2 border-[#006c40]/5 flex flex-col"
                                >
                                   <h4 className="text-xs font-black uppercase tracking-[0.3em] text-[#006c40] mb-8">{category.category}</h4>
                                   <ul className="space-y-6 flex-1">
                                      {category.items.map((item: string) => (
                                         <li key={item} className="flex gap-4 text-lg font-black text-[#021f0d] uppercase tracking-tighter leading-tight group/item">
                                            <span className="text-[#5df3c2] shrink-0">★</span>
                                            {item}
                                         </li>
                                      ))}
                                   </ul>
                                </motion.div>
                             ))}
                          </div>
                       </div>
                       
                       <div className="lg:col-span-4 h-full">
                          <div className="p-10 rounded-[48px] bg-[#e03131] text-white shadow-2xl h-full flex flex-col relative overflow-hidden group">
                             <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white/10 to-transparent opacity-20" />
                             <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/5 select-none pointer-events-none">OZ</div>
                             
                             <div className="relative z-10">
                                <h4 className="text-xs font-black uppercase tracking-widest mb-10 text-white/60">Strategic Safeguards</h4>
                                <ul className="space-y-6">
                                   {investmentTerms.guarantee.map((g) => (
                                      <li key={g} className="flex gap-4 text-lg font-black uppercase leading-tight italic group/item">
                                         <span className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover/item:bg-white group-hover/item:text-[#e03131] transition-all">✓</span>
                                         <span className="flex-1">{g}</span>
                                      </li>
                                   ))}
                                </ul>
                                
                                <div className="mt-16 pt-10 border-t border-white/10">
                                   <p className="text-xs font-black uppercase tracking-widest text-white/40 mb-2">Legal Security</p>
                                   <p className="text-sm font-bold text-white/80 italic leading-relaxed">Standardized terms for investor protection.</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </section>

                {/* Who We're Looking For Section - Overhauled for High Trust per Audit #13 */}
                <section id="investors" className="py-24 md:py-40 bg-[#f9fafb]">
                  <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                       <ScrollFloat className="text-[#021f0d] text-center" textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none uppercase">
                          {investors.headline}
                       </ScrollFloat>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                      {/* Ideal Profile 01 */}
                      <motion.div
                        {...cardMotion}
                        className="bg-white p-10 rounded-[48px] border-2 border-[#021f0d]/5 shadow-xl group hover:border-[#5df3c2]/30 transition-all flex flex-col h-full"
                      >
                         <div className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6">01</div>
                        <h4 className="text-2xl font-heading font-black text-[#021f0d] mb-4 uppercase tracking-tighter group-hover:text-[#006c40] transition-colors leading-none">
                          {investors.want[0].title}
                        </h4>
                        <p className="text-lg text-[#021f0d]/70 font-medium leading-relaxed">
                          {investors.want[0].detail}
                        </p>
                      </motion.div>

                      {/* Ideal Profile 02 */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.1 }}
                        className="bg-white p-10 rounded-[48px] border-2 border-[#021f0d]/5 shadow-xl group hover:border-[#5df3c2]/30 transition-all flex flex-col h-full"
                      >
                         <div className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6">02</div>
                        <h4 className="text-2xl font-heading font-black text-[#021f0d] mb-4 uppercase tracking-tighter group-hover:text-[#006c40] transition-colors leading-none">
                          {investors.want[1].title}
                        </h4>
                        <p className="text-lg text-[#021f0d]/70 font-medium leading-relaxed">
                          {investors.want[1].detail}
                        </p>
                      </motion.div>

                      {/* Absolute Disqualifiers - Vertical Card */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.2 }}
                        className="bg-[#021f0d] text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden oz-emerald-card oz-maze-overlay flex flex-col h-full md:row-span-2"
                      >
                         <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                           Absolute Disqualifiers
                         </h3>
                         <ul className="space-y-4 flex-1">
                            {investors.dontWant.map((item: string) => (
                              <li key={item} className="flex gap-3 text-base font-medium text-white/60 italic leading-snug">
                                 <span className="text-red-500 font-bold shrink-0 mt-1 text-[10px]">✕</span>
                                 {item}
                              </li>
                            ))}
                         </ul>
                      </motion.div>

                      {/* Wide Feature Card - Profile 3 */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.3 }}
                        className="md:col-span-2 bg-[#021f0d] p-12 rounded-[56px] border-2 border-[#5df3c2]/20 shadow-2xl group hover:border-[#5df3c2]/50 transition-all flex flex-col md:flex-row gap-10 items-center oz-emerald-card"
                      >
                         <div className="w-20 h-20 rounded-full bg-[#5df3c2]/20 text-[#5df3c2] flex items-center justify-center font-black text-3xl shrink-0">03</div>
                         <div className="flex-1">
                            <h4 className="text-3xl md:text-4xl font-heading font-black text-[#5df3c2] mb-4 uppercase tracking-tighter leading-none">
                              {investors.want[2].title}
                            </h4>
                            <p className="text-xl text-white/80 font-medium leading-relaxed">
                              {investors.want[2].detail}
                            </p>
                         </div>
                      </motion.div>

                      {/* Strategic DNA - Wide Gradient Card */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.4 }}
                        className="md:col-span-2 p-12 rounded-[56px] bg-linear-to-br from-[#effc5f] to-[#5df3c2] text-[#021f0d] shadow-2xl relative overflow-hidden"
                      >
                         <div className="absolute inset-0 oz-maze-overlay opacity-10" />
                         <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-10 relative z-10 leading-none">Our Strategic DNA</h3>
                         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                           {investors.values.slice(0, 6).map((val: any) => (
                             <div key={val.title} className="space-y-1">
                               <h4 className="font-black text-[#021f0d] text-[10px] uppercase tracking-widest mb-1 opacity-40">
                                 {val.title}
                               </h4>
                               <p className="text-sm font-bold text-[#021f0d] leading-tight uppercase tracking-tighter">
                                 {val.detail}
                               </p>
                             </div>
                           ))}
                         </div>
                      </motion.div>

                      {/* Final Profile 04 */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.5 }}
                        className="bg-white p-10 rounded-[48px] border-2 border-[#021f0d]/5 shadow-xl group hover:border-[#5df3c2]/30 transition-all flex flex-col h-full"
                      >
                         <div className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6">04</div>
                        <h4 className="text-2xl font-heading font-black text-[#021f0d] mb-4 uppercase tracking-tighter group-hover:text-[#006c40] transition-colors leading-none">
                          {investors.want[3].title}
                        </h4>
                        <p className="text-lg text-[#021f0d]/70 font-medium leading-relaxed">
                          {investors.want[3].detail}
                        </p>
                      </motion.div>

                      {/* Final Profile 05 */}
                      <motion.div
                        {...cardMotion}
                        transition={{ ...cardMotion.transition, delay: 0.6 }}
                        className="bg-white p-10 rounded-[48px] border-2 border-[#021f0d]/5 shadow-xl group hover:border-[#5df3c2]/30 transition-all flex flex-col h-full"
                      >
                         <div className="w-10 h-10 rounded-xl bg-[#5df3c2]/20 text-[#006c40] flex items-center justify-center font-black mb-6">05</div>
                        <h4 className="text-2xl font-heading font-black text-[#021f0d] mb-4 uppercase tracking-tighter group-hover:text-[#006c40] transition-colors leading-none">
                          {investors.want[4].title}
                        </h4>
                        <p className="text-lg text-[#021f0d]/70 font-medium leading-relaxed">
                          {investors.want[4].detail}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </section>

                {/* Team Section - Reframed as Strategic Assets per Audit #13 */}
                <section
                  id="founders"
                  className="px-6 md:px-10 py-24 md:py-40 flex flex-col justify-center relative overflow-hidden bg-white"
                >
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-24">
                       <span className="inline-block rounded-full bg-[#006c40]/10 border border-[#006c40]/20 px-6 py-2 text-xs font-black uppercase tracking-[0.4em] text-[#006c40] mb-8">
                         The Human Engine
                       </span>
                       <ScrollReveal
                         textClassName="text-[#021f0d] text-center"
                         textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
                       >
                         Proven Engineers. <br/> Product Visionaries.
                       </ScrollReveal>
                    </div>

                    <motion.div 
                       initial={{ opacity: 0, scale: 0.98 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       className="relative group cursor-pointer"
                    >
                       <Link href="/team">
                          <div className="relative h-[600px] w-full rounded-[80px] overflow-hidden border-[16px] border-[#f9fafb] shadow-2xl">
                             <Image 
                                src="/software-design.jpg" 
                                alt="The OZ Team" 
                                fill 
                                className="object-cover group-hover:scale-105 transition-transform duration-10000"
                             />
                             <div className="absolute inset-0 bg-linear-to-t from-[#021f0d] via-[#021f0d]/40 to-transparent" />
                             <div className="absolute inset-0 oz-maze-overlay opacity-10" />
                             
                             <div className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 text-white">
                                <div className="max-w-3xl">
                                   <p className="text-xl font-black uppercase tracking-[0.4em] text-[#5df3c2] mb-6">Founding Personnel</p>
                                   <h3 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black uppercase tracking-tighter leading-none mb-10">
                                      Meet The <br/> Assets Behind <br/> The Machine.
                                   </h3>
                                   <div className="flex flex-wrap gap-8 items-center">
                                      <div className="oz-btn-primary px-12 group/btn">
                                         Examine The Team <ArrowRight className="inline-block ml-4 group-hover/btn:translate-x-2 transition-transform" />
                                      </div>
                                      <div className="flex -space-x-4">
                                         {teamMembers.map((m, i) => (
                                            <div key={i} className="w-14 h-14 rounded-full border-4 border-[#021f0d] bg-white/10 backdrop-blur-md overflow-hidden relative">
                                               <Image src={m.image} alt={m.name} fill className="object-cover" />
                                            </div>
                                         ))}
                                      </div>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </Link>
                    </motion.div>
                  </div>
                </section>

                {/* FAQ Section - Unlocked 2-Column Grid per Audit #10 */}
                <section id="faq" className="px-6 md:px-10 py-24 md:py-40 bg-[#f9fafb]">
                  <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-24">
                       <ScrollReveal
                         textClassName="text-[#021f0d] text-center"
                         textSize="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.95] uppercase"
                       >
                         Addressing The <br/> Skeptics.
                       </ScrollReveal>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-24">
                      {faqs.map((faq, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (i % 2) * 0.1 }}
                          className="group"
                        >
                          <button
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            className={`w-full text-left p-10 rounded-[48px] border-2 transition-all flex flex-col ${
                              openFaq === i
                                ? "bg-white border-[#5df3c2] shadow-2xl"
                                : "bg-white border-[#021f0d]/5 hover:border-[#006c40]/20"
                            }`}
                          >
                            <div className="flex justify-between items-center w-full gap-6">
                              <h3 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tighter text-[#021f0d] group-hover:text-[#006c40] transition-colors">
                                {faq.q}
                              </h3>
                              <span className={`text-4xl font-black transition-transform duration-500 shrink-0 ${openFaq === i ? 'rotate-45 text-[#5df3c2]' : 'text-[#021f0d]/20'}`}>
                                +
                              </span>
                            </div>
                            {openFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                className="overflow-hidden mt-8"
                              >
                                <p className="text-xl text-[#021f0d]/70 leading-relaxed font-medium">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Application Section - Final Preamble and Form */}
                <section
                  id="application"
                  className="px-6 md:px-10 py-24 md:py-40 bg-[#021f0d] text-white relative overflow-hidden"
                >
                  <div className="max-w-4xl mx-auto w-full relative z-10 text-center">
                    <div className="mb-20">
                       <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="text-[#5df3c2] font-black uppercase tracking-[0.4em] text-xs mb-8"
                       >
                          The Selection Process
                       </motion.div>
                       <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none uppercase mb-12">
                          Become an Owner.
                       </h2>
                       <p className="text-2xl font-medium text-white/60 max-w-2xl mx-auto leading-relaxed italic">
                          We are looking for strategic partners who believe in software sovereignty. If you believe businesses should own their tools, apply below.
                       </p>
                    </div>

                    <div className="mt-24 p-8 md:p-16 rounded-[60px] bg-white text-[#021f0d] shadow-3xl oz-sparkle-bg">
                       <InvestmentForm />
                    </div>
                  </div>
                </section>
              </>
            )}
          </main>

          <footer className="px-6 py-20 bg-white border-t border-[#021f0d]/5 text-center flex flex-col items-center">
            <OzLogo className="w-10 h-10 grayscale opacity-20 mb-8" />
            <p className="text-[#021f0d]/30 text-xs font-black uppercase tracking-[0.5em] mb-4">OZ Tech Development Corp</p>
            <p className="text-[#021f0d]/60 text-sm font-medium italic mb-8 max-w-sm">
              "We don't build software for rent. We engineer assets for ownership."
            </p>
            <div className="flex gap-8 mb-12">
               <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">Home</Link>
               <Link href="/team" className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">The Team</Link>
               <a href="#application" className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#006c40] transition-colors">Back the Machine</a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/20">
              © 2026 OZ Tech Co. Built for Technology Sovereignty.
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
