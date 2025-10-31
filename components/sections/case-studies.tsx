"use client";

import { siteConfig } from "@/site.config";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Project = {
  slug: string;
  frontmatter: Record<string, any>;
  content: string;
};

function CaseStudyCard({ project, index }: { project: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const { frontmatter, content } = project;

  const contentParts = content.trim().split("<hr />");
  const challengeContent = contentParts[0]?.trim() ?? "";
  const outcomeContent = contentParts[1]?.trim() ?? "";

  const challengeHeadline = frontmatter.challenge?.title ?? challengeContent.slice(0, 120).trim();
  const solutionHeadline =
    frontmatter.process?.intro ??
    frontmatter.process?.steps?.[0]?.description ??
    "We designed and shipped a focused workflow MVP to prove the value fast.";
  const resultHeadline =
    frontmatter.outcome?.title ??
    outcomeContent.slice(0, 120).trim() ??
    "Delivered measurable outcomes within 90 days.";

  const tags = [frontmatter.category, frontmatter.clientName].filter(Boolean) as string[];

  return (
    <div
      className="glass-enhanced flex h-full flex-col justify-between rounded-2xl p-7"
      data-aos="fade-up"
      data-aos-delay={100 * (index + 1)}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span key={tag} className="pill text-xs font-semibold uppercase tracking-wide">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="mt-5 text-2xl font-semibold leading-tight text-ink">
          {frontmatter.title} {frontmatter.clientName}
        </h3>
        {frontmatter.tagline && (
          <p className="text-muted mt-3 text-sm leading-relaxed">{frontmatter.tagline}</p>
        )}

        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Challenge</p>
            <p className="text-muted mt-2 text-sm leading-relaxed">{challengeHeadline}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solution</p>
            <p className="text-muted mt-2 text-sm leading-relaxed">{solutionHeadline}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Result</p>
            <p className="text-muted mt-2 text-sm leading-relaxed">{resultHeadline}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          onClick={() => setIsOpen(true)}
          variant="primary"
          size="default"
          className="rounded-full px-5 py-2 text-sm"
        >
          Read full breakdown
        </Button>
        <Link
          href={`/projects/${project.slug}`}
          className="text-muted hover:text-primary text-sm font-semibold underline-offset-4 hover:underline"
        >
          View case study
        </Link>
      </div>

      {frontmatter.stats?.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {frontmatter.stats.slice(0, 3).map((stat: any, i: number) => (
            <span key={i} className="pill text-xs">
              {stat.label ? `${stat.label}: ` : ""}
              {stat.value}
            </span>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="glass-enhanced max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8"
            role="document"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Case Study</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">
                  {frontmatter.title} {frontmatter.clientName}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-primary transition-colors"
                aria-label="Close case study summary"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-muted">
              <section>
                <h4 className="text-ink text-base font-semibold">Challenge</h4>
                <p className="mt-2 whitespace-pre-line">{challengeContent}</p>
              </section>
              {frontmatter.process?.steps && frontmatter.process.steps.length > 0 && (
                <section>
                  <h4 className="text-ink text-base font-semibold">Solution</h4>
                  <ul className="mt-3 space-y-4">
                    {frontmatter.process.steps.map((step: any) => (
                      <li key={step.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-ink">
                          {step.icon ? `${step.icon} ` : ""}
                          {step.title}
                        </p>
                        <p className="mt-2 text-muted text-sm leading-relaxed">{step.description}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section>
                <h4 className="text-ink text-base font-semibold">Result</h4>
                <p className="mt-2 whitespace-pre-line">{outcomeContent}</p>
              </section>

              {frontmatter.stats?.length > 0 && (
                <section>
                  <h4 className="text-ink text-base font-semibold">Impact Metrics</h4>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {frontmatter.stats.map((stat: any, i: number) => (
                      <div key={`${stat.label}-${i}`} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-primary">{stat.label}</p>
                        <p className="text-ink mt-1 text-lg font-bold">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm">
              <Link
                href={`/projects/${project.slug}`}
                className="text-primary font-semibold underline-offset-4 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                View full case study
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-primary transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectsPreview({ projects }: { projects: any[] }) {
  return (
    <section id="case-studies" className="py-24">
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

      <div className="grid gap-8 md:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <CaseStudyCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
