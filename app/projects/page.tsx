import { ProjectGrid } from "@/components/project-grid";
import { getProjects } from "@/lib/data";
import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: siteConfig.projects_page.description,
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const uniqueCategories = Array.from(
    new Set(
      projects
        .map((p) => p.frontmatter?.category)
        .filter(
          (category): category is string =>
            typeof category === "string" && category.trim() !== ""
        )
    )
  ).sort();

  const categories = ["All", ...uniqueCategories];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <section className="pb-12 text-center" data-aos="fade-in">
        <h1
          className="text-4xl leading-tight font-extrabold md:text-6xl"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          {siteConfig.projects_page.titleFirst}{" "}
          <span className="gtext">{siteConfig.projects_page.titleSecond}</span>
        </h1>
        <p
          className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {siteConfig.projects_page.description}
        </p>
      </section>
      <ProjectGrid projects={projects} categories={categories} />
    </div>
  );
}
