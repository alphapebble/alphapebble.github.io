// lib/data.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/* ===========================
   Types
=========================== */
export type Heading = {
  id: string;
  text: string;
  type: "h2" | "h3";
};

export type BlogFrontmatter = {
  title?: string;
  subtitle?: string;
  tags?: string[];
  heroImage?: string;
  heroImagePlaceholder?: string; // optional; we’re not generating it here
  author?: { name?: string; title?: string; avatar?: string };
  publishedDate?: string; // ISO or readable date
  readTime?: string;      // e.g. "6 min read"
  [key: string]: unknown;
};

export type BlogListItem = {
  slug: string;
  frontmatter: BlogFrontmatter;
};

export type ProjectFrontmatter = {
  title?: string;
  subtitle?: string;
  tags?: string[];
  heroImage?: string;
  [key: string]: unknown;
};

export type ProjectListItem = {
  slug: string;
  frontmatter: ProjectFrontmatter;
};

export interface LegalDocument {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    type: "privacy" | "terms" | "cookies" | "disclaimer";
    lastUpdated?: string;
    effectiveDate?: string;
    jurisdiction?: string;
    version?: string;
    showTOC?: boolean;
    tableOfContents?: Array<{ title: string; anchor: string }>;
    contactEmail?: string;
    contactAddress?: string;
    importantNotice?: string;
  };
  content: string;
}

/* ===========================
   Paths
=========================== */
const CONTENT_ROOT = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_ROOT, "blog");
const PROJECTS_DIR = path.join(CONTENT_ROOT, "projects");
const LEGAL_DIR = path.join(CONTENT_ROOT, "legal");

/* ===========================
   Helpers
=========================== */
function extractHeadings(mdx: string): Heading[] {
  // lines that start with ## or ### (H2/H3)
  const re = /^(#{2,3})\s+(.*)$/gm;
  const out: Heading[] = [];
  let m: RegExpExecArray | null;

  while ((m = re.exec(mdx)) !== null) {
    const hashes = m[1];
    const text = m[2].trim();
    const type: "h2" | "h3" = hashes.length === 2 ? "h2" : "h3";
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    out.push({ id, text, type });
  }
  return out;
}

function readFrontmatterList<T extends object>(dir: string): Array<{ slug: string; frontmatter: T }> {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const full = path.join(dir, filename);
      const raw = fs.readFileSync(full, "utf8");
      const { data } = matter(raw);
      return { slug, frontmatter: data as T };
    })
    .sort((a, b) => {
      const da = new Date((a.frontmatter as any).publishedDate || (a.frontmatter as any).date || 0).getTime();
      const db = new Date((b.frontmatter as any).publishedDate || (b.frontmatter as any).date || 0).getTime();
      return db - da;
    });
}

function readBySlug<TFrontmatter extends object>(dir: string, slug: string) {
  const safe = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  const file = path.join(dir, `${safe}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as TFrontmatter, content };
}

/* ===========================
   Blog
=========================== */
export async function getBlogPosts(): Promise<BlogListItem[]> {
  return readFrontmatterList<BlogFrontmatter>(BLOG_DIR);
}

export async function getBlogPostBySlug(slug: string): Promise<{
  frontmatter: BlogFrontmatter;
  content: string;
  headings: Heading[];
} | null> {
  const res = readBySlug<BlogFrontmatter>(BLOG_DIR, slug);
  if (!res) return null;
  const headings = extractHeadings(res.content);
  return { ...res, headings };
}

/* ===========================
   Projects
=========================== */
export async function getProjects(): Promise<ProjectListItem[]> {
  return readFrontmatterList<ProjectFrontmatter>(PROJECTS_DIR);
}

export async function getProjectBySlug(slug: string): Promise<{
  frontmatter: ProjectFrontmatter;
  content: string;
  headings: Heading[];
} | null> {
  const res = readBySlug<ProjectFrontmatter>(PROJECTS_DIR, slug);
  if (!res) return null;
  const headings = extractHeadings(res.content);
  return { ...res, headings };
}

/* ===========================
   Legal
=========================== */
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  if (!fs.existsSync(LEGAL_DIR)) return [];
  return fs
    .readdirSync(LEGAL_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const file = path.join(LEGAL_DIR, filename);
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        frontmatter: data as LegalDocument["frontmatter"],
        content,
      };
    });
}

export async function getLegalBySlug(slug: string): Promise<{
  frontmatter: LegalDocument["frontmatter"] | null;
  content: string;
}> {
  const res = readBySlug<LegalDocument["frontmatter"]>(LEGAL_DIR, slug);
  if (!res) return { frontmatter: null, content: "" };
  return res;
}

export async function generateLegalStaticParams() {
  const docs = await getLegalDocuments();
  return docs.map((d) => ({ slug: d.slug }));
}
