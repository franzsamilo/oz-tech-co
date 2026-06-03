import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { getImageUrl } from "@/lib/sanity/image";
import type { SanityImageAsset } from "@/lib/sanity/types";

type CodeBlockValue = {
  _type: "code";
  language?: string;
  code?: string;
};

type UrlImageValue = {
  _type: "urlImage";
  url?: string;
  alt?: string;
  caption?: string;
  /** "wide" (16/9, default), "tall" (4/5), or "square" (1/1) */
  ratio?: "wide" | "tall" | "square" | "auto";
  /** "screenshot" gives a paper-card frame; default is "photo" */
  frame?: "photo" | "screenshot";
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <div className="mt-16 mb-7">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-[#006c40]" />
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#006c40]">
            §
          </span>
        </div>
        <h2 className="text-2xl sm:text-[1.875rem] font-heading font-black uppercase tracking-tight text-[#021f0d] leading-[1.1]">
          {children}
        </h2>
      </div>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-heading font-black uppercase tracking-tight text-[#021f0d] mt-10 mb-3">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <figure className="my-14">
        <span
          aria-hidden="true"
          className="block text-center font-heading text-7xl leading-none text-[#006c40]/30 select-none"
        >
          “
        </span>
        <blockquote className="-mt-3 max-w-2xl mx-auto text-center text-2xl sm:text-3xl font-heading italic text-[#021f0d] leading-snug tracking-tight">
          {children}
        </blockquote>
        <div className="mt-5 mx-auto h-px w-12 bg-[#021f0d]/30" />
      </figure>
    ),
    normal: ({ children }) => (
      <p className="blog-paragraph text-[1.0625rem] md:text-[1.1875rem] text-[#021f0d]/82 leading-[1.78] mb-7">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#021f0d]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-[0.92em] bg-[#021f0d]/5 px-1.5 py-0.5 rounded text-[#006c40]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-[#006c40] font-semibold underline underline-offset-2 hover:text-[#021f0d]"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const img = value as SanityImageAsset & { alt?: string };
      const url = getImageUrl(img, 1200);
      if (!url) return null;
      return (
        <figure className="my-12">
          <div className="relative aspect-video rounded-xl overflow-hidden oz-city-card">
            <Image
              src={url}
              alt={img.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </figure>
      );
    },
    code: ({ value }) => {
      const block = value as CodeBlockValue;
      return (
        <figure className="my-10">
          <pre className="relative p-6 pt-10 rounded-xl bg-[#021f0d] text-[#5df3c2] overflow-x-auto text-[13px] font-mono leading-relaxed border border-[#5df3c2]/15 shadow-[0_24px_60px_-30px_rgba(2,31,13,0.6)]">
            <div className="absolute top-3 left-4 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              {block.language ? (
                <span className="ml-3 text-[10px] uppercase tracking-widest text-white/45">
                  {block.language}
                </span>
              ) : null}
            </div>
            <code>{block.code}</code>
          </pre>
        </figure>
      );
    },
    urlImage: ({ value }) => {
      const v = value as UrlImageValue;
      if (!v.url) return null;
      const ratio = v.ratio ?? "wide";
      const aspectClass =
        ratio === "tall"
          ? "aspect-[4/5]"
          : ratio === "square"
            ? "aspect-square"
            : ratio === "auto"
              ? ""
              : "aspect-video";
      const isScreenshot = v.frame === "screenshot";
      const frameClass = isScreenshot
        ? "rounded-lg overflow-hidden border border-[#021f0d]/10 bg-[#f5f1e8] shadow-[8px_8px_0_rgba(2,31,13,0.08)]"
        : "rounded-xl overflow-hidden oz-city-card shadow-[0_30px_60px_-30px_rgba(2,31,13,0.35)]";
      return (
        <figure className="my-12">
          {isScreenshot ? (
            <div className={`relative ${aspectClass} ${frameClass}`}>
              <div className="absolute top-0 left-0 right-0 h-7 bg-[#021f0d]/5 border-b border-[#021f0d]/10 flex items-center px-3 gap-1.5 z-10">
                <span className="w-2 h-2 rounded-full bg-[#021f0d]/15" />
                <span className="w-2 h-2 rounded-full bg-[#021f0d]/15" />
                <span className="w-2 h-2 rounded-full bg-[#021f0d]/15" />
              </div>
              <Image
                src={v.url}
                alt={v.alt || ""}
                fill
                className="object-contain pt-7"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ) : (
            <div className={`relative ${aspectClass} ${frameClass}`}>
              <Image
                src={v.url}
                alt={v.alt || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          {v.caption ? (
            <figcaption className="mt-4 text-[11px] font-mono uppercase tracking-widest text-[#021f0d]/45 text-center">
              {v.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default function PortableTextBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="blog-prose max-w-[680px] mx-auto px-5 sm:px-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
