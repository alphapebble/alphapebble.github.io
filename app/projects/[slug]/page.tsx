import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { getProjectBySlug, getProjects, ProjectFrontmatter } from "@/lib/data";
import { ArrowBigLeft, Github, Navigation } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
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
  const { frontmatter } = project as { frontmatter: ProjectFrontmatter };

  const title = asString(frontmatter.title) ?? slug;
  const description = asString(frontmatter.tagline || frontmatter.description);

  return {
    title,
    ...(description ? { description } : {}),
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      images: [`/projects/${slug}/opengraph-image`],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      ...(description ? { description } : {}),
      images: [`/projects/${slug}/opengraph-image`],
    },
  };
}

export default async function ProjectDetailPage(props: any) {
  const { slug } = await unwrapParams(props);
  const project = await getProjectBySlug(slug);
  if (!project || !project.frontmatter) notFound();

  const { frontmatter, content } = project;

  const contentParts = content.trim().split("<hr />");
  const challengeContent = contentParts[0] || "";
  const outcomeContent = contentParts[1] || "";

  const htmlChallenge = await renderMarkdown(challengeContent);
  const htmlOutcome = await renderMarkdown(outcomeContent);

  const title = asString(frontmatter.title) ?? slug;
  const clientName = asString((frontmatter as any).clientName);
  const description = asString(frontmatter.tagline || frontmatter.description);
  const category = asString(frontmatter.category);
  const hero = asString(frontmatter.heroImage);
  const heroBlur = asString(frontmatter.heroImagePlaceholder);
  const stats = (frontmatter.stats ?? []) as any[];
  const demoUrl = asString(frontmatter.demoUrl);
  const githubUrl = asString(frontmatter.githubUrl);
  const date = asString(frontmatter.date);
  const validTechnologies = asStringArray(frontmatter.techStack);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/projects/${slug}`,
    },
    headline: title,
    description: description,
    image: `${siteConfig.url}/projects/${slug}/opengraph-image`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    datePublished: date,
  };

  return (
    <main>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AnimateOnView variant="fadeLeft">
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
              {title} {clientName ? ` ${clientName}` : ""}
            </li>
          </ol>
        </nav>
      </AnimateOnView>
      <AnimateOnView variant="fadeUp">
        <section className="relative py-20 text-center text-white">
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
              <div className="bg-linear-to-r from-indigo-600 to-purple-600" />
            )}
            <div className="bg-bg/70 from-bg absolute inset-0 bg-linear-to-t" />
          </div>

          <div className="relative mx-auto max-w-4xl px-5">
            {category && (
              <AnimateOnView variant="fadeUp" as="span">
                <span className="pill bg-white/20 text-xs text-white">
                  {category.toUpperCase()}
                </span>
              </AnimateOnView>
            )}
            <AnimateOnView variant="fadeUp" delay={0.1}>
              <h1 className="mt-4 text-4xl leading-tight font-extrabold md:text-6xl">
                {title}{" "}
                {clientName && <span className="gtext">{clientName}</span>}
              </h1>
            </AnimateOnView>
            {description && (
              <AnimateOnView variant="fadeUp" delay={0.2}>
                <p className="mt-4 text-lg text-white/80 md:text-xl">
                  {description}
                </p>
              </AnimateOnView>
            )}
          </div>
        </section>
      </AnimateOnView>

      <AnimateOnView
        variant="fadeUp"
        delay={0.3}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold text-white transition-colors"
          >
            <Navigation className="h-5 w-5" />
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
            <Github className="h-5 w-5" />
            View Code
          </a>
        )}

        {date && <div className="text-sm text-white/80">{date}</div>}
      </AnimateOnView>

      {stats.length > 0 && (
        <AnimateOnView
          variant="fadeUp"
          className="bg-bg/50 border-y border-white/10 backdrop-blur-lg"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="gtext text-3xl font-bold">{stat.value}</p>
                <p className="text-muted mt-1 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateOnView>
      )}

      <section className="content-section mx-auto max-w-7xl px-5 pt-16">
        {frontmatter.challenge && (
          <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
            <AnimateOnView variant="fadeRight">
              <h2>{frontmatter.challenge.title}</h2>
              <div
                className="prose prose-invert prose-lg"
                dangerouslySetInnerHTML={{ __html: htmlChallenge }}
              />
            </AnimateOnView>
            {frontmatter.challenge.image && (
              <AnimateOnView variant="zoomIn">
                <Image
                  src={frontmatter.challenge.image}
                  alt={frontmatter.challenge.imageAlt || ""}
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </AnimateOnView>
            )}
          </section>
        )}

        {frontmatter.process && (
          <section className="mb-24 px-5 text-center">
            <AnimateOnView variant="fadeUp">
              <h2>{frontmatter.process.title}</h2>
            </AnimateOnView>
            <AnimateOnView variant="fadeUp" delay={0.1}>
              <p className="mx-auto max-w-3xl">{frontmatter.process.intro}</p>
            </AnimateOnView>
            <AnimateOnView
              variant="staggerParent"
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {frontmatter.process.steps?.map((step: any) => (
                <AnimateOnView
                  key={step.title}
                  variant="staggerChild"
                  className="glass rounded-2xl p-7"
                >
                  <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed!">{step.description}</p>
                </AnimateOnView>
              ))}
            </AnimateOnView>
          </section>
        )}

        {frontmatter.outcome && (
          <section className="mb-24 grid items-center gap-12 px-5 lg:grid-cols-2">
            <AnimateOnView variant="fadeLeft" className="lg:order-last">
              <h2>{frontmatter.outcome.title}</h2>
              <div
                className="prose prose-invert prose-lg"
                dangerouslySetInnerHTML={{ __html: htmlOutcome }}
              />
            </AnimateOnView>
            {frontmatter.outcome.image && (
              <AnimateOnView variant="zoomIn">
                <Image
                  src={frontmatter.outcome.image}
                  alt={frontmatter.outcome.imageAlt || ""}
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </AnimateOnView>
            )}
          </section>
        )}

        {validTechnologies.length > 0 && (
          <AnimateOnView
            variant="fadeUp"
            as="section"
            className="mb-24 text-center"
          >
            <h2>Technologies &amp; Tools Used</h2>
            <AnimateOnView
              variant="fadeUp"
              delay={0.1}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {validTechnologies.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </AnimateOnView>
          </AnimateOnView>
        )}

        {frontmatter.testimonial && (
          <AnimateOnView variant="fadeUp" as="section" className="px-5 pb-12">
            <div className="testimonial-card glass border-primary/30 relative mx-auto max-w-4xl rounded-2xl border p-8">
              <div className="quote-icon">“</div>
              <p className="text-ink relative text-2xl italic">
                {frontmatter.testimonial.quote}
              </p>
              <div className="mt-6 flex items-center gap-4">
                {frontmatter.testimonial.avatar && (
                  <Image
                    src={frontmatter.testimonial.avatar}
                    alt={frontmatter.testimonial.author}
                    width={56}
                    height={56}
                    className="border-primary h-14 w-14 rounded-full border-2"
                  />
                )}
                <div>
                  <p className="text-ink font-semibold">
                    {frontmatter.testimonial.author}
                  </p>
                  <p className="text-muted text-sm">
                    {frontmatter.testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnView>
        )}

        <div className="text-center">
          <Link
            href="/projects"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-semibold transition-colors"
          >
            <ArrowBigLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </section>
    </main>
  );
}

async function renderMarkdown(markdown: string) {
  if (!markdown.trim()) return "";
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
    .process(markdown);
  return String(file);
}
