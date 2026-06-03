import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Thin wrapper over `sanityClient.fetch` that applies the project's default
 * revalidation window. Callers are responsible for short-circuiting via
 * `isSanityConfigured` before hitting this — there is no built-in fallback.
 */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  revalidate = 60
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate },
  });
}
