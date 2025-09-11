import { getBlogPosts } from "@/lib/data";
import { siteConfig } from "@/site.config";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: `${siteConfig.name} Blog`,
    description: siteConfig.description,
    feed_url: `${siteConfig.url}/rss.xml`,
    site_url: siteConfig.url,
    language: "en",
  });

  const posts = await getBlogPosts();

  posts.forEach((post) => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.subtitle,
      url: `${siteConfig.url}/blog/${post.slug}`,
      guid: post.slug,
      date: post.frontmatter.publishedDate || new Date(),
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
