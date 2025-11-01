import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20">
      <div className="mb-12 text-center">
        <AnimateOnView variant="fadeDown" duration={0.8}>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            <span className="emoji-heading">{siteConfig.timeline.icon}</span>{" "}
            {siteConfig.timeline.title}
          </h2>
        </AnimateOnView>
        <AnimateOnView variant="fadeUp" delay={0.2}>
          <p className="text-muted mx-auto mt-3 max-w-3xl text-center text-lg">
            {siteConfig.timeline.description}
          </p>
        </AnimateOnView>
      </div>
      <AnimateOnView
        variant="staggerParent"
        className="grid gap-6 md:grid-cols-3"
      >
        {siteConfig.timeline.timeline.map((item) => (
          <AnimateOnView
            key={item.title}
            variant="staggerChild"
            className="glass rounded-xl p-7"
          >
            <div className="text-primary text-sm font-semibold">
              {item.period}
            </div>
            <div className="mt-2 text-lg font-semibold">{item.title}</div>
            <p className="text-muted mt-1 text-sm">{item.description}</p>
          </AnimateOnView>
        ))}
      </AnimateOnView>
    </section>
  );
}
