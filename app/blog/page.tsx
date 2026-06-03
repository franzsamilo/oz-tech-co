import type { Metadata } from "next";
import Link from "next/link";
import BlogIndexHero from "@/components/blog/BlogIndexHero";
import BlogPostCard from "@/components/blog/BlogPostCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import AuthorsRow from "@/components/blog/AuthorsRow";
import Footer from "@/components/sections/Footer";
import {
  getAllPosts,
  getAuthorsWithPostCounts,
  usingSampleContent,
} from "@/lib/blog/data";

export const metadata: Metadata = {
  title: "Field Notes — OZ Tech",
  description:
    "What the OZ Tech engineering team is learning while building — real lessons from real projects. No agency fluff.",
  openGraph: {
    title: "Field Notes — OZ Tech",
    description:
      "Real engineers sharing real lessons from custom software and AI projects.",
    url: "https://www.unwiz.ai/blog",
  },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const [posts, authors] = await Promise.all([
    getAllPosts(),
    getAuthorsWithPostCounts(),
  ]);

  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  const showAuthorsRow = authors.length > 1;
  const showLatest = rest.length > 0;

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <BlogIndexHero />

      {posts.length === 0 ? (
        <section
          data-theme="light"
          className="bg-[#f9fafb] text-[#021f0d] py-20 md:py-28"
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="oz-city-card p-8 sm:p-12 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-[#021f0d] mb-4">
                No posts yet
              </h2>
              <p className="text-[#021f0d]/60 leading-relaxed">
                The team hasn&apos;t published their first field note. Write one in{" "}
                <Link href="/studio" className="text-[#006c40] font-semibold underline">
                  Studio
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {featured ? (
            <section
              data-theme="light"
              className="bg-[#f9fafb] text-[#021f0d] pt-12 md:pt-16 pb-14 md:pb-16"
            >
              <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
                {usingSampleContent ? (
                  <div className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#006c40]">
                    <span className="w-2 h-2 rounded-full bg-[#006c40]/40" />
                    Sample posts — connect Sanity at{" "}
                    <Link href="/studio" className="underline">
                      /studio
                    </Link>{" "}
                    to publish your own
                  </div>
                ) : null}
                <FeaturedPost post={featured} />
              </div>
            </section>
          ) : null}

          {showAuthorsRow ? <AuthorsRow authors={authors} /> : null}

          {showLatest ? (
            <section
              data-theme="light"
              className="bg-[#f9fafb] text-[#021f0d] py-16 md:py-20"
            >
              <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
                <div className="mb-10">
                  <span className="oz-badge oz-badge-green">All Notes</span>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#021f0d]">
                    Latest from the lab
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {rest.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section
              data-theme="light"
              className="bg-[#f9fafb] text-[#021f0d] pb-20 md:pb-28"
            >
              <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full text-center">
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#021f0d]/40">
                  More field notes are being drafted. Check back soon.
                </p>
              </div>
            </section>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
