"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { siteConfig } from "@/site.config";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target) && !buttonRef.current?.contains(target)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        onClick={toggleMenu}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        variant="primary"
      >
        <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="menu"
          aria-label="Main"
          className="bg-bg/95 absolute left-0 top-full z-50 w-screen border-b border-white/10 backdrop-blur-lg"
        >
          <div className="space-y-3 px-5 pt-2 pb-5">
            {siteConfig.header.nav.map((item: { href: string; title: string }) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className="interactive-hover block rounded-md py-2 font-medium text-muted transition-colors hover:text-white"
                onClick={closeMenu}
              >
                {item.title}
              </Link>
            ))}
            <a
              href={siteConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="btn-primary mt-4 block w-full rounded-lg px-5 py-3 text-center font-semibold text-white"
              aria-label="Book a call with AlphaPebble"
              onClick={closeMenu}
            >
              {siteConfig.header.cta.title}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
