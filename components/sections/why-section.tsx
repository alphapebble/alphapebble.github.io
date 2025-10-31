import { siteConfig } from "@/app/site.config";

export function WhySection() {
  return (
    <section id="why" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <span className="emoji-heading">{siteConfig.why.icon}</span>{" "}
          {siteConfig.why.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.why.edges.map((edge, index) => (
          <div
            key={edge.icon}
            data-aos="fade-up"
            data-aos-delay={100 * (index + 1)}
            className="glass rounded-xl p-5 text-center"
          >
            {edge.icon} <br />
            <span dangerouslySetInnerHTML={{ __html: edge.text }} />
          </div>
        ))}
      </div>
    </section>
  );
}
