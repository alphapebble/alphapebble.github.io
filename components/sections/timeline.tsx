import { siteConfig } from "@/site.config";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-center text-3xl font-bold md:text-4xl"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <span className="emoji-heading">{siteConfig.timeline.icon}</span>{" "}
          {siteConfig.timeline.title}
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-center text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {siteConfig.timeline.description}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {siteConfig.timeline.timeline.map((item, index) => (
          <div
            key={item.title}
            data-aos={item.aos}
            data-aos-delay={100 * (index + 1)}
            className="glass rounded-xl p-7"
          >
            <div className="text-primary text-sm font-semibold">
              {item.period}
            </div>
            <div className="mt-2 text-lg font-semibold">{item.title}</div>
            <p className="text-muted mt-1 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
