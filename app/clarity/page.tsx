import type { Metadata } from "next";
import ClarityPage from "./ClarityPage";

export const metadata: Metadata = {
  title: "Book a Clarity Call — OZ Tech",
  description:
    "30 minutes with the OZ Tech founders. Bring your idea, leave with a build plan. No sales pitch.",
  openGraph: {
    title: "Book a Clarity Call — OZ Tech",
    description:
      "30 minutes with the OZ Tech founders. Bring your idea, leave with a build plan.",
    url: "https://www.unwiz.ai/clarity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Clarity Call — OZ Tech",
    description:
      "30 minutes with the OZ Tech founders. Bring your idea, leave with a build plan.",
  },
  alternates: {
    canonical: "https://www.unwiz.ai/clarity",
  },
};

const clarityCallSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Free Strategy Call",
  name: "OZ Tech Clarity Call",
  provider: {
    "@type": "Organization",
    name: "OZ Tech",
    url: "https://www.unwiz.ai",
  },
  description:
    "A 30-minute, no-pressure call with the OZ Tech founders. We listen to where you're stuck, sketch the path forward, and tell you whether we're the right team to ship it.",
  areaServed: "Worldwide",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clarityCallSchema) }}
      />
      <ClarityPage />
    </>
  );
}
