import { MobileNav } from "@/components/mobile-nav";
import { ModalButton } from "@/components/ui/modal-button";
import { siteConfig } from "@/site.config";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header
      className="bg-bg/80 sticky top-0 z-40 border-b border-white/10 backdrop-blur-lg"
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          data-aos="fade-right"
          className="flex items-center gap-3"
          aria-label={`${siteConfig.name} - Go to homepage`}
        >
          <Image
            src="/images/logo.png"
            alt={`${siteConfig.name} Logo`}
            width={144}
            height={64}
            className="h-16 w-36 object-contain"
            priority
            data-aos="fade-right"
            data-aos-duration="800"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-7 text-sm md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {siteConfig.header.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted focus:ring-primary focus:ring-offset-bg rounded-sm px-2 py-1 transition-colors hover:text-white focus:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
              data-aos="fade-down"
              data-aos-delay={100 * (index + 1)}
            >
              {item.title}
            </Link>
          ))}
          <ModalButton data-aos="fade-left" data-aos-delay="300">
            {siteConfig.header.cta.title}
          </ModalButton>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
