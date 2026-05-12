"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import PasswordLock from "@/components/PasswordLock";
import SectionDivider from "@/components/SectionDivider";
import StickyApplyBar from "@/components/StickyApplyBar";

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

/** Session-only: same behavior as client home intro */
const INVEST_ENTRANCE_SESSION_KEY = "oztech_invest_entrance_shown";
/** Must match `.oz-entrance-overlay--invest` / `--client` CSS animation (2.4s) */
const ENTRANCE_MS = 2400;

export default function InvestClient() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [renderRest, setRenderRest] = useState(false);
  const [landingReady, setLandingReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("oztech_seed_access");
    if (stored === "true") setIsUnlocked(true);
  }, []);

  useEffect(() => {
    if (!isUnlocked || !landingReady) return;
    const timer = setTimeout(() => setRenderRest(true), 400);
    return () => clearTimeout(timer);
  }, [isUnlocked, landingReady]);

  const skipIntro = () => {
    setShowIntro(false);
    setLandingReady(true);
  };

  useLayoutEffect(() => {
    if (!isUnlocked) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setLandingReady(true);
      return;
    }

    let shownThisSession = false;
    try {
      shownThisSession = sessionStorage.getItem(INVEST_ENTRANCE_SESSION_KEY) === "true";
    } catch {
      shownThisSession = false;
    }

    if (shownThisSession) {
      setLandingReady(true);
      return;
    }

    setShowIntro(true);
    try {
      sessionStorage.setItem(INVEST_ENTRANCE_SESSION_KEY, "true");
    } catch {
      /* ignore */
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      setLandingReady(true);
    }, ENTRANCE_MS);

    return () => window.clearTimeout(timer);
  }, [isUnlocked]);

  const shellLight =
    "bg-[#021f0d] text-white overflow-x-hidden";

  return (
    <>
      <PasswordLock onUnlock={() => setIsUnlocked(true)} />

      <div
        className={
          isUnlocked
            ? landingReady
              ? shellLight
              : "min-h-dvh bg-[#021f0d] overflow-hidden"
            : shellLight
        }
      >
        {isUnlocked ? (
          <>
            {!landingReady && !showIntro ? (
              <div className="fixed inset-0 z-90 bg-[#021f0d]" aria-hidden />
            ) : null}

            {showIntro ? (
              <div className="oz-entrance-overlay oz-entrance-overlay--invest">
                <button
                  type="button"
                  onClick={skipIntro}
                  className="oz-entrance-skip"
                  aria-label="Skip intro"
                >
                  Skip →
                </button>
                <div className="oz-entrance-glow" />
                <div className="oz-entrance-content">
                  <p className="oz-entrance-kicker">Seed Round · Series A Path</p>
                  <h2 className="oz-entrance-title">The Curtain Opens</h2>
                  <p className="oz-entrance-subtitle">
                    $100K seed · 4–10 investors · 48-hour review.
                  </p>
                </div>
              </div>
            ) : null}

            {landingReady ? (
              <div className="relative oz-landing-reveal">
                <main className="relative">
                  <HeroSection />
                  <SectionDivider type="dark-to-light" />
                  <SocialProofSection />
                  <SectionDivider type="light-to-dark" />
                  <TruthSection />

                  {renderRest && (
                    <>
                      <SectionDivider type="dark-to-light" />
                      <VisionSection />
                      <SectionDivider type="light-to-dark" />
                      <SystemSection />
                      <SectionDivider type="dark-to-light" />
                      <CaseStudiesSection />
                      <BusinessModelSection />
                      <OpportunitySection />
                      <SectionDivider type="light-to-dark" />
                      <RisksSection />
                      <SectionDivider type="dark-line" />
                      <InvestmentSection />
                      <SectionDivider type="dark-to-light" />
                      <InvestorsSection />
                      <TeamSection />
                      <FaqSection />
                      <SectionDivider type="light-to-dark" />
                    </>
                  )}
                  <ApplicationSection />
                </main>

                <Footer />
                <StickyApplyBar label="Apply to Invest" />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}
