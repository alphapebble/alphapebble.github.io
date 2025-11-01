import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { ProjectGrid } from "@/components/project-grid";
import { getProjects } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: siteConfig.projects_page.description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | " + siteConfig.name,
    description: siteConfig.projects_page.description,
    url: `${siteConfig.url}/projects`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Alphapebble Projects",
      },
    ],
  },
  twitter: {
    title: "Projects | " + siteConfig.name,
    description: siteConfig.projects_page.description,
    images: [siteConfig.ogImage],
  },
};

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
    <main>
      <nav className="mx-auto max-w-7xl px-5 py-2">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="truncate text-gray-900 dark:text-white">Projects</li>
        </ol>
      </nav>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <AnimateOnView variant="fadeUp" className="text-center">
          <span className="pill mb-4 inline-block bg-white/20 text-xs text-white">
            {siteConfig.projects_page.badge}
          </span>
        </AnimateOnView>

        <AnimateOnView variant="zoomIn" duration={1} className="text-center">
          <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
            {siteConfig.projects_page.titleFirst}{" "}
            <span className="gtext">
              {siteConfig.projects_page.titleSecond}
            </span>
          </h1>
        </AnimateOnView>

        <AnimateOnView
          variant="fadeUp"
          delay={0.2}
          duration={0.8}
          className="pb-12 text-center"
        >
          <p className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl">
            {siteConfig.projects_page.description}
          </p>
        </AnimateOnView>
        <ProjectGrid projects={projects} categories={categories} />
      </div>
    </main>
  );
}
