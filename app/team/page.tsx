import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Meet the Team — OZ Tech",
  description:
    "The engineering team behind OZ Tech. 5 specialists in full-stack development, systems architecture, AI integration, and high-conversion design.",
  openGraph: {
    title: "Meet the Team — OZ Tech",
    description: "The engineering team behind OZ Tech.",
    url: "https://www.unwiz.ai/team",
  },
};

export default function TeamPage() {
  return <TeamClient />;
}
