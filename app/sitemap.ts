import { siteConfig } from "@/app/site.config";
import { getProjects, getResearchPosts } from "@/lib/data";

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  try {
    const projects = await getProjects();
    const researches = await getResearchPosts();

    const projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified:
        project.frontmatter?.lastModified &&
        typeof project.frontmatter.lastModified === "string" &&
        project.frontmatter.lastModified.trim() !== ""
          ? new Date(project.frontmatter.lastModified)
          : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const researchUrls = researches.map((post) => ({
      url: `${baseUrl}/research/${post.slug}`,
      lastModified:
        post.frontmatter?.publishedDate &&
        typeof post.frontmatter.publishedDate === "string" &&
        post.frontmatter.publishedDate.trim() !== ""
          ? new Date(post.frontmatter.publishedDate)
          : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));

    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/projects`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/research`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
    ];

    return [...staticUrls, ...projectUrls, ...researchUrls];
  } catch (error) {
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
    ];
  }
}
