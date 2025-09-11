import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getBlogPostBySlug(slug);
  if (!frontmatter) return {};

  return {
    title: frontmatter.title,
    description: frontmatter.subtitle,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content, headings } = await getBlogPostBySlug(slug);
  if (!frontmatter) notFound();

  return (
    <main>
      <section
        className="relative py-24 text-center text-white"
        data-aos="fade-in"
      >
        <div className="absolute inset-0">
          <Image
            src={frontmatter.heroImage}
            alt={frontmatter.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={frontmatter.heroImagePlaceholder}
            priority
          />
          <div className="bg-bg/70 from-bg absolute inset-0 bg-gradient-to-t" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5">
          <div
            className="mb-4 flex items-center justify-center gap-2"
            data-aos="fade-up"
          >
            {frontmatter.tags.map((tag: string) => (
              <span key={tag} className="pill bg-white/20 text-xs text-white">
                {tag}
              </span>
            ))}
          </div>
          <h1
            className="mb-6 text-4xl leading-tight font-extrabold md:text-6xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {frontmatter.title}
          </h1>
          <p
            className="mx-auto mt-4 max-w-3xl text-lg text-white/80 md:text-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {frontmatter.subtitle}
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
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
              <p className="text-sm text-white/70">
                {frontmatter.author.title}
              </p>
            </div>
            <span className="mx-2 text-white/50">•</span>
            <p className="text-sm text-white/70">
              Published on {frontmatter.publishedDate} · {frontmatter.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4">
        <aside className="hidden lg:col-span-1 lg:block" data-aos="fade-right">
          <TableOfContents headings={headings} />
        </aside>
        <article
          className="prose prose-invert prose-lg article-content lg:col-span-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <MDXRemote source={content} />
        </article>
      </section>
    </main>
  );
}
