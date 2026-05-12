"use client";

import { useLayoutEffect, useState } from "react";
import ClientHeroSection from "@/components/sections/ClientHeroSection";
import ClientAudienceSection from "@/components/sections/ClientAudienceSection";
import ClientTruthSection from "@/components/sections/ClientTruthSection";
import ClientHowItWorksSection from "@/components/sections/ClientHowItWorksSection";
import ClientSystemSection from "@/components/sections/ClientSystemSection";
import ClientProofSection from "@/components/sections/ClientProofSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ClientComparisonSection from "@/components/sections/ClientComparisonSection";
import ClientFoundingMemberSection from "@/components/sections/ClientFoundingMemberSection";
import ClientBonusesSection from "@/components/sections/ClientBonusesSection";
import ClientGuaranteeSection from "@/components/sections/ClientGuaranteeSection";
import ClientFitSection from "@/components/sections/ClientFitSection";
import ClientPricingSection from "@/components/sections/ClientPricingSection";
import ClientFaqSection from "@/components/sections/ClientFaqSection";
import ClientProcessSection from "@/components/sections/ClientProcessSection";
import ClientApplicationSection from "@/components/sections/ClientApplicationSection";
import Footer from "@/components/sections/Footer";
import SectionDivider from "@/components/SectionDivider";

/** Session-only: new browser session → intro again; refresh in same session → skip */
const CLIENT_ENTRANCE_SESSION_KEY = "oztech_client_home_entrance_shown";
/** Must match `.oz-entrance-overlay--client` / `--invest` CSS animation (5.2s) */
const ENTRANCE_MS = 4000;

export default function ClientHomePage() {
  const [showSite, setShowSite] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShowSite(true);
      return;
    }

    let shownThisSession = false;
    try {
      shownThisSession = sessionStorage.getItem(CLIENT_ENTRANCE_SESSION_KEY) === "true";
    } catch {
      shownThisSession = false;
    }

    if (shownThisSession) {
      setShowSite(true);
      return;
    }

    setShowIntro(true);
    try {
      sessionStorage.setItem(CLIENT_ENTRANCE_SESSION_KEY, "true");
    } catch {
      /* ignore */
    }

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      setShowSite(true);
    }, ENTRANCE_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={
        showSite
          ? "bg-[#021f0d] text-white overflow-x-hidden"
          : "min-h-dvh bg-[#021f0d] overflow-hidden"
      }
    >
      {/* Solid brand screen until we know intro vs returning (avoids flashing the landing first) */}
      {!showSite && !showIntro ? (
        <div className="fixed inset-0 z-90 bg-[#021f0d]" aria-hidden />
      ) : null}

      {showIntro ? (
        <div className="oz-entrance-overlay oz-entrance-overlay--client">
          <div className="oz-entrance-glow" />
          <div className="oz-entrance-content">
            <p className="oz-entrance-kicker">Engineering partner, not a vendor</p>
            <h2 className="oz-entrance-title">Build what you see</h2>
            <p className="oz-entrance-subtitle">
              Own the code. Ship in four weeks. One team, unlimited queue.
            </p>
          </div>
        </div>
      ) : null}

      {showSite ? (
        <div className="relative oz-landing-reveal">
          <main className="relative">
            <ClientHeroSection />
            <ClientAudienceSection />
            <SectionDivider type="dark-line" />
            <ClientTruthSection />
            <SectionDivider type="dark-to-light" />
            <ClientHowItWorksSection />
            <SectionDivider type="light-to-dark" />
            <ClientSystemSection />
            <SectionDivider type="dark-to-light" />
            <ClientProofSection />
            <CaseStudiesSection />
            <ClientComparisonSection />
            <SectionDivider type="light-to-dark" />
            <ClientFoundingMemberSection />
            <SectionDivider type="dark-line" />
            <ClientBonusesSection />
            <SectionDivider type="dark-line" />
            <ClientGuaranteeSection />
            <SectionDivider type="dark-to-light" />
            <ClientFitSection />
            <ClientPricingSection />
            <ClientProcessSection />
            <ClientFaqSection />
            <SectionDivider type="light-to-dark" />
            <ClientApplicationSection />
          </main>

          <Footer />
        </div>
      ) : null}
    </div>
  );
}
