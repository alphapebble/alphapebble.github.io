import { getLegalBySlug /*, getLegalSlugs (optional) */ } from "@/lib/data";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

// Optional: if all legal docs should be pre-rendered
// export async function generateStaticParams() {
//   const slugs = await getLegalSlugs(); // make sure this exists in lib/data
//   return slugs.map((slug: string) => ({ slug }));
// }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const { frontmatter } = await getLegalBySlug(slug);
  if (!frontmatter) return {};
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = params;
  const data = await getLegalBySlug(slug);
  if (!data?.frontmatter) notFound();

  const { frontmatter, content } = data;

  return (
    <main>
      {/* Hero */}
      <section className="relative py-26 text-center text-white">
        <div className="relative mx-auto max-w-4xl px-5">
          <span className="pill mb-4 inline-block bg-white/20 text-xs text-white">
            LEGAL DOCUMENT
          </span>
          <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
            <span className="gtext">{frontmatter.title}</span>
          </h1>
          <p className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl">
            {frontmatter.description}
          </p>
          {frontmatter.lastUpdated && (
            <div className="mt-8 flex items-center justify-center gap-2 text-white/60">
              <span className="text-sm">Last Updated: {frontmatter.lastUpdated}</span>
            </div>
          )}
        </div>
      </section>

      <div className="bg-bg/50 border-y border-white/10 backdrop-blur-lg">
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
      </div>

      {/* Body */}
      <section className="content-section mx-auto max-w-4xl px-5 py-16">
        {frontmatter.showTOC !== false && frontmatter.tableOfContents?.length > 0 && (
          <section className="mb-16">
            <div className="glass rounded-2xl border border-white/10 p-8">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                Table of Contents
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {frontmatter.tableOfContents.map((item: any, index: number) => (
                  <a
                    key={index}
                    href={`#${item.anchor}`}
                    className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
                  >
                    <span className="bg-primary/20 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                      {index + 1}
                    </span>
                    <span className="group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          <MDXRemote
            source={content}
            components={{
              h2: ({ children, ...props }) => (
                <h2 {...props} className="mt-16 mb-8 flex items-center gap-3 text-3xl font-bold first:mt-0">
                  <div className="from-primary to-primary/50 h-8 w-2 rounded-full bg-gradient-to-b" />
                  {children}
                </h2>
              ),
              h3: ({ children, ...props }) => (
                <h3 {...props} className="text-primary mt-12 mb-6 text-xl font-semibold">
                  {children}
                </h3>
              ),
              p: ({ children, ...props }) => (
                <p {...props} className="mb-6 leading-relaxed text-gray-300">
                  {children}
                </p>
              ),
              ul: ({ children, ...props }) => (
                <ul {...props} className="mb-6 space-y-2">
                  {children}
                </ul>
              ),
              li: ({ children, ...props }) => (
                <li {...props} className="flex items-start gap-3">
                  <div className="bg-primary mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  <span>{children}</span>
                </li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote
                  {...props}
                  className="border-primary/50 my-8 rounded-r-lg border-l-4 bg-white/5 p-6 pl-6 italic"
                >
                  {children}
                </blockquote>
              ),
            }}
          />
        </div>
      </section>
    </main>
  );
}
