import { siteConfig } from "@/site.config";

export function TimelineSection() {
  return (
    <section id="timeline" className="relative py-24 overflow-hidden">
      {/* Subtle accent blobs on left side */}
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="mb-16 text-center">
          <h2
            className="text-center text-3xl font-bold md:text-4xl"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <span className="emoji-heading">{siteConfig.timeline.icon}</span>{" "}
            {siteConfig.timeline.title}
          </h2>
          <p
            className="text-muted mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {siteConfig.timeline.description}
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-primary/0 via-primary/40 to-primary/0 md:block" aria-hidden="true" />

          <div className="space-y-12">
            {siteConfig.timeline.timeline.map((item, index) => (
              <div
                key={item.title}
                data-aos={item.aos}
                data-aos-delay={100 * (index + 1)}
                className="relative pl-10 md:pl-16"
              >
                <span
                  className="absolute left-1 top-2 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white shadow-lg md:left-[-0.75rem] md:size-8"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>

                {index !== siteConfig.timeline.timeline.length - 1 && (
                  <span className="absolute left-[calc(0.65rem)] top-8 hidden h-full w-px bg-primary/20 md:block" aria-hidden="true" />
                )}

                <div className="glass-enhanced rounded-2xl p-6 md:p-8">
                  <div className="text-primary text-sm font-semibold uppercase tracking-wider">
                    {item.period}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold md:text-xl">{item.title}</h3>
                  <p className="text-muted mt-3 text-sm leading-relaxed md:text-base">{item.description}</p>

                  <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                      📦
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink uppercase tracking-wide">{item.artifact.label}</p>
                      <p className="text-muted mt-1 text-sm leading-relaxed">{item.artifact.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
