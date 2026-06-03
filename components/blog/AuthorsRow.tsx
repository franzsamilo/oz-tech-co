import Image from "next/image";
import Link from "next/link";
import type { BlogAuthor } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

type AuthorWithCount = BlogAuthor & { postCount: number };

function AuthorChip({ author }: { author: AuthorWithCount }) {
  const photoUrl = author.photoUrl || getImageUrl(author.photo, 96, 96);

  return (
    <Link
      href={`/blog/author/${author.slug}`}
      className="oz-forest-card p-4 flex items-center gap-4 min-w-[240px] group"
    >
      <div className="relative w-12 h-12 shrink-0 rounded-full overflow-hidden border border-[#5df3c2]/30 bg-white/5">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={author.name}
            fill
            sizes="160px"
            className="object-cover scale-[1.5]"
            style={{ objectPosition: "50% 42%", transformOrigin: "50% 42%" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#5df3c2] font-black">
            {author.name.charAt(0)}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-heading font-black uppercase tracking-tight text-sm text-white group-hover:text-[#5df3c2] transition-colors truncate">
          {author.name}
        </p>
        <p className="font-mono uppercase tracking-widest text-[10px] text-[#5df3c2]/70 truncate">
          {author.role}
        </p>
        <p className="font-mono uppercase tracking-widest text-[10px] text-white/30 mt-1">
          {author.postCount} {author.postCount === 1 ? "note" : "notes"}
        </p>
      </div>
    </Link>
  );
}

export default function AuthorsRow({ authors }: { authors: AuthorWithCount[] }) {
  if (authors.length === 0) return null;

  return (
    <section data-theme="dark" className="bg-[#021f0d] py-14 md:py-16 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 w-full">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="oz-badge oz-badge-green">The Writers</span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-white">
              Written by the engineers
            </h2>
          </div>
          <Link
            href="/team"
            className="text-[10px] font-black uppercase tracking-widest text-[#5df3c2] hover:text-white transition-colors whitespace-nowrap"
          >
            Meet the team →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author) => (
            <AuthorChip key={author._id} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
}
