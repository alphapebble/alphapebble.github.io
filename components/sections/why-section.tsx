import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";

export function WhySection() {
  return (
    <section id="why" className="py-16">
      <AnimateOnView
        variant="zoomIn"
        duration={0.8}
        className="mb-12 text-center"
      >
        <h2 className="text-3xl font-bold md:text-4xl">
          <span className="emoji-heading">{siteConfig.why.icon}</span>{" "}
          {siteConfig.why.title}
        </h2>
      </AnimateOnView>
      <AnimateOnView
        variant="staggerParent"
        className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4"
      >
        {siteConfig.why.edges.map((edge) => (
          <AnimateOnView
            key={edge.icon}
            variant="staggerChild"
            className="glass rounded-xl p-5 text-center"
          >
            {edge.icon} <br />
            <span dangerouslySetInnerHTML={{ __html: edge.text }} />
          </AnimateOnView>
        ))}
      </AnimateOnView>
    </section>
  );
}
