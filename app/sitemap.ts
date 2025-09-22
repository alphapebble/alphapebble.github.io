// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getBlogPosts, getProjects } from "@/lib/data";
import { siteConfig } from "@/site.config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  try {
    const [projects, blogs] = await Promise.all([getProjects(), getBlogPosts()]);

    const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.frontmatter.lastModified
        ? new Date(project.frontmatter.lastModified)
        : new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    const blogUrls: MetadataRoute.Sitemap = blogs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.frontmatter.publishedDate
        ? new Date(post.frontmatter.publishedDate)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    const staticUrls: MetadataRoute.Sitemap = [
      { url: baseUrl,                lastModified: new Date(), changeFrequency: "daily",  priority: 1.0 },
      { url: `${baseUrl}/projects`,  lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
      { url: `${baseUrl}/blog`,      lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
      { url: `${baseUrl}/privacy-policy`,   lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
      { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];

    return [...staticUrls, ...projectUrls, ...blogUrls];
  } catch (err) {
    console.error("Error generating sitemap:", err);
    return [
      { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    ];
  }
}
