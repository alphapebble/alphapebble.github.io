"use client";

import { useEffect, useState } from "react";

export function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      setScrollPercentage(0);
      return;
    }
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
