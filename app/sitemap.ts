import type { MetadataRoute } from "next";
// If we keep the dynamic fetches, they must be edge-safe.
// Otherwise comment them out first to confirm sitemap works.
import { getBlogPosts, getProjects } from "@/lib/data";

// 1) Force static so it’s built once and not executed at the edge.
export const dynamic = "force-static";
// Optional: re-generate occasionally if we later enable ISR for this route.
// export const revalidate = 3600; // seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 2) Hard-code the production origin to avoid env indirection.
  const baseUrl = "https://alphapebble.io";

  // 3) Start with static pages (always safe)
  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,            lastModified: new Date(), changeFrequency: "daily",  priority: 1.0 },
    { url: `${baseUrl}/projects`,    lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`,        lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/legal/privacy-policy`,   lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // 4) Add dynamic entries, but **guard** so failures don’t 500 the route
  try {
    const projects = await getProjects();
    for (const project of projects) {
      urls.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: project.frontmatter?.lastModified
          ? new Date(project.frontmatter.lastModified)
          : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch (e) {
    // swallow errors to keep sitemap working
  }

  try {
    const posts = await getBlogPosts();
    for (const post of posts) {
      urls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.frontmatter?.publishedDate
          ? new Date(post.frontmatter.publishedDate)
          : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch (e) {
    // swallow errors to keep sitemap working
  }

  return urls;
}
