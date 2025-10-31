import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/ui/modal-button";
import { siteConfig } from "@/site.config";
import Link from "next/link";
import { FlowingWaves } from "@/components/backgrounds/waves";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center py-20 md:py-24 text-center overflow-hidden">
      {/* Animated background blobs for visual calmness */}
      <div className="hero-blobs" aria-hidden="true" />
      <div className="hero-blobs-extra" aria-hidden="true" />
      
      {/* Radial gradient overlay for depth */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-bg/40" 
        aria-hidden="true" 
      />
      
      {/* Vignette effect */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 18, 32, 0.4) 100%)'
        }}
        aria-hidden="true" 
      />
      
      {/* Subtle dot pattern overlay */}
      <div className="pattern-dots absolute inset-0 opacity-20" aria-hidden="true" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl px-4">
        <h1
          className="text-5xl leading-tight font-extrabold md:text-7xl md:leading-[1.1] tracking-tight"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          {siteConfig.hero.titleFirst}{" "}
          <span className="gtext">{siteConfig.hero.titleSecond}</span>
        </h1>
        <p
          className="text-muted mt-6 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {siteConfig.hero.description}
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {siteConfig.hero.features.map((feature, index) => (
            <span
              key={feature}
              className="pill text-muted float-animation text-sm"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              {feature}
            </span>
          ))}
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="mt-12 flex flex-col gap-4 sm:flex-row justify-center"
        >
          <ModalButton data-aos="fade-right" data-aos-delay="400">
            {siteConfig.hero.cta.primary.title}
          </ModalButton>
          <Link href={siteConfig.hero.cta.secondary.href}>
            <Button
              variant="ghost"
              size="lg"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              {siteConfig.hero.cta.secondary.title}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-8 flex flex-col items-center gap-2 z-20"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <span className="text-muted text-xs uppercase tracking-wider">Scroll</span>
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
      
      {/* Flowing waves at bottom for smooth transition */}
      <FlowingWaves />
    </section>
  );
}
