"use client";
import { useEffect, useRef } from "react";

const SCROLL_THRESHOLD = 50;

export function PageScrollObserver() {
  const rafId = useRef(0);
  const handleScroll = () => {
    const isScrolled = window.scrollY > SCROLL_THRESHOLD;
    document.body.classList.toggle("is-scrolled", isScrolled);
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent =
      docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    document.body.style.setProperty("--scroll-progress", `${scrollPercent}%`);
  };

  const onScrollThrottled = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(handleScroll);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", onScrollThrottled);
    return () => {
      window.removeEventListener("scroll", onScrollThrottled);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      document.body.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
