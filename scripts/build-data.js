import fs from "fs";
import matter from "gray-matter";
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PUBLIC_OUTPUT_DIR = path.join(process.cwd(), "public", "_data");

if (!fs.existsSync(PUBLIC_OUTPUT_DIR)) {
  fs.mkdirSync(PUBLIC_OUTPUT_DIR, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainTextFromNode(node) {
  if (!node) return "";
  if (node.type === "text") return node.value || "";
  if (Array.isArray(node.children)) {
    return node.children.map(plainTextFromNode).join("");
  }
  return "";
}

function extractHeadings(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const out = [];
  (function walk(n) {
    if (!n) return;
    if (n.type === "heading" && n.depth >= 2 && n.depth <= 4) {
      const text = plainTextFromNode(n).trim();
      if (text) {
        out.push({
          id: slugify(text),
          text,
          type: n.depth === 2 ? "h2" : n.depth === 3 ? "h3" : "h4",
        });
      }
    }
    if (Array.isArray(n.children)) n.children.forEach(walk);
  })(tree);
  return out;
}

async function mdToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["yaml"])
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return String(file);
}

async function readContent(dir, type) {
  const dirPath = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(dirPath)) {
    console.warn(`Directory ${dirPath} does not exist, returning empty array`);
    return [];
  }

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
  console.log(`Found ${files.length} ${type} files in ${dirPath}`);

  const items = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const fullPath = path.join(dirPath, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const html = await mdToHtml(content);
      console.log(`Processed ${type}: ${slug}`);
      return {
        slug,
        frontmatter: data,
        content,
        html,
        headings: extractHeadings(content),
      };
    })
  );

  return items.sort((a, b) => {
    const da = new Date(
      a.frontmatter.publishedDate || a.frontmatter.date || 0
    ).getTime();
    const db = new Date(
      b.frontmatter.publishedDate || b.frontmatter.date || 0
    ).getTime();
    return db - da;
  });
}

console.log("🛠️ Building static data...");

const blogPosts = await readContent("blog", "blog post");
const projects = await readContent("projects", "project");
const legal = await readContent("legal", "legal document");

const outputs = [
  { name: "blog", data: blogPosts },
  { name: "projects", data: projects },
  { name: "legal", data: legal },
];

for (const { name, data } of outputs) {
  const json = JSON.stringify(data, null, 2);
  const publicPath = path.join(PUBLIC_OUTPUT_DIR, `${name}.json`);
  fs.writeFileSync(publicPath, json);
  console.log(`✅ Wrote ${name}.json → /public/_data`);
}

console.log(`🏁 Done!`);
console.log(`   📝 Blog posts: ${blogPosts.length}`);
console.log(`   🚀 Projects: ${projects.length}`);
console.log(`   📄 Legal docs: ${legal.length}`);
