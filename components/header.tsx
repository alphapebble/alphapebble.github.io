import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { MobileNav } from "@/components/mobile-nav";
import { ModalButton } from "@/components/ui/modal-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="bg-bg/80 border-card-stroke sticky top-0 z-40 border-b backdrop-blur-lg"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <AnimateOnView variant="fadeRight" as="div">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label={`${siteConfig.name} - Go to homepage`}
          >
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={144}
              height={64}
              className="h-16 w-36 object-contain"
              priority
            />
          </Link>
        </AnimateOnView>
        <nav
          className="hidden items-center gap-1 text-sm md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <AnimateOnView
            variant="staggerParent"
            delay={0.3}
            className="flex items-center gap-1"
          >
            {siteConfig.header.nav.map((item) => (
              <AnimateOnView
                variant="staggerChild"
                as="div"
                key={item.href}
                className="flex"
              >
                <Link
                  href={item.href}
                  className="text-muted hover:text-ink rounded-sm px-3 py-2 font-semibold transition-colors"
                >
                  {item.title}
                </Link>
              </AnimateOnView>
            ))}
          </AnimateOnView>

          <AnimateOnView
            variant="fadeLeft"
            delay={0.6}
            className="flex items-center gap-2"
          >
            <ThemeToggle />
            <ModalButton>{siteConfig.header.cta.title}</ModalButton>
          </AnimateOnView>
        </nav>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
