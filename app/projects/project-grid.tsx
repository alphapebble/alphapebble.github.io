// components/project-grid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Import only the *type* so we don't pull server code into the client bundle
import type { getProjects } from "@/lib/data";

// Infer the project type from getProjects return type (type-only)
type Project = Awaited<ReturnType<typeof getProjects>>[number];

interface ProjectGridProps {
  projects: Project[];
  categories: string[];
}

/* ---------------------------------------------
 * Helpers to safely narrow unknown frontmatter
 * -------------------------------------------*/
function asString(v: unknown): string | undefined {
  return typeof v === "string" && v.trim() ? v : undefined;
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === "string" && x.trim() !== "");
  }
  if (typeof v === "string") {
    return v
      .split(/[,\|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (v && typeof v === "object") {
    return Object.values(v).filter(
      (x): x is string => typeof x === "string" && x.trim() !== ""
    );
  }
  return [];
}

export function ProjectGrid({ projects, categories }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter projects based on selected category (narrow category before compare)
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => asString(project.frontmatter?.category) === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2" data-aos="fade-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pill transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* No projects message */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {selectedCategory !== "All"
              ? `No projects found in "${selectedCategory}" category`
              : "No projects found"}
          </p>
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { frontmatter, slug } = project;

  // Safely narrow everything we render
  const title = asString(frontmatter?.title) ?? slug;
  const hero = asString(frontmatter?.heroImage);
  const heroBlur = asString(frontmatter?.heroImagePlaceholder);
  const category = asString(frontmatter?.category);
  const description = asString(frontmatter?.description);
  const demoUrl = asString(frontmatter?.demoUrl);
  const githubUrl = asString(frontmatter?.githubUrl);
  const date = asString(frontmatter?.date);
  const technologies = asStringArray(frontmatter?.technologies);

  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl dark:bg-gray-800">
      <Link href={`/projects/${slug}`}>
        {/* Featured Image */}
        {hero && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={hero}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              placeholder={heroBlur ? "blur" : undefined}
              blurDataURL={heroBlur}
            />
          </div>
        )}

        <div className="p-6">
          {/* Category */}
          {category && (
            <div className="mb-3">
              <span className="pill bg-primary/10 text-primary text-xs">{category}</span>
            </div>
          )}

          {/* Title */}
          <h2 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h2>

          {/* Description */}
          {description && (
            <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="inline-block rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Project Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Demo
              </a>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Code
              </a>
            )}

            {/* Date */}
            {date && (
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{date}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
