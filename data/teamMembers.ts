export type TeamMember = {
  name: string;
  title: string;
  image: string;
  bio: string;
  expertise: string[];
  motto: string;
  details: string[];
  /** URL-safe slug for Sanity author seeding */
  slug: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Cris Vinson",
    slug: "cris-vinson",
    title: "Co-Founder & Strategic Lead",
    image: "/members/Cris.png",
    bio: "Visionary strategist behind the Unlimited Build Method. Cris has orchestrated over 100 successful product launches, specializing in high-velocity growth and human-centric software models.",
    expertise: [
      "Business Strategy",
      "Client Relations",
      "Product Vision",
      "Team Leadership",
    ],
    motto: "Software should empower ownership, not create dependency.",
    details: [
      "10+ Years in Strategic Operations",
      "Built systems generating $100M+ for clients",
      "Specialist in Radical Transparency models",
    ],
  },
  {
    name: "Jed Matthew Mamosto",
    slug: "jed-mamosto",
    title: "Tech Lead & Head Engineer",
    image: "/members/Jed.png",
    bio: "The architect of stability. Jed leads our engineering team with a focus on scalable infrastructure and seamless AI integration. He ensures that every line of code is a long-term asset.",
    expertise: [
      "Full-Stack Dev",
      "Systems Architect",
      "Database Design",
      "AI Integration",
    ],
    motto: "Engineering assets, not just writing code.",
    details: [
      "Engineered Civy's primary payment backbone",
      "Expert in low-latency AI response systems",
      "Infrastructure specialist focusing on 99.9% uptime",
    ],
  },
  {
    name: "Louie Dale Cervera",
    slug: "louie-cervera",
    title: "Backend Software Engineer",
    image: "/members/Louie.png",
    bio: "Scale specialist. Louie designs the robust backends that drive our most complex payment routing and multi-tenant systems. His focus is on security and performance at scale.",
    expertise: [
      "Server Architecture",
      "Security Protocols",
      "Cloud Scale",
      "Core Logic",
    ],
    motto: "Complexity is the enemy of reliability.",
    details: [
      "Architected secure multi-tenant cloud infrastructure",
      "Cloud security specialist for conservation platforms",
      "Performance optimization guru",
    ],
  },
  {
    name: "Matthew Ledesma",
    slug: "matthew-ledesma",
    title: "Project Manager",
    image: "/members/Matthew L..png",
    bio: "The guard of velocity. Matthew maintains the 4-week launch rhythm that defines OZ Tech. He bridges the gap between vision and deployment with ruthless efficiency.",
    expertise: [
      "Execution Roadmap",
      "Daily Ops",
      "Project Velocity",
      "Quality Guard",
    ],
    motto: "Speed is a byproduct of clarity.",
    details: [
      "Project lead for the Mentoria platform scale",
      "Expert in 2-week agile sprint management",
      "Quality assurance specialist",
    ],
  },
  {
    name: "Franz Eliezer Samilo",
    slug: "franz-samilo",
    title: "Frontend Software Engineer",
    image: "/blog1/franz-author.jpg",
    bio: "Frontend at OZ Tech, and good at it. Builds interfaces that don't come out basic — and writes here when something he's figured out is worth saying out loud.",
    expertise: [
      "Brief-first design",
      "Design systems",
      "Frontend engineering",
      "Motion + interaction",
    ],
    motto: "Design isn't waiting on tools. It's waiting on a sentence.",
    details: [
      "Designed the OZ Tech investor and client surfaces",
      "Built the warm and cold archetype reference implementations the team starts from",
      "Author of the design-skill family OZ Tech uses to brief new work",
    ],
  },
];
