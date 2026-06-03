import type { PortableTextBlock } from "@portabletext/types";

export type SanityImageAsset = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type BlogAuthor = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  bio?: string;
  motto?: string;
  photo?: SanityImageAsset | null;
  /** Direct URL fallback (used by sample content; Sanity uses `photo`) */
  photoUrl?: string | null;
};

export type BlogPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featured?: boolean;
  tags?: string[];
  coverImage?: SanityImageAsset | null;
  /** Direct URL fallback (used by sample content; Sanity uses `coverImage`) */
  coverImageUrl?: string | null;
  author: BlogAuthor | null;
};

export type BlogPost = BlogPostListItem & {
  body: PortableTextBlock[];
};

export type BlogPostSlug = {
  slug: string;
};
