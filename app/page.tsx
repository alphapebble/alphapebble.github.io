import { CapabilitiesSection } from "@/components/sections/capabilities";
import { ProjectsPreview } from "@/components/sections/case-studies";
import { HeroSection } from "@/components/sections/hero";
import { BlogPreview } from "@/components/sections/insights";
import { TimelineSection } from "@/components/sections/timeline";
import { WhySection } from "@/components/sections/why-section";
import { getResearchPosts, getProjects } from "@/lib/data";

export default async function HomePage() {
  const allProjects = await getProjects();
  const allPosts = await getResearchPosts();
  const projectsToShow = allProjects.slice(0, 3);
  const postsToShow = allPosts.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5">
      <HeroSection />
      <CapabilitiesSection />
      <WhySection />
      <TimelineSection />
      <ProjectsPreview projects={projectsToShow} />
      <BlogPreview posts={postsToShow} />
    </div>
  );
}
