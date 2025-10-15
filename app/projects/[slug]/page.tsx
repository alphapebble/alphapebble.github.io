import { getProjectBySlug, getProjects } from "@/lib/data";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const dynamic = "force-static";

function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}
function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.filter(
      (x): x is string => typeof x === "string" && x.trim() !== ""
    );
  }
  if (typeof v === "string") {
    return v
      .split(/[,\|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (v && typeof v === "object") {
    return Object.values(v).filter(
      (x): x is string => typeof x === "string" && x.trim() !== ""
    );
  }
  return [];
}
async function unwrapParams(props: any): Promise<{ slug: string }> {
  const p = props?.params;
  return typeof p?.then === "function" ? await p : p;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await unwrapParams(props);
  const project = await getProjectBySlug(slug);
  if (!project || !project.frontmatter) return {};
  const { frontmatter } = project;

  const title = asString(frontmatter.title) ?? slug;
  const description = asString(frontmatter.description);
  const hero = asString(frontmatter.heroImage);

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      images: hero ? [hero] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      images: hero ? [hero] : [],
    },
  };
}

export default async function ProjectDetailPage(props: any) {
  const { slug } = await unwrapParams(props);
  const project = await getProjectBySlug(slug);
  if (!project || !project.frontmatter) notFound();

  const { frontmatter, content } = project;

  let html = "";
  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: "wrap",
        properties: { className: ["anchor"] },
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);
    html = String(file);
  } catch {
    html = `<pre>${content.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!)}</pre>`;
  }

  const title = asString(frontmatter.title) ?? slug;
  const clientName = asString((frontmatter as any).clientName);
  const description = asString(frontmatter.description);
  const category = asString(frontmatter.category);
  const hero = asString(frontmatter.heroImage);
  const heroBlur = asString(frontmatter.heroImagePlaceholder);
  const demoUrl = asString(frontmatter.demoUrl);
  const githubUrl = asString(frontmatter.githubUrl);
  const date = asString(frontmatter.date);
  const validTechnologies = asStringArray(frontmatter.technologies);

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-7xl px-5 py-4">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href="/projects"
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
          </li>
          <li>/</li>
          <li className="truncate text-gray-900 dark:text-white">
            {title}
            {clientName ? ` ${clientName}` : ""}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section
        className="relative py-24 text-center text-white"
        data-aos="fade-in"
      >
        <div className="absolute inset-0">
          {hero ? (
            <Image
              src={hero}
              alt={title}
              fill
              className="object-cover"
              placeholder={heroBlur ? "blur" : undefined}
              blurDataURL={heroBlur ?? undefined}
              priority
            />
          ) : (
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600" />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5">
          {category && (
            <div className="mb-4" data-aos="fade-up">
              <span className="pill bg-white/20 text-xs text-white">
                {category}
              </span>
            </div>
          )}

          <h1
            className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl"
            data-aos="fade-up"
            data-aos-delay={100}
          >
            {title}{" "}
            {clientName && <span className="text-primary">{clientName}</span>}
          </h1>

          {description && (
            <p
              className="mx-auto mt-4 max-w-3xl text-lg text-white/90 md:text-xl"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {description}
            </p>
          )}

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Demo
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            )}

            {date && <div className="text-sm text-white/80">{date}</div>}
          </div>
        </div>
      </section>

      {/* Technologies */}
      {validTechnologies.length > 0 && (
        <section className="border-b border-gray-200 py-12 dark:border-gray-700">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-6 text-center text-2xl font-bold">
              Technologies Used
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {validTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-white">
        <article
          className="prose prose-lg prose-invert prose-headings:font-semibold prose-img:rounded-lg prose-pre:overflow-x-auto prose-pre:p-4 prose-hr:my-10 prose-hr:border-t prose-hr:border-white/40 max-w-none"
          data-aos="fade-up"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>

      {/* Back to Projects */}
      <section className="mx-auto max-w-7xl border-t border-gray-200 px-5 py-8 dark:border-gray-700">
        <Link
          href="/projects"
          className="text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Projects
        </Link>
      </section>
    </main>
  );
}
