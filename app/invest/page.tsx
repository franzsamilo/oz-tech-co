import type { Metadata } from "next";
import InvestClient from "./InvestClient";

export const metadata: Metadata = {
  title: "Invest in OZ Tech — Software Ownership for Every Business",
  description:
    "We're raising $100,000 to scale from 5 clients to 50. Join 4-10 investors who believe businesses should own their tools, not rent them.",
  openGraph: {
    title: "Invest in OZ Tech — Software Ownership for Every Business",
    description:
      "We're raising $100,000 to scale from 5 clients to 50.",
    url: "https://www.unwiz.ai/invest",
  },
};

export default function InvestPage() {
  return <InvestClient />;
}
