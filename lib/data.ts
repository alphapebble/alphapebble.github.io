// lib/data.ts - Alternative version using public/_data approach
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
  heroImagePlaceholder?: string;
  author?: { name?: string; title?: string; avatar?: string };
  publishedDate?: string;
  readTime?: string;
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
   Data Loading from JSON files
=========================== */
let blogData: any[] | null = null;
let projectsData: any[] | null = null;
let legalData: any[] | null = null;

async function loadBlogData() {
  if (blogData === null) {
    try {
      // Always use imports during build/development - fetch only works at runtime
      const data = await import('../public/_data/blog.json');
      blogData = data.default || data;
      console.log(`✅ Loaded ${blogData!.length} blog posts`);
    } catch (error) {
      console.warn('⚠️ Could not load blog data, falling back to empty array:', error);
      blogData = [];
      // Track error for monitoring
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        console.error('Blog data loading failed:', error);
      }
    }
  }
  return blogData!;
}

async function loadProjectsData() {
  if (projectsData === null) {
    try {
      // Always use imports during build/development - fetch only works at runtime
      const data = await import('../public/_data/projects.json');
      projectsData = data.default || data;
      console.log(`✅ Loaded ${projectsData!.length} projects`);
    } catch (error) {
      console.warn('⚠️ Could not load projects data, falling back to empty array:', error);
      projectsData = [];
    }
  }
  return projectsData!;
}

async function loadLegalData() {
  if (legalData === null) {
    try {
      // Always use imports during build/development - fetch only works at runtime
      const data = await import('../public/_data/legal.json');
      legalData = data.default || data;
      console.log(`✅ Loaded ${legalData!.length} legal documents`);
    } catch (error) {
      console.warn('⚠️ Could not load legal data, falling back to empty array:', error);
      legalData = [];
    }
  }
  return legalData!;
}

/* ===========================
   Blog Functions
=========================== */
export async function getBlogPosts(): Promise<BlogListItem[]> {
  const posts = await loadBlogData();
  return posts.map(post => ({
    slug: post.slug,
    frontmatter: post.frontmatter
  }));
}

export async function getBlogPostBySlug(slug: string): Promise<{
  frontmatter: BlogFrontmatter;
  content: string;
  headings: Heading[];
} | null> {
  const posts = await loadBlogData();
  const post = posts.find(p => p.slug === slug);
  
  if (!post) {
    console.warn(`❌ Blog post not found: ${slug}`);
    return null;
  }

  console.log(`✅ Found blog post: ${slug}`);
  return {
    frontmatter: post.frontmatter,
    content: post.content,
    headings: post.headings
  };
}

/* ===========================
   Project Functions
=========================== */
export async function getProjects(): Promise<ProjectListItem[]> {
  const projects = await loadProjectsData();
  return projects.map(project => ({
    slug: project.slug,
    frontmatter: project.frontmatter
  }));
}

export async function getProjectBySlug(slug: string): Promise<{
  frontmatter: ProjectFrontmatter;
  content: string;
  headings: Heading[];
} | null> {
  const projects = await loadProjectsData();
  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    console.warn(`❌ Project not found: ${slug}`);
    return null;
  }

  console.log(`✅ Found project: ${slug}`);
  return {
    frontmatter: project.frontmatter,
    content: project.content,
    headings: project.headings
  };
}

/* ===========================
   Legal Functions
=========================== */
export async function getLegalDocuments(): Promise<LegalDocument[]> {
  const docs = await loadLegalData();
  return docs.map(doc => ({
    slug: doc.slug,
    frontmatter: doc.frontmatter,
    content: doc.content
  }));
}

export async function getLegalBySlug(slug: string): Promise<{
  frontmatter: LegalDocument["frontmatter"] | null;
  content: string;
}> {
  const docs = await loadLegalData();
  const doc = docs.find(d => d.slug === slug);
  
  if (!doc) {
    console.warn(`❌ Legal document not found: ${slug}`);
    return { frontmatter: null, content: "" };
  }

  console.log(`✅ Found legal document: ${slug}`);
  return {
    frontmatter: doc.frontmatter,
    content: doc.content
  };
}

export async function generateLegalStaticParams() {
  const docs = await getLegalDocuments();
  return docs.map((d) => ({ slug: d.slug }));
}