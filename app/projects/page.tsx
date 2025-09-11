import { ProjectGrid } from "@/components/project-grid";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projects & Experiments",
  description:
    "Our experiments deliver tangible outcomes. Here's a look at how we approach different challenges.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <section className="pb-10 text-center">
        <h1
          className="text-4xl leading-tight font-extrabold md:text-6xl"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          Our <span className="gtext">Work</span>
        </h1>
        <p
          className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {metadata.description}
        </p>
      </section>
      <ProjectGrid projects={projects} categories={categories} />
    </div>
  );
}
