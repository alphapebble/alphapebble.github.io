import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects, getLegalDocuments } from "@/lib/data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alphapebble.io";
  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily",  priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`,     lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  try {
    const legals = await getLegalDocuments();
    for (const d of legals) {
      urls.push({
        url: `${baseUrl}/legal/${d.slug}`,
        lastModified: new Date(d.frontmatter?.lastUpdated || Date.now()),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
  } catch {}

  try {
    const projects = await getProjects();
    for (const p of projects) {
      urls.push({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.frontmatter?.lastModified ? new Date(p.frontmatter.lastModified) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  } catch {}

  try {
    const posts = await getBlogPosts();
    for (const post of posts) {
      urls.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.frontmatter?.publishedDate ? new Date(post.frontmatter.publishedDate) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  } catch {}

  return urls;
}
