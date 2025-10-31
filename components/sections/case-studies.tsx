import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import Link from "next/link";

export function ProjectsPreview({ projects }: { projects: any[] }) {
  return (
    <section id="case-studies" className="py-16">
      <div className="mb-12 text-center">
        <AnimateOnView variant="fadeUp" duration={0.8}>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="emoji-heading">
              {siteConfig.case_studies.icon}
            </span>{" "}
            {siteConfig.case_studies.title}
          </h2>
        </AnimateOnView>
        <AnimateOnView variant="fadeUp" delay={0.2}>
          <p className="text-muted mx-auto mt-3 max-w-3xl text-lg">
            {siteConfig.case_studies.description}
          </p>
        </AnimateOnView>
      </div>

      <AnimateOnView
        variant="staggerParent"
        className="grid gap-6 md:grid-cols-3"
      >
        {projects.slice(0, 3).map((project) => {
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
            <AnimateOnView
              variant="flipLeft"
              key={project.slug}
              className="h-full"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="glass interactive-hover flex h-full flex-col rounded-2xl p-7"
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

                  {challengeSnippet && (
                    <p className="text-muted mt-3 text-sm">
                      <strong className="text-ink">Challenge:</strong>{" "}
                      {challengeSnippet}
                    </p>
                  )}

                  {outcomeSnippet && (
                    <p className="text-muted mt-3 text-sm">
                      <strong className="text-ink">Outcome:</strong>{" "}
                      {outcomeSnippet}
                    </p>
                  )}
                </div>

                {frontmatter.stats?.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {frontmatter.stats
                      .slice(0, 3)
                      .map((stat: any, i: number) => (
                        <span key={i} className="pill text-xs">
                          {stat.value}
                        </span>
                      ))}
                  </div>
                )}
              </Link>
            </AnimateOnView>
          );
        })}
      </AnimateOnView>
    </section>
  );
}
