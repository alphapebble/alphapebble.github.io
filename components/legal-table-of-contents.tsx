"use client";

import { useEffect, useState } from "react";

export function LegalTOC() {
  const [headings, setHeadings] = useState<
    { id: string; text: string | null }[]
  >([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".legal-content h2[id]")
    );
    setHeadings(
      headingElements.map((h) => ({ id: h.id, text: h.textContent }))
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headingElements.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28">
      <h3 className="mb-4 font-semibold text-white">On this page</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block border-l-2 py-1 pl-4 text-sm transition-colors ${
                activeId === heading.id
                  ? "border-primary text-primary font-semibold"
                  : "text-muted border-transparent hover:text-white"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
