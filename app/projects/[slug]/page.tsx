import { getProjectBySlug, getProjects } from "@/lib/data";
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
  const { frontmatter } = await getProjectBySlug(slug);
  if (!frontmatter) return {};

  return {
    title: `${frontmatter.title} ${frontmatter.clientName}`,
    description: frontmatter.tagline,
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getProjectBySlug(slug);
  if (!frontmatter) notFound();

  const contentParts = content.trim().split("<!--section-break-->");
  const challengeContent = contentParts[0] || "";
  const outcomeContent = contentParts[1] || "";

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
          <span
            data-aos="fade-up"
            className="pill bg-white/20 text-xs text-white"
          >
            {frontmatter.category.toUpperCase()}
          </span>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-4 text-4xl leading-tight font-extrabold md:text-6xl"
          >
            {frontmatter.title}{" "}
            <span className="gtext">{frontmatter.clientName}</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            {frontmatter.tagline}
          </p>
        </div>
      </section>

      <div
        className="bg-bg/50 border-y border-white/10 backdrop-blur-lg"
        data-aos="fade-up"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-8 text-center md:grid-cols-4">
          {frontmatter.stats.map((stat: any) => (
            <div key={stat.label}>
              <p className="gtext text-3xl font-bold">{stat.value}</p>
              <p className="text-muted mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="content-section mx-auto max-w-5xl px-5 py-20">
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2>{frontmatter.challenge.title}</h2>
            <div className="prose prose-invert prose-lg">
              <MDXRemote source={challengeContent} />
            </div>
          </div>
          {frontmatter.challenge.image && (
            <div data-aos="zoom-in-left">
              <Image
                src={frontmatter.challenge.image}
                alt={frontmatter.challenge.imageAlt}
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </section>

        <section className="mb-24 text-center">
          <h2 data-aos="fade-up">{frontmatter.process.title}</h2>
          <p
            className="mx-auto max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {frontmatter.process.intro}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {frontmatter.process.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="glass rounded-2xl p-7"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="bg-primary/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-sm !leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-last" data-aos="fade-left">
            <h2>{frontmatter.outcome.title}</h2>
            <div className="prose prose-invert prose-lg">
              <MDXRemote source={outcomeContent} />
            </div>
          </div>
          {frontmatter.outcome.image && (
            <div data-aos="zoom-in-right">
              <Image
                src={frontmatter.outcome.image}
                alt={frontmatter.outcome.imageAlt}
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </section>

        <section className="mb-24 text-center">
          <h2 data-aos="fade-up">Technologies &amp; Tools Used</h2>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {frontmatter.techStack.map((tech: string) => (
              <span key={tech} className="pill">
                {tech}
              </span>
            ))}
          </div>
        </section>
        <section data-aos="fade-up">
          <div className="testimonial-card glass border-primary/30 relative rounded-2xl border p-8">
            <div className="quote-icon">“</div>
            <p className="text-ink relative text-2xl italic">
              {frontmatter.testimonial.quote}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Image
                src={frontmatter.testimonial.avatar}
                alt={frontmatter.testimonial.author}
                width={56}
                height={56}
                className="border-primary h-14 w-14 rounded-full border-2"
              />
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
        </section>
      </section>
    </main>
  );
}
