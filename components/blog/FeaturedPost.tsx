import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostListItem } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";
import AuthorByline from "./AuthorByline";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function FeaturedPost({ post }: { post: BlogPostListItem }) {
  const coverUrl = post.coverImageUrl || getImageUrl(post.coverImage, 1200, 900);

  return (
    <article className="oz-city-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 group">
      <Link
        href={`/blog/${post.slug}`}
        className="relative min-h-[240px] lg:min-h-[420px] overflow-hidden bg-[#021f0d]"
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#021f0d] via-[#006c40] to-[#5df3c2]/40" />
        )}
        <span className="absolute top-5 left-5 oz-badge oz-badge-gold">Featured</span>
      </Link>

      <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
        {post.tags && post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest text-[#006c40]/80 bg-[#006c40]/5 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tighter text-[#021f0d] leading-[0.98] group-hover:text-[#006c40] transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="mt-4 text-sm sm:text-base text-[#021f0d]/60 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
          <AuthorByline author={post.author} size="md" linkToAuthor />
          <time
            dateTime={post.publishedAt}
            className="text-[10px] font-mono uppercase tracking-widest text-[#021f0d]/40"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#006c40] hover:text-[#021f0d] transition-colors"
        >
          Read field note <ArrowRight size={16} strokeWidth={3} />
        </Link>
      </div>
    </article>
  );
}
