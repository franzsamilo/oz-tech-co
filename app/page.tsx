import type { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";
import { clientFaqs } from "@/data/clientPageContent";

export const metadata: Metadata = {
  title: "OZ Tech — Custom Software & AI Engineering",
  description:
    "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership. Your first project live in 4 weeks — guaranteed.",
  openGraph: {
    title: "OZ Tech — Custom Software & AI Engineering",
    description:
      "Unlimited custom software and AI projects. One flat monthly fee. Full code ownership.",
    url: "https://www.unwiz.ai",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Custom Software & AI Engineering",
  provider: { "@type": "Organization", name: "OZ Tech", url: "https://www.unwiz.ai" },
  areaServed: "Worldwide",
  description:
    "Unlimited custom software and AI projects on a flat monthly retainer. Full code ownership. First project live in 4 weeks — guaranteed.",
  offers: {
    "@type": "Offer",
    price: "3500",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "3500",
      priceCurrency: "USD",
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: clientFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ClientHomePage />
    </>
  );
}
