import Link from "next/link";

export function ProjectsPreview({ projects }: { projects: any[] }) {
  return (
    <section id="case-studies" className="py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="emoji-heading">📈</span> Real Results, Rapidly
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Our experiments deliver tangible outcomes. Here&apos;s a look at how
          we approach different challenges.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => {
          const outcomeSnippet =
            project.outcome?.paragraphs?.[0]?.substring(0, 120) + "...";

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="glass interactive-hover block flex h-full flex-col rounded-2xl p-7"
              data-aos="flip-left"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="flex-grow">
                <span className="text-primary text-sm font-semibold">
                  {project.category.toUpperCase()}
                </span>

                <h3 className="mt-2 text-xl font-semibold">
                  {project.title} {project.clientName}
                </h3>

                {/* Challenge */}
                <p className="text-muted mt-3 text-sm">
                  <strong className="text-ink">Challenge:</strong>{" "}
                  {project.tagline}
                </p>

                {/* Outcome */}
                {outcomeSnippet && (
                  <p className="text-muted mt-3 text-sm">
                    <strong className="text-ink">Outcome:</strong>{" "}
                    {outcomeSnippet}
                  </p>
                )}
              </div>

              {/* Stats Pills */}
              {project.stats?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {project.stats.slice(0, 3).map((stat: any, i: number) => (
                    <span key={i} className="pill text-xs">
                      {stat.value}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
