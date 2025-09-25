// scripts/build-data.js
// This script runs at build time to generate static data files

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const OUTPUT_DIR = path.join(process.cwd(), 'public', '_data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function extractHeadings(mdx) {
  const re = /^(#{2,3})\s+(.*)$/gm;
  const out = [];
  let m;

  while ((m = re.exec(mdx)) !== null) {
    const hashes = m[1];
    const text = m[2].trim();
    const type = hashes.length === 2 ? 'h2' : 'h3';
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    out.push({ id, text, type });
  }
  return out;
}

function readContent(dir, type) {
  const dirPath = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(dirPath, filename);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      
      return {
        slug,
        frontmatter: data,
        content,
        headings: extractHeadings(content)
      };
    })
    .sort((a, b) => {
      const da = new Date(a.frontmatter.publishedDate || a.frontmatter.date || 0).getTime();
      const db = new Date(b.frontmatter.publishedDate || b.frontmatter.date || 0).getTime();
      return db - da;
    });
}

// Build blog data
const blogPosts = readContent('blog', 'blog');
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'blog.json'),
  JSON.stringify(blogPosts, null, 2)
);

// Build project data
const projects = readContent('projects', 'projects');
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'projects.json'),
  JSON.stringify(projects, null, 2)
);

// Build legal data
const legal = readContent('legal', 'legal');
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'legal.json'),
  JSON.stringify(legal, null, 2)
);

console.log(`✅ Built data files:`);
console.log(`   📝 Blog posts: ${blogPosts.length}`);
console.log(`   🚀 Projects: ${projects.length}`);
console.log(`   📄 Legal docs: ${legal.length}`);