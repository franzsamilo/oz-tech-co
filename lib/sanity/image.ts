import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getImageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number
): string | null {
  if (!source) return null;
  let img = urlFor(source).width(width).auto("format").quality(85);
  if (height) {
    img = img.height(height);
  }
  return img.url();
}
