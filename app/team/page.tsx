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

const teamSchema = [
  { name: "Cris Vinson", jobTitle: "Co-Founder & Strategic Lead", image: "/members/Cris.png" },
  { name: "Jed Matthew Mamosto", jobTitle: "Tech Lead & Head Engineer", image: "/members/Jed.png" },
  { name: "Louie Dale Cervera", jobTitle: "Backend Software Engineer", image: "/members/Louie.png" },
  { name: "Matthew Ledesma", jobTitle: "Project Manager", image: "/members/Matthew L..png" },
  { name: "Franz Eliezer Samilo", jobTitle: "Frontend Software Engineer", image: "/members/Franz.png" },
].map((m) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: m.name,
  jobTitle: m.jobTitle,
  image: `https://www.unwiz.ai${m.image}`,
  worksFor: { "@type": "Organization", name: "OZ Tech", url: "https://www.unwiz.ai" },
}));

export default function TeamPage() {
  return (
    <>
      {teamSchema.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TeamClient />
    </>
  );
}
