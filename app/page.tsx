import type { Metadata } from "next";
import ClientHomePage from "./ClientHomePage";

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

export default function HomePage() {
  return <ClientHomePage />;
}
