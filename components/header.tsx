import { siteConfig } from "@/site.config";
import Image from "next/image";
import Link from "next/link";
import { HeaderScrollEffect } from "./header-scroll-effect";
import { MobileNav } from "./mobile-nav";
import { ModalButton } from "./ui/modal-button";

export function Header() {
  return (
    <header className="bg-bg/80 sticky top-0 z-40 border-b border-white/10 backdrop-blur-lg">
      <HeaderScrollEffect />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link
          href="/"
          data-aos="fade-right"
          className="flex items-center gap-3"
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
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {siteConfig.header.nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-white"
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
