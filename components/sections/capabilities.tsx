import { siteConfig } from "@/site.config";
import { WavePattern } from "@/components/backgrounds/waves";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative py-24 overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50" aria-hidden="true" />
      
      {/* Subtle wave pattern for texture */}
      <WavePattern />
      
      <div className="relative z-10">
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-bold md:text-4xl"
            data-aos="fade-down"
            data-aos-duration="800"
          >
            <span className="emoji-heading">{siteConfig.capabilities.icon}</span>{" "}
            {siteConfig.capabilities.title}
          </h2>
          <p
            className="text-muted mx-auto mt-4 max-w-3xl text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {siteConfig.capabilities.description}
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {siteConfig.capabilities.lanes.map((lane, index) => (
            <div
              key={lane.name}
              data-aos="flip-left"
              data-aos-delay={100 * (index + 1)}
              className="glass-enhanced rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300 flex flex-col h-full"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold leading-tight">
                  {lane.name}
                </h3>
                <span className="pill text-xs font-semibold uppercase tracking-wide">
                  {lane.engagement}
                </span>
              </div>
              <p className="text-muted mt-4 leading-relaxed">{lane.summary}</p>

              <div className="mt-6">
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Deliverables</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {lane.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">Sample Outcome</p>
                <p className="text-muted mt-2 text-sm leading-relaxed">{lane.outcome}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

