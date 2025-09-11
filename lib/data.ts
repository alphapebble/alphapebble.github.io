import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const contentDirectory = path.join(process.cwd(), "content");
const legalDirectory = path.join(process.cwd(), "content/legal");

function extractHeadings(content: string) {
  const headingRegex = /^(##{1,2})\s+(.*)$/gm; // matches ## and ###
  const headings: { id: string; text: string; type: "h2" | "h3" }[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const [, hashes, text] = match;
    const type = hashes.length === 2 ? "h2" : "h3";
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "");
    headings.push({ id, text, type });
  }
  return headings;
}

async function getSortedContentData(type: "blog" | "projects") {
  try {
    const typeDirectory = path.join(contentDirectory, type);

    if (!fs.existsSync(typeDirectory)) {
      console.warn(`Content directory not found: ${typeDirectory}`);
      return [];
    }

    const filenames = fs.readdirSync(typeDirectory);

    const allContentData = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        try {
          const slug = filename.replace(/\.mdx$/, "");
          const fullPath = path.join(typeDirectory, filename);
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data: frontmatter } = matter(fileContents);

          return { slug, frontmatter };
        } catch (error) {
          console.error(`Error processing file ${filename}:`, error);
          return null;
        }
      })
      .filter(Boolean) as Array<{ slug: string; frontmatter: any }>;

    return allContentData.sort((a, b) => {
      const dateA = new Date(
        a.frontmatter.publishedDate || a.frontmatter.date || 0
      );
      const dateB = new Date(
        b.frontmatter.publishedDate || b.frontmatter.date || 0
      );
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error(`Error loading ${type} content:`, error);
    return [];
  }
}

async function getContentBySlug(type: "blog" | "projects", slug: string) {
  try {
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
    const fullPath = path.join(contentDirectory, type, `${sanitizedSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Content not found: ${sanitizedSlug}`);
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    if (frontmatter.heroImage) {
      try {
        const response = await fetch(frontmatter.heroImage);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status}`);
        }
        const buffer = Buffer.from(await response.arrayBuffer());
        const { base64 } = await getPlaiceholder(buffer);
        frontmatter.heroImagePlaceholder = base64;
      } catch (error) {
        console.error(
          `Error processing hero image for ${sanitizedSlug}:`,
          error
        );
      }
    }
    const headings = extractHeadings(content);
    return { frontmatter, content, headings };
  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error);
    throw error;
  }
}

export async function getProjects() {
  return getSortedContentData("projects");
}
export async function getProjectBySlug(slug: string) {
  return getContentBySlug("projects", slug);
}

export async function getBlogPosts() {
  return getSortedContentData("blog");
}
export async function getBlogPostBySlug(slug: string) {
  return getContentBySlug("blog", slug);
}

export interface LegalDocument {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    type: "privacy" | "terms" | "cookies" | "disclaimer";
    lastUpdated: string;
    effectiveDate: string;
    jurisdiction: string;
    version: string;
    showTOC?: boolean;
    tableOfContents?: Array<{
      title: string;
      anchor: string;
    }>;
    contactEmail?: string;
    contactAddress?: string;
    importantNotice?: string;
  };
  content: string;
}

export async function getLegalDocuments(): Promise<LegalDocument[]> {
  try {
    const filenames = fs.readdirSync(legalDirectory);
    const documents = filenames
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => {
        const filePath = path.join(legalDirectory, name);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        return {
          slug: name.replace(".mdx", ""),
          frontmatter: data as LegalDocument["frontmatter"],
          content,
        };
      });
    return documents;
  } catch (error) {
    console.error("Error loading legal documents:", error);
    return [];
  }
}

export async function getLegalBySlug(slug: string): Promise<{
  frontmatter: LegalDocument["frontmatter"] | null;
  content: string;
}> {
  try {
    const filePath = path.join(legalDirectory, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return { frontmatter: null, content: "" };
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as LegalDocument["frontmatter"],
      content,
    };
  } catch (error) {
    console.error(`Error loading legal document ${slug}:`, error);
    return { frontmatter: null, content: "" };
  }
}

export async function generateLegalStaticParams() {
  const documents = await getLegalDocuments();
  return documents.map((doc) => ({ slug: doc.slug }));
}
