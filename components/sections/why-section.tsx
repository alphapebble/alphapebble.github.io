import { siteConfig } from "@/site.config";

export function WhySection() {
  return (
    <section id="why" className="relative py-24 overflow-hidden">
      {/* Subtle accent blob for visual interest */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="relative">
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-bold md:text-4xl"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <span className="emoji-heading">{siteConfig.why.icon}</span>{" "}
            {siteConfig.why.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.why.edges.map((edge, index) => (
            <div
              key={edge.icon}
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
              className="glass rounded-xl p-6 text-center hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="text-3xl mb-3">{edge.icon}</div>
              <span 
                className="text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: edge.text }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
