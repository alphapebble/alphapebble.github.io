import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const baseUrl = process.env.SITE_URL || "https://alphapebble.io";
const blogDir = path.join(process.cwd(), "content", "blog");
const outPath = path.join(process.cwd(), "public", "rss.xml");

const files = fs.existsSync(blogDir)
  ? fs.readdirSync(blogDir).filter(f => f.endsWith(".mdx"))
  : [];

const items = files.map(f => {
  const slug = f.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(blogDir, f), "utf-8");
  const fm = matter(raw).data || {};
  const title = fm.title || slug;
  const desc = fm.subtitle || "";
  const pub = fm.publishedDate ? new Date(fm.publishedDate).toUTCString() : new Date().toUTCString();
  const link = `${baseUrl}/blog/${slug}`;
  return `
    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pub}</pubDate>
      <description><![CDATA[${desc}]]></description>
    </item>`;
}).join("");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Alphapebble Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Posts from Alphapebble</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, xml);
console.log("Wrote", outPath);
