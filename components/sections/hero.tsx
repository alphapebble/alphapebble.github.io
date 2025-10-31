import { siteConfig } from "@/app/site.config";
import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/ui/modal-button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <h1
        className="text-5xl leading-tight font-extrabold md:text-7xl"
        data-aos="zoom-in"
        data-aos-duration="1000"
      >
        {siteConfig.hero.titleFirst}{" "}
        <span className="gtext">{siteConfig.hero.titleSecond}</span>
      </h1>
      <p
        className="text-muted mt-5 max-w-3xl text-lg md:text-xl"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
      >
        {siteConfig.hero.description}
      </p>
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="mt-10 flex flex-col gap-4 sm:flex-row"
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
        className="mt-10 flex flex-col gap-4 sm:flex-row"
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
    </section>
  );
}
