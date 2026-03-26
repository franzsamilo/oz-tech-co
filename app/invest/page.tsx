"use client";

import { useEffect, useLayoutEffect, useState } from "react";
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

/** Session-only: same behavior as client home intro */
const INVEST_ENTRANCE_SESSION_KEY = "oztech_invest_entrance_shown";
/** Must match `.oz-entrance-overlay--invest` / `--client` CSS (5.2s) */
const ENTRANCE_MS = 5200;

export default function InvestLandingPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [renderRest, setRenderRest] = useState(false);
  const [landingReady, setLandingReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("oztech_seed_access");
    if (stored === "true") setIsUnlocked(true);
  }, []);

  useEffect(() => {
    if (!isUnlocked || !landingReady) return;
    const timer = setTimeout(() => setRenderRest(true), 800);
    return () => clearTimeout(timer);
  }, [isUnlocked, landingReady]);

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
    "bg-[#f8fafc] text-[#021f0d] overflow-x-hidden oz-landing-shell";

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
                <div className="oz-entrance-content">
                  <p className="oz-entrance-kicker">Welcome to Oz Tech</p>
                  <h2 className="oz-entrance-title">The Curtain Opens</h2>
                  <p className="oz-entrance-subtitle">
                    Step into technology sovereignty.
                  </p>
                </div>
              </div>
            ) : null}

            {landingReady ? (
              <div className="relative oz-landing-reveal">
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
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}
