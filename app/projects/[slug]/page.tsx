import { getProjectBySlug, getProjects } from "@/lib/data";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} ${project.clientName}`,
    description: project.tagline,
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
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative py-24 text-center text-white"
        data-aos="fade-in"
      >
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="bg-bg/70 from-bg absolute inset-0 bg-gradient-to-t" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5">
          <span
            data-aos="fade-up"
            className="pill bg-white/20 text-xs text-white"
          >
            {project.category.toUpperCase()}
          </span>
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-4 text-4xl leading-tight font-extrabold md:text-6xl"
          >
            {project.title} <span className="gtext">{project.clientName}</span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="bg-bg/50 border-y border-white/10 backdrop-blur-lg"
        data-aos="fade-up"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 py-8 text-center md:grid-cols-4">
          {project.stats.map((stat: any) => (
            <div key={stat.label}>
              <p className="gtext text-3xl font-bold">{stat.value}</p>
              <p className="text-muted mt-1 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="content-section mx-auto max-w-5xl px-5 py-20">
        {/* Challenge */}
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div data-aos="fade-right">
            <h2>{project.challenge.title}</h2>
            {project.challenge.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {project.challenge.image && (
            <div data-aos="zoom-in-left">
              <Image
                src={project.challenge.image}
                alt={project.challenge.imageAlt}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </section>

        {/* Process */}
        <section className="mb-24 text-center">
          <h2 data-aos="fade-up">{project.process.title}</h2>
          <p
            className="mx-auto max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {project.process.intro}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {project.process.steps.map((step: any, index: number) => (
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

        {/* Outcome */}
        <section className="mb-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-last" data-aos="fade-left">
            <h2>{project.outcome.title}</h2>
            {project.outcome.paragraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {project.outcome.image && (
            <div data-aos="zoom-in-right">
              <Image
                src={project.outcome.image}
                alt={project.outcome.imageAlt}
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </section>

        {/* Tech Stack */}
        <section className="mb-24 text-center">
          <h2 data-aos="fade-up">Technologies &amp; Tools Used</h2>
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {project.techStack.map((tech: string, i: number) => (
              <span key={i} className="tech-pill">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section data-aos="fade-up">
          <div className="testimonial-card glass border-primary/30 relative rounded-2xl border p-8">
            <div className="quote-icon">“</div>
            <p className="text-ink relative text-2xl italic">
              {project.testimonial.quote}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Image
                src={project.testimonial.avatar}
                alt={project.testimonial.author}
                width={56}
                height={56}
                className="border-primary h-14 w-14 rounded-full border-2"
              />
              <div>
                <p className="text-ink font-semibold">
                  {project.testimonial.author}
                </p>
                <p className="text-muted text-sm">
                  {project.testimonial.title}
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
