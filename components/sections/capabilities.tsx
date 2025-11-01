import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-20">
      <div className="mb-12 text-center">
        <AnimateOnView variant="fadeDown" duration={0.8}>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="emoji-heading">
              {siteConfig.capabilities.icon}
            </span>{" "}
            {siteConfig.capabilities.title}
          </h2>
        </AnimateOnView>
        <AnimateOnView variant="fadeUp" delay={0.2}>
          <p className="text-muted mx-auto mt-3 max-w-3xl text-lg">
            {siteConfig.capabilities.description}
          </p>
        </AnimateOnView>
      </div>
      <AnimateOnView
        variant="staggerParent"
        className="grid gap-6 md:grid-cols-2"
      >
        {siteConfig.capabilities.capabilities.map((item) => (
          <AnimateOnView
            key={item.title}
            variant="flipLeft"
            className="glass rounded-2xl p-7"
          >
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </AnimateOnView>
        ))}
      </AnimateOnView>
    </section>
  );
}
