import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { TableOfContents } from "@/components/table-of-contents";
import {
  getResearchPostBySlug,
  getResearchPosts,
  type Heading as DataHeading,
  type ResearchFrontmatter,
} from "@/lib/data";
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

async function unwrapParams(props: any): Promise<{ slug: string }> {
  const p = props?.params;
  return typeof p?.then === "function" ? await p : p;
}

export async function generateStaticParams() {
  try {
    const posts = await getResearchPosts();
    return posts.map((post) => {
      return { slug: post.slug };
    });
  } catch {
    return [];
  }
}

export async function generateMetadata(props: any): Promise<Metadata> {
  try {
    const { slug } = await unwrapParams(props);
    const post = await getResearchPostBySlug(slug);
    if (!post || !post.frontmatter) {
      return {};
    }

    const { frontmatter } = post as { frontmatter: ResearchFrontmatter };

    return {
      title: frontmatter.title ?? slug,
      description: frontmatter.subtitle ?? "",
      alternates: { canonical: `/research/${slug}` },
      openGraph: {
        title: frontmatter.title ?? slug,
        description: frontmatter.subtitle ?? "",
        images: [`/research/${slug}/opengraph-image`],
        type: "article",
        publishedTime: frontmatter.publishedDate,
        authors: frontmatter.author?.name ? [frontmatter.author.name] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter.title ?? slug,
        description: frontmatter.subtitle ?? "",
        images: [`/research/${slug}/opengraph-image`],
      },
    };
  } catch {
    return {};
  }
}

export default async function ResearchDetailPage(props: any) {
  try {
    const { slug } = await unwrapParams(props);
    const post = await getResearchPostBySlug(slug);
    if (!post || !post.frontmatter) {
      notFound();
    }
    const { frontmatter, content, headings } = post as {
      frontmatter: ResearchFrontmatter;
      content: string;
      headings: DataHeading[];
    };

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

    const validTags =
      frontmatter.tags?.filter(
        (tag: string) => typeof tag === "string" && tag.trim() !== ""
      ) || [];

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/research/${slug}`,
      },
      headline: frontmatter.title,
      description: frontmatter.subtitle,
      image: `${siteConfig.url}/research/${slug}/opengraph-image`,
      datePublished: frontmatter.publishedDate,
      author: {
        "@type": "Person",
        name: frontmatter.author?.name,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/images/logo.png`,
        },
      },
    };

    return (
      <main>
        <script
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
                  href="/research"
                  className="hover:text-primary transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>/</li>
              <li className="truncate text-gray-900 dark:text-white">
                {frontmatter.title ?? slug}
              </li>
            </ol>
          </nav>
        </AnimateOnView>
        <AnimateOnView variant="fadeUp">
          <section className="relative py-20 text-center text-white">
            <div className="absolute inset-0">
              {frontmatter.heroImage ? (
                <Image
                  src={frontmatter.heroImage}
                  alt={frontmatter.title ?? ""}
                  fill
                  className="object-cover"
                  placeholder={
                    frontmatter.heroImagePlaceholder ? "blur" : undefined
                  }
                  blurDataURL={frontmatter.heroImagePlaceholder}
                  priority
                />
              ) : (
                <div className="bg-linear-to-r from-blue-600 to-purple-600" />
              )}
              <div className="bg-bg/70 from-bg absolute inset-0 bg-linear-to-t" />
            </div>

            <div className="relative mx-auto max-w-4xl px-5">
              {validTags.length > 0 && (
                <AnimateOnView
                  variant="fadeUp"
                  className="mb-4 flex items-center justify-center gap-2"
                >
                  {validTags.map((tag) => (
                    <span
                      key={tag}
                      className="pill bg-white/20 text-xs text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </AnimateOnView>
              )}

              <AnimateOnView variant="fadeUp" delay={0.1}>
                <h1 className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl">
                  {frontmatter.title ?? slug}
                </h1>
              </AnimateOnView>

              {frontmatter.subtitle && (
                <AnimateOnView variant="fadeUp" delay={0.2}>
                  <p className="mx-auto mt-4 max-w-3xl text-lg text-white/80 md:text-xl">
                    {frontmatter.subtitle}
                  </p>
                </AnimateOnView>
              )}

              <AnimateOnView
                variant="fadeUp"
                delay={0.3}
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                {frontmatter.author?.avatar && frontmatter.author?.name && (
                  <div className="flex items-center gap-3">
                    <Image
                      src={frontmatter.author.avatar}
                      alt={frontmatter.author.name}
                      width={48}
                      height={48}
                      className="border-primary h-12 w-12 rounded-full border-2"
                    />
                    <div>
                      <p className="font-semibold text-white">
                        {frontmatter.author.name}
                      </p>
                      {frontmatter.author.title && (
                        <p className="text-sm text-white/70">
                          {frontmatter.author.title}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(frontmatter.publishedDate || frontmatter.readTime) && (
                  <>
                    {frontmatter.author?.name && (
                      <span className="mx-2 text-white/50">•</span>
                    )}
                    <div className="text-sm text-white/70">
                      {frontmatter.publishedDate && (
                        <span>Published {frontmatter.publishedDate}</span>
                      )}
                      {frontmatter.readTime && (
                        <span>
                          {frontmatter.publishedDate && " • "}
                          {frontmatter.readTime}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </AnimateOnView>
            </div>
          </section>
        </AnimateOnView>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 lg:grid-cols-4">
          {headings && headings.length > 0 && (
            <aside className="hidden lg:col-span-1 lg:block">
              <AnimateOnView variant="fadeRight" delay={0.2}>
                <TableOfContents headings={headings as any} />
              </AnimateOnView>
            </aside>
          )}

          <article
            className={`prose prose-invert prose-lg article-content prose-headings:font-semibold prose-p:text-gray-100 prose-li:text-gray-100 prose-a:text-primary hover:prose-a:opacity-80 prose-img:rounded-lg prose-a:no-underline prose-pre:overflow-x-auto prose-pre:p-4 prose-hr:my-10 prose-hr:border-t prose-hr:border-white/40 max-w-none ${headings && headings.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}`}
          >
            <AnimateOnView variant="fadeUp" delay={0.2}>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </AnimateOnView>
          </article>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/research"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-semibold transition-colors"
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
            Back to Research
          </Link>
        </div>
      </main>
    );
  } catch {
    notFound();
  }
}
