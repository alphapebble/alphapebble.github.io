import fs from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");

export async function getProjects(): Promise<any[]> {
  const filePath = path.join(dataDirectory, "projects.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getBlogPosts(): Promise<any[]> {
  const filePath = path.join(dataDirectory, "blog.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

// export async function getContentBySlug(
//   type: "blog" | "projects",
//   slug: string
// ) {
//   // ... (reading file and parsing frontmatter is the same)
//   const { data: frontmatter, content } = matter(fileContents);

//   // Generate placeholder for the hero image
//   if (frontmatter.heroImage) {
//     const buffer = await fetch(frontmatter.heroImage).then(async (res) =>
//       Buffer.from(await res.arrayBuffer())
//     );
//     const { base64 } = await getPlaiceholder(buffer);
//     frontmatter.heroImagePlaceholder = base64;
//   }

//   return { frontmatter, content };
// }
