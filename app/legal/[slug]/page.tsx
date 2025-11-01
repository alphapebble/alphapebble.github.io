import { AnimateOnView } from "@/components/animate-on-view";
import { getLegalBySlug } from "@/lib/data";
import type { Metadata } from "next";
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

async function unwrapParams(props: any): Promise<{ slug: string }> {
  const p = props?.params;
  return typeof p?.then === "function" ? await p : p;
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await unwrapParams(props);
  const { frontmatter } = await getLegalBySlug(slug);
  if (!frontmatter) return {};

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage(props: any) {
  const { slug } = await unwrapParams(props);
  const { frontmatter, content } = await getLegalBySlug(slug);
  if (!frontmatter) notFound();

  let html = "";
  try {
    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        behavior: "wrap",
        properties: { className: ["anchor"] },
      })
      .use(rehypeStringify)
      .process(content);
    html = String(file);
  } catch {
    html = `<pre>${content.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!)}</pre>`;
  }

  return (
    <main>
      <AnimateOnView variant="fadeLeft">
        <nav className="mx-auto max-w-7xl px-5 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-gray-900 dark:text-white">
              {frontmatter.title}
            </li>
          </ol>
        </nav>
      </AnimateOnView>
      <AnimateOnView variant="fadeUp">
        <section className="relative py-20 text-center text-white">
          <div className="relative mx-auto max-w-4xl px-5">
            <AnimateOnView variant="fadeUp" as="span">
              <span className="pill mb-4 inline-block bg-white/20 text-xs text-white">
                LEGAL DOCUMENT
              </span>
            </AnimateOnView>

            <AnimateOnView variant="zoomIn" duration={0.8} delay={0.1}>
              <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
                <span className="gtext">{frontmatter.title}</span>
              </h1>
            </AnimateOnView>

            {frontmatter.description && (
              <AnimateOnView variant="fadeUp" delay={0.2}>
                <p className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl">
                  {frontmatter.description}
                </p>
              </AnimateOnView>
            )}
            {frontmatter.lastUpdated && (
              <AnimateOnView variant="fadeUp" delay={0.3}>
                <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
                  <span className="text-sm">
                    Last Updated: {frontmatter.lastUpdated}
                  </span>
                </div>
              </AnimateOnView>
            )}
          </div>
        </section>
      </AnimateOnView>

      <AnimateOnView
        variant="fadeUp"
        className="bg-bg/50 border-y border-white/10 backdrop-blur-lg"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-8 text-center md:grid-cols-3">
          <div>
            <p className="gtext text-2xl font-bold">
              {frontmatter.effectiveDate || "Immediate"}
            </p>
            <p className="text-muted mt-1 text-sm">Effective Date</p>
          </div>
          <div>
            <p className="gtext text-2xl font-bold">
              {frontmatter.jurisdiction || "Global"}
            </p>
            <p className="text-muted mt-1 text-sm">Jurisdiction</p>
          </div>
          <div>
            <p className="gtext text-2xl font-bold">
              {frontmatter.version || "1.0"}
            </p>
            <p className="text-muted mt-1 text-sm">Document Version</p>
          </div>
        </div>
      </AnimateOnView>

      <section className="content-section mx-auto max-w-4xl px-5 py-20">
        {frontmatter.showTOC !== false &&
        frontmatter.tableOfContents?.length ? (
          <AnimateOnView variant="fadeUp" as="section" className="mb-16">
            <div className="glass rounded-2xl border border-white/10 p-8">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                Table of Contents
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {frontmatter.tableOfContents.map(
                  (item: { title: string; anchor: string }, index: number) => (
                    <a
                      key={index}
                      href={`#${item.anchor}`}
                      className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                    >
                      <span className="bg-primary/20 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
          </AnimateOnView>
        ) : null}

        <AnimateOnView variant="fadeUp" delay={0.2}>
          <article
            className="prose prose-invert prose-lg legal-content max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </AnimateOnView>
      </section>
    </main>
  );
}
