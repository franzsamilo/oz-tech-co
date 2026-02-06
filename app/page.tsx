"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import DecryptedText from "@/components/DecryptedText";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import StaggeredMenu from "@/components/StaggeredMenu";
import ProfileCard from "@/components/ProfileCard";
import LaserFlow from "@/components/LaserFlow";
import Folder from "@/components/Folder";
import TargetCursor from "@/components/TargetCursor";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Type assertion for components that expect HTMLElement ref
  const scrollContainerRefAsHTMLElement =
    scrollContainerRef as React.RefObject<HTMLElement>;

  // Team member carousel state
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Project showcase state
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isShowcaseSectionVisible, setIsShowcaseSectionVisible] =
    useState(false);

  // Section visibility tracking for performance optimization
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(["hero"]),
  ); // Start with hero visible

  const teamMembers = [
    {
      id: "cris",
      name: "Cris Vinson",
      title: "Co-Founder & Strategic Lead",
      avatarUrl: "/members/Cris.png",
      handle: "crisvinson",
      description:
        "10 years of digital marketing expertise. Gold SaaS Award winner. Generated $1M+ through single funnel. Led 25+ AI implementations and created 300+ remote positions.",
      skills: [
        "Conversion Strategy",
        "Performance Marketing",
        "Operational Systems",
        "Team Leadership",
        "AI Implementation",
      ],
      stats: [
        { label: "Years Experience", value: "10+" },
        { label: "AI Projects", value: "25+" },
        { label: "Revenue Generated", value: "$100M+" },
      ],
      imageConfig: {
        objectFit: "cover" as const,
        objectPosition: "center center",
        scale: 1,
        bottom: "-1px",
      },
    },
    {
      id: "jed",
      name: "Jed Matthew Mamosto",
      title: "Tech Lead",
      avatarUrl: "/members/Jed.png",
      handle: "jedmamosto",
      description:
        "Leads technical strategy for high-impact projects at the intersection of technology and social good. Expert in AI engineering and software architecture.",
      skills: [
        "AI Engineering",
        "Full-stack Development",
        "Software Architecture",
        "Project Management",
        "Community Leadership",
      ],
      stats: [
        { label: "GDSC Years", value: "4" },
        { label: "Projects Led", value: "15+" },
        { label: "Team Size", value: "30+" },
      ],
      imageConfig: {
        objectFit: "cover" as const,
        objectPosition: "center 25%",
        scale: 1.05,
        bottom: "-1px",
      },
    },
    {
      id: "matthew",
      name: "Matthew Ledesma",
      title: "Project Manager",
      avatarUrl: "/members/Matthew L..png",
      handle: "matthewledesma",
      description:
        "Expert in managing complex digital platforms under tight constraints. Award-winning project leader. 2nd Place Microsoft Imagine Cup Philippines. Top 20 Finalist PolyHack Hong Kong.",
      skills: [
        "Project Lifecycle",
        "Team Coordination",
        "Stakeholder Management",
        "Agile Methodology",
        "Product Scaling",
      ],
      stats: [
        { label: "Awards", value: "2" },
        { label: "Projects Managed", value: "20+" },
        { label: "Success Rate", value: "100%" },
      ],
      imageConfig: {
        objectFit: "cover" as const,
        objectPosition: "center center",
        scale: 1,
        bottom: "-1px",
      },
    },
    {
      id: "louie",
      name: "Louie Dale Cervera",
      title: "Backend Software Engineer",
      avatarUrl: "/members/Louie.png",
      handle: "louiecervera",
      description:
        "Specializes in invisible architecture powering modern applications. GIS-integrated dashboards, IoT-driven smart systems. Expert in technical design, DevOps, and embedded systems.",
      skills: [
        "Technical Design",
        "DevOps",
        "GIS Capabilities",
        "IoT Integration",
        "Computer Vision",
      ],
      stats: [
        { label: "Systems Built", value: "50+" },
        { label: "GIS Projects", value: "10+" },
        { label: "IoT Integrations", value: "15+" },
      ],
      imageConfig: {
        objectFit: "cover" as const,
        objectPosition: "center center",
        scale: 1,
        bottom: "-1px",
      },
    },
    {
      id: "franz",
      name: "Franz Eliezer Samilo",
      title: "Frontend Software Engineer",
      avatarUrl: "/members/Franz.png",
      handle: "franzsamilo",
      description:
        "Specialist in high-performance user interfaces. Architected custom ML/DL framework. Built AI-augmented search interfaces. Expert in design systems and motion systems.",
      skills: [
        "Design Systems",
        "Motion Systems",
        "ML/DL Frameworks",
        "Knowledge Graph Rendering",
        "Real-time Data Streaming",
      ],
      stats: [
        { label: "Frameworks Built", value: "5+" },
        { label: "UI Systems", value: "20+" },
        { label: "ML Projects", value: "10+" },
      ],
      imageConfig: {
        objectFit: "cover" as const,
        objectPosition: "center center",
        scale: 1,
        bottom: "-1px",
      },
    },
  ];

  // Project data from the-team-and-co.md
  const projects = [
    {
      id: 1,
      name: "The Nomad Escape",
      fileName: "nomad_escape.btb",
      description:
        "Member network platform with Better Teams Build Calculator generating 50+ leads at Web Summit",
      category: "Member Networks & Platforms",
      fullContent: `The Nomad Escape: Built Better Teams Build Calculator for 100,000+ member network, generating 50+ leads at Web Summit.

PROJECT OVERVIEW:
A comprehensive member network platform serving over 100,000 members with complex data management needs. The Better Teams Build Calculator was a key feature that generated significant lead generation at Web Summit.

KEY FEATURES:
- Large-scale membership platform architecture
- Complex data management and analytics
- Lead generation tools and calculators
- Web Summit integration and lead tracking

TECHNICAL CAPABILITIES:
- Experience serving large-scale membership platforms
- Complex data needs handling
- Conversion-focused platform design
- Measurable results tracking

RESULTS:
- 100,000+ member network served
- 50+ leads generated at Web Summit
- Proven track record in membership platform management`,
      technologies: [
        "Membership Platforms",
        "Data Analytics",
        "Lead Generation",
        "Conversion Optimization",
      ],
      team: ["Cris Vinson - Strategic Lead"],
    },
    {
      id: 2,
      name: "Mentoria",
      fileName: "mentoria.ai",
      description:
        "Youth mentorship platform with context-aware AI, secure authentication, and gamified progression",
      category: "AI-Powered Applications",
      fullContent: `Mentoria: Youth mentorship platform with context-aware AI, secure authentication, and a gamified progression system.

PROJECT OVERVIEW:
A comprehensive youth mentorship platform that leverages AI to provide personalized guidance and support. The platform features secure authentication, gamified progression systems, and context-aware AI capabilities.

KEY FEATURES:
- Context-aware AI for personalized mentorship
- Secure authentication system
- Gamified progression and achievement system
- Custom motion systems and typography
- Tactile and engaging user interface

TECHNICAL CAPABILITIES:
- 25+ successful AI implementations
- Full-stack development lifecycle
- Fluid, state-driven animations
- Real-time data streaming interfaces
- Visual identity architecture

TECHNOLOGIES:
- AI/ML frameworks
- Secure authentication
- Gamification systems
- Motion design systems
- Real-time data processing

RESULTS:
- Successful platform launch
- Engaging user experience
- Proven AI implementation methodology`,
      technologies: [
        "AI/ML",
        "Authentication",
        "Gamification",
        "Motion Design",
        "Real-time Systems",
      ],
      team: [
        "Matthew Ledesma - Project Manager",
        "Louie Dale Cervera - Backend Engineer",
        "Franz Eliezer Samilo - Frontend Engineer",
      ],
    },
    {
      id: 3,
      name: "Rare Philippines",
      fileName: "rare_marine.dash",
      description:
        "Marine enforcement dashboard with AI analytics, geospatial mapping, and role-based access",
      category: "Coastal Conservation Technology",
      fullContent: `Rare Philippines: Marine enforcement dashboard with AI analytics, geospatial mapping, and role-based access control.

PROJECT OVERVIEW:
A specialized dashboard for marine enforcement operations, integrating AI analytics, geospatial mapping, and comprehensive role-based access control. Built for coastal and environmental mission-driven organizations.

KEY FEATURES:
- AI-powered analytics and insights
- Geographic Information System (GIS) integration
- Geospatial mapping and visualization
- Role-based access control (RBAC)
- Real-time environmental monitoring
- Dashboard transitions and data streaming

TECHNICAL CAPABILITIES:
- GIS-integrated dashboards
- AI analytics implementation
- Geospatial data visualization
- Secure access management
- Real-time data streaming interfaces
- Intuitive environmental monitoring

TECHNOLOGIES:
- GIS systems
- AI analytics
- Geospatial mapping
- Role-based access control
- Real-time data processing

RESULTS:
- Direct experience with coastal/environmental organizations
- Specialized dashboard features delivered
- Successful GIS capability integration`,
      technologies: [
        "GIS",
        "AI Analytics",
        "Geospatial Mapping",
        "RBAC",
        "Real-time Monitoring",
      ],
      team: [
        "Louie Dale Cervera - Backend Engineer",
        "Franz Eliezer Samilo - Frontend Engineer",
      ],
    },
    {
      id: 4,
      name: "Civy",
      fileName: "civy.payment",
      description:
        "Multi-tenant payment platform with automated reconciliation and real-time data synchronization",
      category: "Payment & Financial Infrastructure",
      fullContent: `Civy: Multi-tenant payment platform with automated reconciliation and real-time data synchronization.

PROJECT OVERVIEW:
A comprehensive multi-tenant payment platform designed for secure, scalable financial operations. Features automated reconciliation, real-time data synchronization, and robust financial infrastructure.

KEY FEATURES:
- Multi-tenant architecture
- Automated payment reconciliation
- Real-time data synchronization
- Secure financial transactions
- Scalable payment infrastructure
- Transaction monitoring and reporting

TECHNICAL CAPABILITIES:
- Secure, scalable financial systems
- Multi-tenant platform architecture
- Automated reconciliation systems
- Real-time data synchronization
- Financial transaction security
- Payment infrastructure design

TECHNOLOGIES:
- Payment Processing
- Multi-tenant Architecture
- Financial APIs
- Real-time Synchronization
- Automated Reconciliation

RESULTS:
- Secure payment platform delivered
- Scalable infrastructure implemented
- Proven experience in financial systems`,
      technologies: [
        "Payment Processing",
        "Multi-tenant Architecture",
        "Financial APIs",
        "Real-time Sync",
        "Automated Reconciliation",
      ],
      team: ["Louie Dale Cervera - Backend Engineer"],
    },
    {
      id: 5,
      name: "Produkta",
      fileName: "produkta.msme",
      description:
        "Dedicated platform for Iloilo MSMEs in partnership with DTI Region VI",
      category: "Public Sector Solutions",
      fullContent: `Produkta Platform: Dedicated platform for Iloilo MSMEs in partnership with DTI Region VI.

PROJECT OVERVIEW:
A specialized marketplace platform designed to support Micro, Small, and Medium Enterprises (MSMEs) in Iloilo. Developed in partnership with DTI Region VI to achieve regional economic goals.

KEY FEATURES:
- MSME marketplace platform
- Regional economic development focus
- DTI partnership integration
- Product listing and management
- Business profile management
- Regional economic analytics

TECHNICAL CAPABILITIES:
- Full-lifecycle project management
- Stakeholder management (DTI/LGU)
- Technical requirements fulfillment
- Regional economic goal alignment
- Marketplace platform architecture
- Business management tools

TECHNOLOGIES:
- Marketplace Platform
- Business Management Systems
- Regional Analytics
- Partnership Integration

RESULTS:
- Successful partnership with DTI Region VI
- Regional economic goals achieved
- Technical requirements met
- Platform successfully deployed`,
      technologies: [
        "Marketplace Platform",
        "Business Management",
        "Regional Analytics",
        "Partnership Integration",
      ],
      team: ["Matthew Ledesma - Project Manager"],
    },
    {
      id: 6,
      name: "Transport Guide",
      fileName: "transport.iloilo",
      description:
        "Public Transportation Guide for Iloilo City tourists and locals",
      category: "Public Utility",
      fullContent: `Transportation Solutions: Public Transportation Guide for Iloilo City tourists and locals.

PROJECT OVERVIEW:
A mobile application focused on local transit logistics, designed to help both tourists and locals navigate Iloilo City's public transportation system. Currently in active development with coordination from NGOs and the Iloilo City Local Government Unit.

KEY FEATURES:
- Public transportation route mapping
- Real-time transit information
- Tourist-friendly navigation
- Local transit logistics
- Mobile application design
- LGU coordination and integration

TECHNICAL CAPABILITIES:
- Mobile application strategy
- Transit logistics systems
- Route mapping and navigation
- Real-time data integration
- Public sector coordination
- User-centric design

TECHNOLOGIES:
- Mobile Application Development
- Transit Logistics
- Route Mapping
- Real-time Data
- LGU Integration

STATUS:
- Currently in active development
- Coordinating with NGOs and Iloilo City LGU
- Focused on urban transport planning solutions`,
      technologies: [
        "Mobile Development",
        "Transit Logistics",
        "Route Mapping",
        "Real-time Data",
        "LGU Integration",
      ],
      team: [
        "Jed Matthew Mamosto - Tech Lead",
        "Matthew Ledesma - Project Manager",
      ],
    },
  ];

  const resetCarousel = useCallback(() => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    const memberCount = teamMembers.length;
    carouselIntervalRef.current = setInterval(() => {
      setCurrentMemberIndex((prev) => (prev + 1) % memberCount);
    }, 10000);
  }, [teamMembers.length]);

  const goToNext = useCallback(() => {
    const memberCount = teamMembers.length;
    setCurrentMemberIndex((prev) => (prev + 1) % memberCount);
    resetCarousel();
  }, [teamMembers.length, resetCarousel]);

  const goToPrevious = useCallback(() => {
    const memberCount = teamMembers.length;
    setCurrentMemberIndex((prev) => (prev - 1 + memberCount) % memberCount);
    resetCarousel();
  }, [teamMembers.length, resetCarousel]);

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    resetCarousel();
    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, [resetCarousel]);

  // Track all section visibility for performance optimization
  useEffect(() => {
    const sections = ["hero", "about", "innovation", "showcase", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setVisibleSections((prev) => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(sectionId);
              } else {
                next.delete(sectionId);
              }
              return next;
            });

            // Special handling for showcase section (for TargetCursor)
            if (sectionId === "showcase") {
              setIsShowcaseSectionVisible(entry.isIntersecting);
            }
          });
        },
        { threshold: 0.1, rootMargin: "50px" }, // Trigger when 10% visible, with 50px margin
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Handle smooth scroll navigation for hash links
  useEffect(() => {
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link && link.hash) {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          // Get the target element's position relative to the container
          const containerRect = container.getBoundingClientRect();
          const targetRect = targetElement.getBoundingClientRect();

          // Calculate scroll position
          const scrollTop =
            container.scrollTop + (targetRect.top - containerRect.top) - 100; // 100px offset from top

          container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: "smooth",
          });
        } else if (targetElement) {
          // Fallback: scroll the window if no container
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Use capture phase to catch events before they bubble
    document.addEventListener("click", handleHashClick, true);
    return () => document.removeEventListener("click", handleHashClick, true);
  }, []);

  const menuItems = [
    { label: "Home", link: "#hero", ariaLabel: "Go to home" },
    { label: "About Us", link: "#about", ariaLabel: "Learn about us" },
    { label: "The Team", link: "#innovation", ariaLabel: "Meet the team" },
    { label: "Showcase", link: "#showcase", ariaLabel: "View showcase" },
    { label: "Contact", link: "#contact", ariaLabel: "Get in touch" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
    { label: "GitHub", link: "https://github.com" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Staggered Menu */}
      <StaggeredMenu
        position="right"
        colors={["#0a0a0a", "#1a1a1a", "#2a1a0a"]}
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#5EE414"
        openMenuButtonColor="#0a0a0a"
        accentColor="#5EE414"
        isFixed={true}
        changeMenuColorOnOpen={true}
        closeOnClickAway={true}
      />

      <div
        ref={scrollContainerRef}
        className="h-screen bg-[#0a0a0a] grainy-bg cracked-maze overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative w-full"
      >
        {/* Hero Section - Imbalanced Layout */}
        <section
          id="hero"
          className="h-screen flex items-center relative overflow-hidden px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 section-transition-start snap-start snap-always w-full max-w-full"
        >
          {/* Animated background elements - Asymmetric */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-[15%] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-[#5EE414]/20 rounded-full blur-3xl green-glow" />
            <div className="absolute bottom-[20%] right-[10%] w-56 h-56 sm:w-72 sm:h-72 md:w-[28rem] md:h-[28rem] bg-[#5EE414]/15 rounded-full blur-3xl" />
            <div className="absolute top-[60%] left-[70%] w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-[#5EE414]/10 rounded-full blur-2xl" />
          </div>

          {/* Tech grid overlay - Cracked pattern */}
          <div className="absolute inset-0 tech-grid opacity-20" />
          <div className="absolute inset-0 tech-magic-glow" />

          {/* LaserFlow accent effect for "CH" in OZTECH - Only render when section is visible */}
          {visibleSections.has("hero") && (
            <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
              <div
                className="absolute hidden sm:block"
                style={{
                  top: "50%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                  width: "70vw",
                  height: "100vh",
                  maxWidth: "1200px",
                  maxHeight: "1400px",
                }}
              >
                <LaserFlow
                  color="#5EE414"
                  wispDensity={2.0}
                  fogIntensity={0.7}
                  flowSpeed={0.5}
                  wispSpeed={22.0}
                  wispIntensity={8.0}
                  flowStrength={0.45}
                  mouseTiltStrength={0.03}
                  horizontalBeamOffset={0.2}
                  verticalBeamOffset={0.05}
                  verticalSizing={3.0}
                  horizontalSizing={0.8}
                  fogScale={0.35}
                  decay={1.4}
                  falloffStart={1.5}
                  fogFallSpeed={0.9}
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          <div className="relative z-10 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 sm:mb-8 md:mb-12 relative"
            >
              <div className="cracked-text distorted-text" data-text="OZTECH">
                <DecryptedText
                  text="OZTECH"
                  speed={20}
                  maxIterations={25}
                  sequential={true}
                  revealDirection="center"
                  useOriginalCharsOnly={true}
                  animateOn="view"
                  className="text-white text-[clamp(3rem,15vw,11rem)] font-tech tracking-widest green-glow-text relative z-10"
                  encryptedClassName="text-[#5EE414]/70 font-mono"
                  parentClassName="block"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 sm:mb-12 md:mb-16 max-w-2xl"
            >
              <div className="cracked-text" data-text="NAVIGATING THE MAZE">
                <DecryptedText
                  text="NAVIGATING THE MAZE"
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  className="text-white text-xl sm:text-2xl md:text-3xl lg:text-5xl font-cracked leading-tight green-glow-text mb-4"
                  encryptedClassName="text-[#5EE414]/40"
                />
              </div>
              <DecryptedText
                text="OF DIGITAL INNOVATION"
                speed={30}
                maxIterations={15}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="text-[#5EE414] text-lg sm:text-xl md:text-2xl lg:text-4xl font-cracked leading-tight ml-8 sm:ml-12 md:ml-16"
                encryptedClassName="text-[#5EE414]/30"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-start gap-4"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-xs sm:text-sm text-[#5EE414]/70 font-cracked uppercase tracking-wider"
              >
                Scroll to explore
              </motion.div>
              <div className="w-px h-12 bg-[#5EE414]/30 mt-1" />
            </motion.div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="h-screen flex items-center relative overflow-hidden px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 grainy-bg cracked-maze section-transition-middle snap-start snap-always w-full max-w-full"
        >
          {/* Two Column Layout */}
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 relative">
            {/* Left Column - Text Content */}
            <div className="relative bg-[#1a0a0a] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 z-10 overflow-hidden">
              <div className="w-full max-w-2xl">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 sm:mb-8 md:mb-12"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative">
                    <Image
                      src="/logo.png"
                      alt="OZ Tech Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-4 sm:mb-6 md:mb-8"
                >
                  <h1 className="font-tech text-[#5EE414] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                    <span className="block border-b-2 border-[#5EE414] pb-2 mb-2">
                      Who
                    </span>
                    <span className="block border-b-2 border-[#5EE414] pb-2 mb-2">
                      we
                    </span>
                    <span className="block border-b-2 border-[#5EE414] pb-2">
                      are.
                    </span>
                  </h1>
                </motion.div>

                {/* Body Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="space-y-2 sm:space-y-3 md:space-y-4"
                >
                  <p className="text-white font-cracked text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-semibold">
                    Meet the digital innovation specialists
                  </p>
                  <p className="text-white/80 font-cracked text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    Our technical experts harness diverse
                  </p>
                  <p className="text-white/80 font-cracked text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    professional experience to deliver
                  </p>
                  <p className="text-white/80 font-cracked text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    personalized solutions to our clients.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Right Column - Image with Overlay */}
            <div className="relative h-full overflow-hidden">
              {/* Background Pattern/Image Placeholder - Tech-themed texture */}
              <div className="absolute inset-0 bg-linear-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]">
                <div className="absolute inset-0 tech-grid opacity-30" />
                <div className="absolute inset-0 cracked-maze opacity-40" />
                <div className="absolute inset-0">
                  <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#5EE414]/15 rounded-full blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#5EE414]/10 rounded-full blur-3xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5EE414]/5 rounded-full blur-3xl" />
                </div>
              </div>

              {/* Semi-transparent Overlay Shape that bleeds into left column */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-[15%] w-80 h-[500px] sm:w-96 sm:h-[600px] bg-[#5EE414]/15 rounded-2xl rotate-12 z-20 mix-blend-screen" />

              {/* Centered Image Container - Only animate ScrollVelocity when visible */}
              <div className="relative h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 z-30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
                >
                  {/* ScrollVelocity Card - Only render when section is visible */}
                  {visibleSections.has("about") && (
                    <div className="relative bg-[#1a0a0a] rounded-lg overflow-hidden aspect-[3/4] shadow-2xl">
                      <div className="absolute inset-0 bg-linear-to-br from-[#5EE414]/10 via-[#1a0a0a] to-[#0a0a0a] flex items-center justify-center p-4">
                        <div className="w-full h-full flex items-center justify-center">
                          <ScrollVelocity
                            scrollContainerRef={scrollContainerRefAsHTMLElement}
                            texts={[
                              "OZ TECH",
                              "INNOVATION",
                              "EXCELLENCE",
                              "TECHNOLOGY",
                              "DIGITAL",
                              "SOLUTIONS",
                            ]}
                            velocity={80}
                            className="text-[#5EE414]"
                            parallaxClassName="py-2 relative z-10"
                            scrollerClassName="text-[#5EE414] green-glow-text font-tech"
                            textSize="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                            fontWeight="font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Showcase Section */}
        <section
          id="innovation"
          className="h-screen flex items-center relative overflow-hidden px-4 sm:px-6 md:px-12 lg:px-20 section-transition-middle snap-start snap-always w-full max-w-full"
        >
          <div className="absolute inset-0 tech-grid opacity-10" />
          <div className="absolute inset-0 tech-magic-glow" />

          {/* OZ Logo - Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ root: scrollContainerRef, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="absolute top-4 sm:top-6 md:top-8 lg:top-12 xl:top-16 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 z-20"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative">
              <Image
                src="/logo.png"
                alt="OZ Tech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <div className="container mx-auto w-full max-w-7xl relative z-10 flex flex-col h-full justify-center">
            {/* Section Header */}
            <div className="mb-3 sm:mb-4 md:mb-6 text-center px-2">
              <ScrollReveal
                scrollContainerRef={scrollContainerRefAsHTMLElement}
                enableBlur={true}
                baseOpacity={0.2}
                baseRotation={2}
                blurStrength={5}
                containerClassName="mb-2 sm:mb-3 md:mb-4"
                textClassName="text-white"
                textSize="text-[clamp(1.5rem,5vw,4rem)] sm:text-[clamp(2rem,6vw,4rem)]"
                fontWeight="font-bold"
                margin="my-0"
              >
                <span className="font-tech">MEET THE</span>
              </ScrollReveal>
              <ScrollReveal
                scrollContainerRef={scrollContainerRefAsHTMLElement}
                enableBlur={true}
                baseOpacity={0.2}
                baseRotation={-1}
                blurStrength={5}
                containerClassName="mb-2 sm:mb-3 md:mb-4"
                textClassName="text-[#5EE414]"
                textSize="text-[clamp(1.25rem,4vw,3.5rem)] sm:text-[clamp(1.75rem,5vw,3.5rem)]"
                fontWeight="font-bold"
                margin="my-0"
              >
                <span className="font-cracked">TEAM</span>
              </ScrollReveal>
            </div>

            {/* Carousel Container - Only animate when section is visible */}
            <div className="relative w-full flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {teamMembers.map((member, index) => {
                  if (index !== currentMemberIndex) return null;

                  const isVisible = visibleSections.has("innovation");

                  return (
                    <motion.div
                      key={member.id}
                      initial={
                        isVisible ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }
                      }
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={
                        isVisible
                          ? { duration: 0.6, ease: "easeInOut" }
                          : { duration: 0 }
                      }
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
                    >
                      {/* Left Side - Profile Card */}
                      <div className="flex justify-center lg:justify-start px-2 sm:px-0">
                        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg profile-card-theme scale-90 sm:scale-95 md:scale-100 lg:scale-95 xl:scale-100">
                          <ProfileCard
                            avatarUrl={member.avatarUrl}
                            name={member.name}
                            title={member.title}
                            handle={member.handle}
                            status="Available"
                            contactText="Connect"
                            showUserInfo={false}
                            enableTilt={visibleSections.has("innovation")}
                            enableMobileTilt={false}
                            innerGradient="linear-gradient(145deg, rgba(255, 107, 53, 0.2) 0%, rgba(10, 10, 10, 0.9) 100%)"
                            behindGlowColor="rgba(255, 107, 53, 0.3)"
                            behindGlowSize="200px"
                            className="w-full"
                            imageObjectFit={member.imageConfig.objectFit}
                            imagePosition={member.imageConfig.objectPosition}
                            imageScale={member.imageConfig.scale}
                            imageBottom={member.imageConfig.bottom}
                          />
                        </div>
                      </div>

                      {/* Right Side - Description & Stats */}
                      <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center px-2 sm:px-0">
                        {/* Description with DecryptedText */}
                        <div className="space-y-2 sm:space-y-3 md:space-y-4">
                          <DecryptedText
                            text={member.description}
                            speed={30}
                            maxIterations={15}
                            sequential={true}
                            revealDirection="start"
                            animateOn="view"
                            className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed font-cracked break-words"
                            encryptedClassName="text-[#5EE414]/40"
                          />
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="text-[#5EE414] font-tech text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-wider mb-2 sm:mb-3 md:mb-4 lg:mb-5">
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                            {member.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 sm:px-3 md:px-4 lg:px-5 py-1 sm:py-1.5 md:py-2 lg:py-2.5 bg-[#1a0a0a]/50 border border-[#5EE414]/20 rounded-lg text-white/80 text-[10px] sm:text-xs md:text-sm lg:text-base font-cracked hover:border-[#5EE414]/40 transition-all"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Navigation Buttons - Central Reference Point */}
              <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mt-auto mb-2 sm:mb-3 md:mb-4 px-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToPrevious}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#1a0a0a]/50 border border-[#5EE414]/30 hover:border-[#5EE414] flex items-center justify-center transition-all hover:green-glow touch-manipulation"
                  aria-label="Previous member"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EE414]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                {/* Indicator Dots */}
                <div className="flex gap-1.5 sm:gap-2 md:gap-3">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentMemberIndex(index);
                        resetCarousel();
                      }}
                      className={`h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 rounded-full transition-all touch-manipulation ${
                        index === currentMemberIndex
                          ? "bg-[#5EE414] w-6 sm:w-7 md:w-8 lg:w-10"
                          : "bg-[#5EE414]/30 hover:bg-[#5EE414]/50"
                      }`}
                      aria-label={`Go to member ${index + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={goToNext}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#1a0a0a]/50 border border-[#5EE414]/30 hover:border-[#5EE414] flex items-center justify-center transition-all hover:green-glow touch-manipulation"
                  aria-label="Next member"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#5EE414]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section - Hacker Computer Vibe */}
        <section
          id="showcase"
          className="h-screen flex items-center relative overflow-hidden px-2 sm:px-3 md:px-4 lg:px-6 xl:px-12 section-transition-middle snap-start snap-always w-full max-w-full"
        >
          {/* Custom Hacker Background - Lightweight CSS-based */}
          <div className="absolute inset-0 hacker-bg"></div>

          {/* TargetCursor for hacker vibe - Only active in section 4 */}
          {isShowcaseSectionVisible && (
            <TargetCursor
              targetSelector=".hacker-target"
              spinDuration={1.5}
              hideDefaultCursor={true}
              hoverDuration={0.15}
              parallaxOn={true}
            />
          )}

          <div className="container mx-auto w-full max-w-7xl relative z-10 h-full flex flex-col px-1 sm:px-2">
            {/* Terminal Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ root: scrollContainerRef, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mb-3 sm:mb-4 md:mb-6"
            >
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                <div className="flex gap-1 sm:gap-1.5 md:gap-2 shrink-0">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#5EE414]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#87D32E]"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-[#ADCB14]"></div>
                </div>
                <div className="flex-1 bg-[#0a0a0a]/80 border border-[#5EE414]/30 rounded px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 min-w-0">
                  <span className="text-[#5EE414] font-mono text-[10px] sm:text-xs md:text-sm truncate block">
                    oz-tech@terminal:~$
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-hidden">
              {/* Left Side - Terminal Windows & Files */}
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-6 overflow-y-auto max-h-full scrollbar-hide hover:scrollbar-hide">
                {/* Terminal Windows */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#0a0a0a]/90 border border-[#5EE414]/40 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 hacker-target"
                >
                  <div className="font-mono text-[#5EE414] text-[10px] sm:text-xs md:text-sm space-y-0.5 sm:space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#87D32E]">$</span>
                      <span>ls -la projects/</span>
                    </div>
                    <div className="text-[#5EE414]/60">
                      total {projects.length}
                    </div>
                    {projects.slice(0, 3).map((proj, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#87D32E]">drwxr-xr-x</span>
                        <span className="text-[#5EE414]">{proj.fileName}</span>
                      </div>
                    ))}
                    <div className="text-[#5EE414]/40 mt-2">...</div>
                  </div>
                </motion.div>

                {/* Files Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
                >
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedProject(project.id)}
                      className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer hacker-target"
                    >
                      <Folder
                        color="#5EE414"
                        size={0.7}
                        items={[]}
                        className="hacker-target sm:scale-100 scale-90"
                      />
                      <div className="text-center w-full">
                        <p className="text-[#5EE414] font-mono text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold mb-0.5 sm:mb-1 break-all px-1">
                          {project.fileName}
                        </p>
                        <p className="text-white/60 font-mono text-[8px] sm:text-[9px] md:text-[10px] text-center line-clamp-2 px-1">
                          {project.name}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Additional Terminal Window */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-[#0a0a0a]/90 border border-[#5EE414]/40 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 lg:p-5 hacker-target"
                >
                  <div className="font-mono text-[#5EE414] text-[10px] sm:text-xs md:text-sm space-y-0.5 sm:space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#87D32E]">$</span>
                      <span>cat stats.txt</span>
                    </div>
                    <div className="text-[#5EE414]/60">30+ team members</div>
                    <div className="text-[#5EE414]/60">1000+ sub accounts</div>
                    <div className="text-[#5EE414]/60">
                      300+ remote positions
                    </div>
                    <div className="text-[#5EE414]/60">
                      $100M+ client revenue
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Project Details */}
              <div className="flex flex-col min-h-0">
                {selectedProject ? (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    className="bg-[#0a0a0a]/90 border border-[#5EE414]/40 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 h-full flex flex-col min-h-0"
                  >
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <h3 className="text-[#5EE414] font-mono text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 font-semibold break-words">
                        {projects.find((p) => p.id === selectedProject)?.name}
                      </h3>
                      <p className="text-[#87D32E] font-mono text-[10px] sm:text-xs md:text-sm mb-2 sm:mb-3 md:mb-4">
                        {
                          projects.find((p) => p.id === selectedProject)
                            ?.category
                        }
                      </p>
                    </div>

                    <div className="flex-1 mb-3 sm:mb-4 md:mb-6 overflow-y-auto min-h-0">
                      <DecryptedText
                        text={
                          projects.find((p) => p.id === selectedProject)
                            ?.description || ""
                        }
                        speed={30}
                        maxIterations={15}
                        sequential={true}
                        revealDirection="start"
                        animateOn="view"
                        className="text-white/90 font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed break-words"
                        encryptedClassName="text-[#5EE414]/40"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsProjectModalOpen(true)}
                      className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-[#5EE414]/20 hover:bg-[#5EE414]/30 border border-[#5EE414]/50 hover:border-[#5EE414] text-[#5EE414] font-mono text-[10px] sm:text-xs md:text-sm lg:text-base rounded-lg transition-all hacker-target w-full sm:w-auto"
                    >
                      [OPEN FILE]
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#0a0a0a]/90 border border-[#5EE414]/40 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 h-full flex items-center justify-center"
                  >
                    <div className="text-center px-2">
                      <p className="text-[#5EE414]/60 font-mono text-xs sm:text-sm md:text-base lg:text-lg mb-1 sm:mb-2">
                        $ select_project
                      </p>
                      <p className="text-white/40 font-mono text-[10px] sm:text-xs md:text-sm">
                        Click a file to view project details
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Project Modal - Hacker Vibe Popup */}
          <AnimatePresence>
            {isProjectModalOpen && selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsProjectModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0a0a0a] border-2 border-[#5EE414] rounded-lg sm:rounded-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
                >
                  {/* Modal Header */}
                  <div className="bg-[#15443B] border-b border-[#5EE414]/50 p-2 sm:p-3 md:p-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-1">
                      <div className="flex gap-1 sm:gap-1.5 shrink-0">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#5EE414]"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#87D32E]"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#ADCB14]"></div>
                      </div>
                      <span className="text-[#5EE414] font-mono text-[10px] sm:text-xs md:text-sm lg:text-base truncate">
                        {
                          projects.find((p) => p.id === selectedProject)
                            ?.fileName
                        }
                      </span>
                    </div>
                    <button
                      onClick={() => setIsProjectModalOpen(false)}
                      className="text-[#5EE414] hover:text-[#87D32E] font-mono text-xl sm:text-2xl md:text-3xl shrink-0"
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                    <div className="mb-3 sm:mb-4 md:mb-6">
                      <h2 className="text-[#5EE414] font-mono text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1 sm:mb-2 font-bold break-words">
                        {projects.find((p) => p.id === selectedProject)?.name}
                      </h2>
                      <p className="text-[#87D32E] font-mono text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">
                        {
                          projects.find((p) => p.id === selectedProject)
                            ?.category
                        }
                      </p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 md:space-y-6">
                      <DecryptedText
                        text={
                          projects.find((p) => p.id === selectedProject)
                            ?.fullContent || ""
                        }
                        speed={25}
                        maxIterations={20}
                        sequential={true}
                        revealDirection="start"
                        animateOn="view"
                        className="text-white/90 font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line break-words"
                        encryptedClassName="text-[#5EE414]/40"
                      />

                      {/* Technologies */}
                      {projects.find((p) => p.id === selectedProject)
                        ?.technologies && (
                        <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-[#5EE414]/30">
                          <h3 className="text-[#87D32E] font-mono text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 font-semibold">
                            TECHNOLOGIES:
                          </h3>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                            {projects
                              .find((p) => p.id === selectedProject)
                              ?.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 md:py-1.5 bg-[#5EE414]/10 border border-[#5EE414]/30 rounded text-[#5EE414] font-mono text-[10px] sm:text-xs md:text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Team Members */}
                      {projects.find((p) => p.id === selectedProject)?.team && (
                        <div className="mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-[#5EE414]/30">
                          <h3 className="text-[#87D32E] font-mono text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 md:mb-4 font-semibold">
                            TEAM:
                          </h3>
                          <div className="space-y-1.5 sm:space-y-2">
                            {projects
                              .find((p) => p.id === selectedProject)
                              ?.team.map((member, idx) => (
                                <div
                                  key={idx}
                                  className="text-white/80 font-mono text-[10px] sm:text-xs md:text-sm lg:text-base break-words"
                                >
                                  <span className="text-[#5EE414]">→</span>{" "}
                                  {member}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Contact Section - Contact Form */}
        <section
          id="contact"
          className="h-screen flex items-center justify-center relative overflow-hidden px-3 sm:px-4 md:px-6 lg:px-12 xl:px-20 grainy-bg cracked-maze section-transition-end snap-start snap-always w-full max-w-full"
        >
          <div className="absolute inset-0 tech-magic-glow" />
          <div className="container mx-auto w-full max-w-4xl relative z-10 px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ root: scrollContainerRef, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              {/* Section Header */}
              <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-center px-2">
                <div
                  className="cracked-text distorted-text mb-2 sm:mb-3 md:mb-4"
                  data-text="GET IN TOUCH"
                >
                  <DecryptedText
                    text="GET IN TOUCH"
                    speed={40}
                    maxIterations={12}
                    sequential={true}
                    revealDirection="center"
                    animateOn="view"
                    className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-tech mb-1 sm:mb-2 leading-tight green-glow-text"
                    encryptedClassName="text-[#5EE414]/40"
                  />
                </div>
                <DecryptedText
                  text="Let's build something amazing together"
                  speed={30}
                  maxIterations={15}
                  sequential={true}
                  revealDirection="start"
                  animateOn="view"
                  className="text-[#5EE414] text-sm sm:text-base md:text-lg lg:text-xl font-cracked px-2"
                  encryptedClassName="text-[#5EE414]/30"
                />
              </div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ root: scrollContainerRef, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4 sm:space-y-6 md:space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Handle form submission here
                  const formData = new FormData(e.currentTarget);
                  console.log("Form submitted:", Object.fromEntries(formData));
                }}
              >
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-[#5EE414] font-tech text-sm sm:text-base uppercase tracking-wider mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#1a0a0a]/50 border border-[#5EE414]/30 rounded-lg sm:rounded-xl text-white font-cracked text-sm sm:text-base placeholder:text-white/30 focus:outline-none focus:border-[#5EE414] focus:bg-[#1a0a0a]/70 transition-all cracked-border"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-[#5EE414] font-tech text-sm sm:text-base uppercase tracking-wider mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-[#1a0a0a]/50 border border-[#5EE414]/30 rounded-lg sm:rounded-xl text-white font-cracked text-sm sm:text-base placeholder:text-white/30 focus:outline-none focus:border-[#5EE414] focus:bg-[#1a0a0a]/70 transition-all cracked-border"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="relative">
                  <label
                    htmlFor="subject"
                    className="block text-[#5EE414] font-tech text-xs sm:text-sm md:text-base uppercase tracking-wider mb-1.5 sm:mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#1a0a0a]/50 border border-[#5EE414]/30 rounded-lg sm:rounded-xl text-white font-cracked text-xs sm:text-sm md:text-base placeholder:text-white/30 focus:outline-none focus:border-[#5EE414] focus:bg-[#1a0a0a]/70 transition-all cracked-border"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block text-[#5EE414] font-tech text-xs sm:text-sm md:text-base uppercase tracking-wider mb-1.5 sm:mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-[#1a0a0a]/50 border border-[#5EE414]/30 rounded-lg sm:rounded-xl text-white font-cracked text-xs sm:text-sm md:text-base placeholder:text-white/30 focus:outline-none focus:border-[#5EE414] focus:bg-[#1a0a0a]/70 transition-all resize-none cracked-border"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ root: scrollContainerRef, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex justify-center pt-2 sm:pt-4"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 sm:px-10 md:px-12 lg:px-16 py-3 sm:py-4 md:py-5 bg-[#5EE414] hover:bg-[#87D32E] active:bg-[#ADCB14] text-white rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base lg:text-lg font-tech uppercase tracking-wider transition-colors touch-manipulation green-glow cracked-border w-full sm:w-auto min-w-[180px] sm:min-w-[200px]"
                  >
                    Send Message
                  </motion.button>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
