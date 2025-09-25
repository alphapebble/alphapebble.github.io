// app/blog/[slug]/page.tsx
import { TableOfContents } from "@/components/table-of-contents";
import {
  getBlogPostBySlug,
  getBlogPosts,
  type BlogFrontmatter,
  type Heading as DataHeading,
} from "@/lib/data";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-static";

// Accept either { params } or a Promise of params
async function unwrapParams(props: any): Promise<{ slug: string }> {
  const p = props?.params;
  return typeof p?.then === "function" ? await p : p;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const { slug } = await unwrapParams(props);
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.frontmatter) return {};
  const { frontmatter } = post as { frontmatter: BlogFrontmatter };

  return {
    title: frontmatter.title ?? slug,
    description: frontmatter.subtitle ?? "",
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: frontmatter.title ?? slug,
      description: frontmatter.subtitle ?? "",
      images: frontmatter.heroImage ? [frontmatter.heroImage] : [],
      type: "article",
      publishedTime: frontmatter.publishedDate,
      authors: frontmatter.author?.name ? [frontmatter.author.name] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title ?? slug,
      description: frontmatter.subtitle ?? "",
      images: frontmatter.heroImage ? [frontmatter.heroImage] : [],
    },
  };
}

export default async function BlogDetailPage(props: any) {
  const { slug } = await unwrapParams(props);

  const post = await getBlogPostBySlug(slug);
  if (!post || !post.frontmatter) notFound();

  const { frontmatter, content, headings } = post as {
    frontmatter: BlogFrontmatter;
    content: string;
    headings: DataHeading[];
  };

  // Filter out any undefined tags
  const validTags = frontmatter.tags?.filter((tag): tag is string => 
    typeof tag === 'string' && tag.trim() !== ''
  ) || [];

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
            <Link href="/blog" className="hover:text-primary transition-colors">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white truncate">
            {frontmatter.title ?? slug}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative py-24 text-center text-white" data-aos="fade-in">
        <div className="absolute inset-0">
          {frontmatter.heroImage ? (
            <Image
              src={frontmatter.heroImage}
              alt={frontmatter.title ?? ""}
              fill
              className="object-cover"
              placeholder={frontmatter.heroImagePlaceholder ? "blur" : undefined}
              blurDataURL={frontmatter.heroImagePlaceholder}
              priority
            />
          ) : (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600" />
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative mx-auto max-w-4xl px-5">
          {validTags.length > 0 && (
            <div className="mb-4 flex items-center justify-center gap-2" data-aos="fade-up">
              {validTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/20 text-xs text-white backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {frontmatter.title ?? slug}
          </h1>

          {frontmatter.subtitle && (
            <p
              className="mx-auto mt-4 max-w-3xl text-lg text-white/80 md:text-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {frontmatter.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="300">
            {frontmatter.author?.avatar && frontmatter.author?.name && (
              <div className="flex items-center gap-3">
                <Image
                  src={frontmatter.author.avatar}
                  alt={frontmatter.author.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-semibold text-white">{frontmatter.author.name}</p>
                  {frontmatter.author.title && (
                    <p className="text-sm text-white/70">{frontmatter.author.title}</p>
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
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4">
        {/* Table of Contents */}
        {headings && headings.length > 0 && (
          <aside className="hidden lg:col-span-1 lg:block" data-aos="fade-right">
            <TableOfContents headings={headings as any} />
          </aside>
        )}

        {/* Article Content */}
        <article
          className={`prose prose-lg prose-gray dark:prose-invert max-w-none ${
            headings && headings.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <MDXRemote source={content} />
        </article>
      </section>

      {/* Back to Blog */}
      <section className="mx-auto max-w-7xl px-5 py-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </section>
    </main>
  );
}