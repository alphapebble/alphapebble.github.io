import { getBlogPosts, getProjects } from "@/lib/data";
import { siteConfig } from "@/site.config";

export default async function sitemap() {
  const baseUrl = siteConfig.url;

  const projects = await getProjects();
  const blogs = await getBlogPosts();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
  ];

  return [...staticUrls, ...projectUrls, ...blogUrls];
}
