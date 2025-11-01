"use client";

import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/ui/modal-button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div ref={menuRef}>
      <AnimateOnView variant="fadeLeft">
        <Button
          onClick={toggleMenu}
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          variant="primary"
        >
          {isOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </AnimateOnView>

      {isOpen && (
        <div
          id="mobile-menu"
          className="bg-bg/95 border-card-stroke absolute top-full left-0 w-full border-b backdrop-blur-lg"
        >
          <AnimateOnView
            variant="staggerParent"
            className="space-y-3 px-5 pt-2 pb-5"
          >
            {siteConfig.header.nav.map((item) => (
              <AnimateOnView variant="staggerChild" key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted interactive-hover hover:text-ink block rounded-md py-2 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </AnimateOnView>
            ))}
            <AnimateOnView variant="staggerChild">
              <ModalButton className="btn-primary text-ink mt-4 w-full rounded-lg px-5 py-3 font-semibold">
                {siteConfig.header.cta.title}
              </ModalButton>
            </AnimateOnView>
          </AnimateOnView>
        </div>
      )}
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
