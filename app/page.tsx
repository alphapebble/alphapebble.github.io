import { AnimateOnView } from "@/components/animate-on-view";
import { ErrorBoundary } from "@/components/error-boundary";
import { CapabilitiesSection } from "@/components/sections/capabilities";
import { ProjectsPreview } from "@/components/sections/case-studies";
import { HeroSection } from "@/components/sections/hero";
import { ResearchPreview } from "@/components/sections/insights";
import { TimelineSection } from "@/components/sections/timeline";
import { WhySection } from "@/components/sections/why-section";
import { getProjects, getResearchPosts } from "@/lib/data";

export default async function Home() {
  const allProjects = await getProjects();
  const allPosts = await getResearchPosts();
  const projectsToShow = allProjects.slice(0, 3);
  const postsToShow = allPosts.slice(0, 3);

  return (
    <AnimateOnView
      variant="staggerParent"
      className="container-fluid mx-auto max-w-7xl px-5"
    >
      <ErrorBoundary fallback={<p>Error loading hero section</p>}>
        <AnimateOnView variant="staggerChild">
          <HeroSection />
        </AnimateOnView>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error loading capabilities section</p>}>
        <AnimateOnView variant="staggerChild">
          <CapabilitiesSection />
        </AnimateOnView>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error loading why section</p>}>
        <AnimateOnView variant="staggerChild">
          <WhySection />
        </AnimateOnView>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error loading case studies</p>}>
        <AnimateOnView variant="staggerChild">
          <ProjectsPreview projects={projectsToShow} />
        </AnimateOnView>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error loading timeline section</p>}>
        <AnimateOnView variant="staggerChild">
          <TimelineSection />
        </AnimateOnView>
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error loading insights section</p>}>
        <AnimateOnView variant="staggerChild">
          <ResearchPreview posts={postsToShow} />
        </AnimateOnView>
      </ErrorBoundary>
    </AnimateOnView>
  );
}
