import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/ui/modal-button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <AnimateOnView
        variant="zoomIn"
        duration={0.8}
        className="text-5xl leading-tight font-extrabold md:text-7xl"
        as="h1"
      >
        {siteConfig.hero.titleFirst}{" "}
        <span className="gtext">{siteConfig.hero.titleSecond}</span>
      </AnimateOnView>

      <AnimateOnView
        variant="fadeUp"
        delay={0.2}
        duration={0.8}
        className="text-muted mt-5 max-w-3xl text-lg md:text-xl"
        as="p"
      >
        {siteConfig.hero.description}
      </AnimateOnView>
      <AnimateOnView
        variant="staggerParent"
        delay={0.4}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        {siteConfig.hero.features.map((feature) => (
          <AnimateOnView
            key={feature}
            as="span"
            variant="staggerChild"
            className="pill text-muted float-animation text-sm"
          >
            {feature}
          </AnimateOnView>
        ))}
      </AnimateOnView>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <AnimateOnView variant="fadeRight" delay={0.6}>
          <ModalButton>{siteConfig.hero.cta.primary.title}</ModalButton>
        </AnimateOnView>
        <AnimateOnView variant="fadeLeft" delay={0.6}>
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
        </AnimateOnView>
      </div>
    </section>
  );
}
