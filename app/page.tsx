"use client";

import { useEffect, useState } from "react";
import PasswordLock from "@/components/PasswordLock";

// Section components
import HeroSection from "@/components/sections/HeroSection";
import SocialProofSection from "@/components/sections/SocialProofSection";
import TruthSection from "@/components/sections/TruthSection";
import VisionSection from "@/components/sections/VisionSection";
import SystemSection from "@/components/sections/SystemSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import BusinessModelSection from "@/components/sections/BusinessModelSection";
import OpportunitySection from "@/components/sections/OpportunitySection";
import RisksSection from "@/components/sections/RisksSection";
import InvestmentSection from "@/components/sections/InvestmentSection";
import InvestorsSection from "@/components/sections/InvestorsSection";
import TeamSection from "@/components/sections/TeamSection";
import FaqSection from "@/components/sections/FaqSection";
import ApplicationSection from "@/components/sections/ApplicationSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [renderRest, setRenderRest] = useState(false);
  const [showEntrance, setShowEntrance] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("oztech_seed_access");
    if (stored === "true") setIsUnlocked(true);
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;
    const timer = setTimeout(() => setRenderRest(true), 800);
    return () => clearTimeout(timer);
  }, [isUnlocked]);

  useEffect(() => {
    if (!isUnlocked) return;
    const firstVisitKey = "oztech_first_visit_done";
    const stored = localStorage.getItem(firstVisitKey);
    if (stored === "true") return;
    setShowEntrance(true);
    localStorage.setItem(firstVisitKey, "true");
    const timer = setTimeout(() => setShowEntrance(false), 2200);
    return () => clearTimeout(timer);
  }, [isUnlocked]);

  return (
    <div className="bg-[#f8fafc] text-[#021f0d] overflow-x-hidden oz-landing-shell">
      <PasswordLock onUnlock={() => setIsUnlocked(true)} />

      {isUnlocked && (
        <div className="relative">
          {showEntrance && (
            <div className="oz-entrance-overlay">
              <div className="oz-entrance-content">
                <p className="oz-entrance-kicker">Welcome to Oz Tech</p>
                <h2 className="oz-entrance-title">The Curtain Opens</h2>
                <p className="oz-entrance-subtitle">Step into technology sovereignty.</p>
              </div>
            </div>
          )}
          <main className="relative">
            <HeroSection />
            <SocialProofSection />
            <TruthSection />

            {renderRest && (
              <>
                <VisionSection />
                <SystemSection />
                <CaseStudiesSection />
                <BusinessModelSection />
                <OpportunitySection />
                <RisksSection />
                <InvestmentSection />
                <InvestorsSection />
                <TeamSection />
                <FaqSection />
                <ApplicationSection />
              </>
            )}
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}
