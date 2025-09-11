"use client";

import { siteConfig } from "@/site.config";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ModalButton } from "./ui/modal-button";

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
      <Button
        onClick={toggleMenu}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        variant="primary"
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <XIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </Button>

      {isOpen && (
        <div
          id="mobile-menu"
          className="bg-bg/95 absolute top-full left-0 w-full border-b border-white/10 backdrop-blur-lg"
        >
          <div className="space-y-3 px-5 pt-2 pb-5">
            {siteConfig.header.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted interactive-hover block rounded-md py-2 font-medium transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <ModalButton
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-4 w-full rounded-lg px-5 py-3 font-semibold text-white"
            >
              {siteConfig.header.cta.title}
            </ModalButton>
          </div>
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
