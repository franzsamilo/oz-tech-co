import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorByline from "@/components/blog/AuthorByline";
import BlogPostCard from "@/components/blog/BlogPostCard";
import PortableTextBody from "@/components/blog/PortableTextBody";
import ReadingProgress from "@/components/blog/ReadingProgress";
import Footer from "@/components/sections/Footer";
import { getImageUrl } from "@/lib/sanity/image";
import {
  calcReadingTime,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog/data";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found — Field Notes | OZ Tech" };
  }

  const ogImage = post.coverImageUrl || getImageUrl(post.coverImage, 1200, 630);

  return {
    title: `${post.title} — Field Notes | OZ Tech`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://www.unwiz.ai/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverUrl = post.coverImageUrl || getImageUrl(post.coverImage, 1600, 900);
  const authorImageUrl = post.author?.photoUrl
    ? post.author.photoUrl
    : post.author?.photo
      ? getImageUrl(post.author.photo, 256, 256)
      : null;

  const related = await getRelatedPosts(post, 3);
  const readingMinutes = calcReadingTime(post.body);

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `https://www.unwiz.ai/blog/${post.slug}`,
    image: coverUrl || "https://www.unwiz.ai/ozlogo.png",
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          jobTitle: post.author.role,
          ...(authorImageUrl ? { image: authorImageUrl } : {}),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "OZ Tech",
      url: "https://www.unwiz.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://www.unwiz.ai/ozlogo.png",
      },
    },
  };

  return (
    <article className="min-h-screen bg-[#f9fafb]">
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      <header
        data-theme="dark"
        className="relative bg-[#021f0d] text-white pt-8 pb-16 md:pb-24 overflow-hidden oz-hero-glow"
      >
        {coverUrl ? (
          <div className="absolute inset-0 opacity-20">
            <Image src={coverUrl} alt="" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-linear-to-t from-[#021f0d] via-[#021f0d]/90 to-[#021f0d]/70" />
          </div>
        ) : null}

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5df3c2] hover:text-white transition-colors mb-8"
          >
            ← All field notes
          </Link>

          {post.tags && post.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#5df3c2]/90 bg-white/5 px-2 py-0.5 rounded border border-[#5df3c2]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter leading-[0.95]">
            {post.title}
          </h1>

          <p className="mt-6 text-lg text-white/60 leading-relaxed">{post.excerpt}</p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-white/10">
            <AuthorByline author={post.author} size="lg" variant="light" showBio linkToAuthor />
            <div className="flex flex-col sm:items-end gap-1 shrink-0">
              <time
                dateTime={post.publishedAt}
                className="text-[10px] font-mono uppercase tracking-widest text-white/40"
              >
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#5df3c2]/70">
                {readingMinutes} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#f9fafb] py-16 md:py-24">
        <PortableTextBody value={post.body} />
      </section>

      {post.author ? (
        <section className="bg-white border-t border-[#021f0d]/6 py-16">
          <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#006c40] mb-6">
              About the author
            </p>
            <AuthorByline author={post.author} size="lg" showBio showMotto linkToAuthor />
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <Link
                href={`/blog/author/${post.author.slug}`}
                className="text-[10px] font-black uppercase tracking-widest text-[#006c40] hover:text-[#021f0d] transition-colors"
              >
                More from {post.author.name.split(" ")[0]} →
              </Link>
              <Link
                href="/team"
                className="text-[10px] font-black uppercase tracking-widest text-[#021f0d]/40 hover:text-[#021f0d] transition-colors"
              >
                Meet the full team →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section
          data-theme="light"
          className="bg-[#f9fafb] text-[#021f0d] py-16 md:py-20 border-t border-[#021f0d]/6"
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
            <div className="mb-10">
              <span className="oz-badge oz-badge-green">Keep Reading</span>
              <h2 className="mt-4 text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-[#021f0d]">
                More field notes
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((item) => (
                <BlogPostCard key={item._id} post={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#021f0d] py-16 text-center">
        <div className="max-w-xl mx-auto px-5">
          <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-white mb-4">
            Want this team building for you?
          </h2>
          <p className="text-white/60 mb-8">
            Unlimited custom software and AI — one flat fee, full code ownership.
          </p>
          <Link href="/#application" className="oz-btn-primary inline-flex min-h-11 items-center px-8">
            Apply with OZ Tech
          </Link>
        </div>
      </section>

      <Footer />
    </article>
  );
}
