import Image from "next/image";
import Link from "next/link";
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

export default function BlogPostCard({ post }: { post: BlogPostListItem }) {
  const coverUrl = post.coverImageUrl || getImageUrl(post.coverImage, 800, 450);

  return (
    <article className="oz-city-card overflow-hidden flex flex-col h-full group">
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-[#021f0d]/5">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-[#021f0d] via-[#006c40] to-[#5df3c2]/30" />
        )}
        {post.featured ? (
          <span className="absolute top-4 left-4 oz-badge oz-badge-gold">Featured</span>
        ) : null}
      </Link>
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {post.tags && post.tags.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-3">
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
          <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-[#021f0d] leading-tight group-hover:text-[#006c40] transition-colors">
            {post.title}
          </h2>
        </Link>
        <p className="mt-3 text-sm text-[#021f0d]/60 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-5 pt-5 border-t border-[#021f0d]/6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <AuthorByline author={post.author} size="sm" />
          <time
            dateTime={post.publishedAt}
            className="text-[10px] font-mono uppercase tracking-widest text-[#021f0d]/40 shrink-0"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}
