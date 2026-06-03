import Image from "next/image";
import Link from "next/link";
import type { BlogAuthor } from "@/lib/sanity/types";
import { getImageUrl } from "@/lib/sanity/image";

type AuthorBylineProps = {
  author: BlogAuthor | null;
  size?: "sm" | "md" | "lg";
  showBio?: boolean;
  showMotto?: boolean;
  /** light = on dark backgrounds (blog post hero) */
  variant?: "light" | "dark";
  /** Link the name + avatar to the author's archive page */
  linkToAuthor?: boolean;
};

const sizeClasses = {
  sm: { avatar: 36, name: "text-xs", role: "text-[10px]" },
  md: { avatar: 48, name: "text-sm", role: "text-xs" },
  lg: { avatar: 64, name: "text-base", role: "text-sm" },
};

export default function AuthorByline({
  author,
  size = "md",
  showBio = false,
  showMotto = false,
  variant = "dark",
  linkToAuthor = false,
}: AuthorBylineProps) {
  if (!author) return null;

  const s = sizeClasses[size];
  const photoUrl = author.photoUrl || getImageUrl(author.photo, s.avatar * 2, s.avatar * 2);
  const href = linkToAuthor ? `/blog/author/${author.slug}` : null;

  const avatar = (
    <div
      className="relative shrink-0 rounded-full overflow-hidden border border-[#5df3c2]/30 bg-[#021f0d]/40"
      style={{ width: s.avatar, height: s.avatar }}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={author.name}
          width={240}
          height={240}
          className="object-cover w-full h-full scale-[1.5]"
          style={{ objectPosition: "50% 42%", transformOrigin: "50% 42%" }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[#5df3c2] font-black text-sm">
          {author.name.charAt(0)}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex gap-4 items-start">
      {href ? (
        <Link href={href} className="shrink-0 transition-transform hover:scale-105">
          {avatar}
        </Link>
      ) : (
        avatar
      )}
      <div className="min-w-0">
        {href ? (
          <Link href={href}>
            <p
              className={`font-heading font-black uppercase tracking-tight transition-colors ${s.name} ${
                variant === "light"
                  ? "text-white hover:text-[#5df3c2]"
                  : "text-[#021f0d] hover:text-[#006c40]"
              }`}
            >
              {author.name}
            </p>
          </Link>
        ) : (
          <p
            className={`font-heading font-black uppercase tracking-tight ${s.name} ${
              variant === "light" ? "text-white" : "text-[#021f0d]"
            }`}
          >
            {author.name}
          </p>
        )}
        <p
          className={`font-mono uppercase tracking-widest ${s.role} ${
            variant === "light" ? "text-[#5df3c2]" : "text-[#006c40]"
          }`}
        >
          {author.role}
        </p>
        {showBio && author.bio ? (
          <p
            className={`mt-2 text-sm leading-relaxed ${
              variant === "light" ? "text-white/70" : "text-[#021f0d]/70"
            }`}
          >
            {author.bio}
          </p>
        ) : null}
        {showMotto && author.motto ? (
          <p
            className={`mt-3 text-sm font-black italic ${
              variant === "light" ? "text-[#effc5f]" : "text-[#006c40]"
            }`}
          >
            &ldquo;{author.motto}&rdquo;
          </p>
        ) : null}
      </div>
    </div>
  );
}
