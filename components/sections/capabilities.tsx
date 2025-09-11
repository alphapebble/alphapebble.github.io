import { siteConfig } from "@/site.config";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <span className="emoji-heading">{siteConfig.capabilities.icon}</span>{" "}
          {siteConfig.capabilities.title}
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {siteConfig.capabilities.description}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {siteConfig.capabilities.capabilities.map((item, index) => (
          <div
            key={item.title}
            data-aos="flip-left"
            data-aos-delay={100 * (index + 1)}
            className="glass rounded-2xl p-7"
          >
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
