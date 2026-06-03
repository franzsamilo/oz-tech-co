import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Footer from "@/components/sections/Footer";
import { getImageUrl } from "@/lib/sanity/image";
import {
  getAuthorBySlug,
  getAuthorSlugs,
  getPostsByAuthor,
} from "@/lib/blog/data";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author not found — Field Notes | OZ Tech" };

  return {
    title: `${author.name} — Field Notes | OZ Tech`,
    description:
      author.bio ?? `Field notes written by ${author.name}, ${author.role} at OZ Tech.`,
    openGraph: {
      title: `${author.name} — Field Notes`,
      description: author.bio ?? `Posts by ${author.name} at OZ Tech.`,
      url: `https://www.unwiz.ai/blog/author/${author.slug}`,
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) notFound();

  const posts = await getPostsByAuthor(slug);
  const photoUrl = author.photoUrl || getImageUrl(author.photo, 320, 320);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    ...(photoUrl ? { image: photoUrl } : {}),
    worksFor: {
      "@type": "Organization",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
    },
    url: `https://www.unwiz.ai/blog/author/${author.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header
        data-theme="dark"
        className="relative bg-[#021f0d] text-white pt-8 pb-16 md:pb-20 overflow-hidden oz-hero-glow"
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5df3c2] hover:text-white transition-colors mb-10"
          >
            ← All field notes
          </Link>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden border border-[#5df3c2]/30 bg-white/5">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={author.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#5df3c2] font-black text-4xl">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <span className="font-mono text-[#effc5f] uppercase tracking-widest text-[10px]">
                {posts.length} {posts.length === 1 ? "field note" : "field notes"}
              </span>
              <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter leading-none">
                {author.name}
              </h1>
              <p className="mt-3 font-mono text-[#5df3c2] uppercase tracking-widest text-xs">
                {author.role}
              </p>
            </div>
          </div>

          {author.bio ? (
            <p className="mt-8 max-w-2xl text-base md:text-lg text-white/70 leading-relaxed">
              {author.bio}
            </p>
          ) : null}

          {author.motto ? (
            <p className="mt-5 text-base font-black italic text-[#effc5f] max-w-2xl">
              &ldquo;{author.motto}&rdquo;
            </p>
          ) : null}
        </div>
      </header>

      <section
        data-theme="light"
        className="bg-[#f9fafb] text-[#021f0d] py-16 md:py-20"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
          <div className="mb-10">
            <span className="oz-badge oz-badge-green">By {author.name.split(" ")[0]}</span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#021f0d]">
              Their field notes
            </h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-[#021f0d]/50 text-sm">
              No published notes yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
