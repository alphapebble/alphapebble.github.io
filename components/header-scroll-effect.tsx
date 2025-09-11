"use client";

import { useEffect, useState } from "react";

export function HeaderScrollEffect() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <style jsx global>{`
      header {
        background: ${isScrolled
          ? "rgba(11, 18, 32, 0.95)"
          : "rgba(11, 18, 32, 0.8)"};
        transition: background-color 0.3s ease-in-out;
      }
    `}</style>
  );
}
