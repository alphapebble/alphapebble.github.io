import { siteConfig } from "@/app/site.config";
import Link from "next/link";

export function ProjectsPreview({ projects }: { projects: any[] }) {
  return (
    <section id="case-studies" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="emoji-heading">{siteConfig.case_studies.icon}</span>{" "}
          {siteConfig.case_studies.title}
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {siteConfig.case_studies.description}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => {
          const { frontmatter, content } = project;

          const contentParts = content.trim().split("<hr />");
          const challengeContent = contentParts[0]?.trim() ?? "";
          const outcomeContent = contentParts[1]?.trim() ?? "";

          const challengeSnippet = challengeContent
            ? challengeContent.substring(0, 120) + "..."
            : (frontmatter.challenge?.title ?? "");

          const outcomeSnippet = outcomeContent
            ? outcomeContent.substring(0, 120) + "..."
            : (frontmatter.outcome?.title ?? "");

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="glass interactive-hover flex h-full flex-col rounded-2xl p-7"
              data-aos="flip-left"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="grow">
                {frontmatter.category && (
                  <span className="text-primary text-sm font-semibold">
                    {frontmatter.category.toUpperCase()}
                  </span>
                )}

                <h3 className="mt-2 text-xl font-semibold">
                  {frontmatter.title} {frontmatter.clientName}
                </h3>

                {/* Challenge */}
                {challengeSnippet && (
                  <p className="text-muted mt-3 text-sm">
                    <strong className="text-ink">Challenge:</strong>{" "}
                    {challengeSnippet}
                  </p>
                )}

                {/* Outcome */}
                {outcomeSnippet && (
                  <p className="text-muted mt-3 text-sm">
                    <strong className="text-ink">Outcome:</strong>{" "}
                    {outcomeSnippet}
                  </p>
                )}
              </div>

              {/* Stats Pills */}
              {frontmatter.stats?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {frontmatter.stats.slice(0, 3).map((stat: any, i: number) => (
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
