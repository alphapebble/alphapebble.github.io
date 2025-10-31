"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function FeaturedProjectCard({ project }: { project: any }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass interactive-hover block items-center gap-8 overflow-hidden rounded-2xl md:grid md:grid-cols-2"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="relative aspect-video h-full overflow-hidden md:aspect-auto">
        <Image
          src={project.frontmatter.heroImage}
          alt={project.frontmatter.title}
          fill
          className="project-card-image h-full w-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
        />
      </div>
      <div className="p-8">
        <span className="text-primary text-sm font-semibold">
          {project.frontmatter.category.toUpperCase()}
        </span>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          {project.frontmatter.title}{" "}
          <span className="gtext">{project.frontmatter.clientName}</span>
        </h2>
        <p className="text-muted mt-3 text-sm">{project.frontmatter.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.frontmatter.stats.map((stat: any, idx: number) => (
            <span key={idx} className="pill text-xs">
              {stat.value} {stat.label.split(" ")[0]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

function ProjectCard({ project, delay }: { project: any; delay: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="glass interactive-hover xblock overflow-hidden rounded-2xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.frontmatter.heroImage}
          alt={project.frontmatter.title}
          fill
          className="project-card-image"
        />
      </div>
      <div className="p-7">
        <span className="text-primary text-sm font-semibold">
          {project.frontmatter.category.toUpperCase()}
        </span>
        <h3 className="mt-2 text-xl font-semibold">
          {project.frontmatter.title} {project.frontmatter.clientName}
        </h3>
        <p className="text-muted mt-3 text-sm">{project.frontmatter.tagline}</p>{" "}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.frontmatter.stats
            .slice(0, 2)
            .map((stat: any, idx: number) => (
              <span key={idx} className="pill text-xs">
                {stat.value}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}

export function ProjectGrid({
  projects,
  categories,
}: {
  projects: any[];
  categories: string[];
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.frontmatter.category === activeFilter);

  const showFeatured = activeFilter === "All" && filteredProjects.length > 0;

  return (
    <>
      <section
        className="my-12 flex flex-wrap items-center justify-center gap-3"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              activeFilter === cat
                ? "bg-primary border-primary font-semibold text-white"
                : "text-muted hover:border-primary border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {showFeatured && (
        <div className="mb-12">
          <FeaturedProjectCard project={filteredProjects[0]} />
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(showFeatured ? filteredProjects.slice(1) : filteredProjects).map(
          (project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              delay={index * 100}
            />
          )
        )}
      </section>
    </>
  );
}
