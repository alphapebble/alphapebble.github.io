import { TableOfContents } from "@/components/table-of-contents";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return {};
  return {
    title: post.title,
    description: post.subtitle,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

function renderContent(item: any, index: number) {
  switch (item.type) {
    case "h2":
      return (
        <h2 id={item.id} key={index}>
          {item.text}
        </h2>
      );
    case "h3":
      return (
        <h3 id={item.id} key={index}>
          {item.text}
        </h3>
      );
    case "p":
      return <p key={index} dangerouslySetInnerHTML={{ __html: item.text }} />;
    case "blockquote":
      return <blockquote key={index}>{item.text}</blockquote>;
    case "ol":
      return (
        <ol key={index}>
          {item.items.map((li: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul key={index}>
          {item.items.map((li: string, i: number) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
          ))}
        </ul>
      );
    case "img":
      return (
        <figure key={index} className="my-8">
          <Image
            src={item.src}
            alt={item.alt}
            width={1400}
            height={800}
            className="h-auto w-full rounded-xl shadow-lg"
          />
          <figcaption className="text-muted mt-3 text-center text-sm">
            {item.caption}
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative py-24 text-center text-white"
        data-aos="fade-in"
      >
        <div className="absolute inset-0">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="bg-bg/70 from-bg absolute inset-0 bg-gradient-to-t" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5">
          <div
            className="mb-4 flex items-center justify-center gap-2"
            data-aos="fade-up"
          >
            {post.tags.map((tag: string) => (
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
            {post.title}
          </h1>
          <p
            className="mx-auto mt-4 max-w-3xl text-lg text-white/80 md:text-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {post.subtitle}
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="border-primary rounded-full border-2"
            />
            <div>
              <p className="font-semibold text-white">{post.author.name}</p>
              <p className="text-sm text-white/70">{post.author.title}</p>
            </div>
            <span className="mx-2 text-white/50">•</span>
            <p className="text-sm text-white/70">
              Published on {post.publishedDate} · {post.readTime}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-4">
        <aside className="hidden lg:col-span-1 lg:block" data-aos="fade-right">
          <TableOfContents content={post.content} />
        </aside>
        <article className="prose prose-invert prose-lg article-content lg:col-span-3">
          {post.content.map((item: any, index: number) =>
            renderContent(item, index)
          )}
        </article>
      </section>
    </main>
  );
}
