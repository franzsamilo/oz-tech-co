"use client";

import { usePathname } from "next/navigation";
import GoldenThread from "@/components/GoldenThread";
import BlogFloatingCTA from "@/components/blog/BlogFloatingCTA";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <GoldenThread />
      {children}
      <BlogFloatingCTA />
    </>
  );
}
