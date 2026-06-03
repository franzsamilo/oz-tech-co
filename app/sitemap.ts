import type { MetadataRoute } from "next";
import { getAllPostSlugs, getAuthorSlugs } from "@/lib/blog/data";

const baseUrl = "https://www.unwiz.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/invest`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const [postSlugs, authorSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAuthorSlugs(),
  ]);

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${baseUrl}/blog/author/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...authorRoutes];
}
