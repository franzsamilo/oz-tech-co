"use client";

import { usePathname } from "next/navigation";
import GoldenThread from "@/components/GoldenThread";
import BlogFloatingCTA from "@/components/blog/BlogFloatingCTA";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const suppressChrome =
    pathname?.startsWith("/studio") || pathname?.startsWith("/clarity");

  if (suppressChrome) {
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
