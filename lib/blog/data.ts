import type { PortableTextBlock } from "@portabletext/types";
import { sanityFetch } from "@/lib/sanity/client";
import {
  authorBySlugQuery,
  authorSlugsQuery,
  authorsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from "@/lib/sanity/queries";
import type {
  BlogAuthor,
  BlogPost,
  BlogPostListItem,
  BlogPostSlug,
} from "@/lib/sanity/types";
import { isSanityConfigured } from "@/sanity/env";
import {
  sampleAuthorBySlug,
  sampleAuthors,
  samplePosts,
} from "@/data/blogSampleContent";

/**
 * Single source of truth for blog data. Uses live Sanity content when a
 * project is configured, and falls back to bundled sample content so the full
 * UI renders during development and before the CMS is connected.
 */

/** True when results come from sample content rather than Sanity. */
export const usingSampleContent = !isSanityConfigured;

export async function getAllPosts(): Promise<BlogPostListItem[]> {
  if (!isSanityConfigured) return samplePosts;
  return sanityFetch<BlogPostListItem[]>(postsQuery);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured) {
    return samplePosts.find((post) => post.slug === slug) ?? null;
  }
  return sanityFetch<BlogPost | null>(postBySlugQuery, { slug });
}

export async function getAllPostSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return samplePosts.map((post) => post.slug);
  const slugs = await sanityFetch<BlogPostSlug[]>(postSlugsQuery);
  return slugs.map((s) => s.slug);
}

export async function getAllAuthors(): Promise<BlogAuthor[]> {
  if (!isSanityConfigured) return sampleAuthors;
  return sanityFetch<BlogAuthor[]>(authorsQuery);
}

export async function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  if (!isSanityConfigured) return sampleAuthorBySlug(slug);
  return sanityFetch<BlogAuthor | null>(authorBySlugQuery, { slug });
}

export async function getAuthorSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return sampleAuthors.map((a) => a.slug);
  const slugs = await sanityFetch<BlogPostSlug[]>(authorSlugsQuery);
  return slugs.map((s) => s.slug);
}

export async function getPostsByAuthor(
  authorSlug: string,
  options: { excludeSlug?: string; limit?: number } = {}
): Promise<BlogPostListItem[]> {
  const all = await getAllPosts();
  const filtered = all.filter(
    (post) =>
      post.author?.slug === authorSlug && post.slug !== options.excludeSlug
  );
  return options.limit ? filtered.slice(0, options.limit) : filtered;
}

/** Authors that have at least one published post, with their post counts. */
export async function getAuthorsWithPostCounts(): Promise<
  Array<BlogAuthor & { postCount: number }>
> {
  const [authors, posts] = await Promise.all([getAllAuthors(), getAllPosts()]);
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.author?.slug) {
      counts.set(post.author.slug, (counts.get(post.author.slug) ?? 0) + 1);
    }
  }
  return authors
    .map((author) => ({ ...author, postCount: counts.get(author.slug) ?? 0 }))
    .filter((author) => author.postCount > 0);
}

export async function getRelatedPosts(
  post: BlogPostListItem,
  limit = 3
): Promise<BlogPostListItem[]> {
  const all = await getAllPosts();
  const others = all.filter((candidate) => candidate.slug !== post.slug);

  // Prefer same author, then fill with most recent of the rest.
  const sameAuthor = others.filter(
    (candidate) => candidate.author?.slug === post.author?.slug
  );
  const rest = others.filter(
    (candidate) => candidate.author?.slug !== post.author?.slug
  );

  return [...sameAuthor, ...rest].slice(0, limit);
}

/** Rough reading time in minutes for a Portable Text body (220 wpm). */
export function calcReadingTime(body: PortableTextBlock[]): number {
  const words = body
    .flatMap((block) => {
      if (block._type !== "block") return [];
      const children = (block as { children?: Array<{ text?: string }> }).children ?? [];
      return children.map((c) => c.text ?? "");
    })
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
