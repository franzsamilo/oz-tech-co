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

export default function ClientLandingPage() {
  return (
    <div className="bg-[#f8fafc] text-[#021f0d] overflow-x-hidden oz-landing-shell">
      <main className="relative">
        <ClientHeroSection />
        <ClientAudienceSection />
        <ClientTruthSection />
        <ClientHowItWorksSection />
        <ClientSystemSection />
        <ClientProofSection />
        <CaseStudiesSection />
        <ClientComparisonSection />
        <ClientFoundingMemberSection />
        <ClientBonusesSection />
        <ClientGuaranteeSection />
        <ClientFitSection />
        <ClientPricingSection />
        <ClientFaqSection />
        <ClientProcessSection />
        <ClientApplicationSection />
      </main>

      <Footer />
    </div>
  );
}
