import { getBlogPosts, getProjects } from "@/lib/data";
import { siteConfig } from "@/site.config";

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  try {
    const projects = await getProjects();
    const blogs = await getBlogPosts();

    const projectUrls = projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.frontmatter.lastModified
        ? new Date(project.frontmatter.lastModified)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    const blogUrls = blogs.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.frontmatter.publishedDate
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
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/legal/privacy-policy`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
      {
        url: `${baseUrl}/legal/terms-of-service`,
        lastModified: new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.3,
      },
    ];

    return [...staticUrls, ...projectUrls, ...blogUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
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
