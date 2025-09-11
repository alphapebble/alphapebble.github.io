"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  type: "h2" | "h3";
};

export function TableOfContents({ content }: { content: Heading[] }) {
  const [activeId, setActiveId] = useState("");

  const headings = content.filter(
    (item) => item.type === "h2" || item.type === "h3"
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.5 }
    );

    document
      .querySelectorAll(".article-content h2, .article-content h3")
      .forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [content]);

  return (
    <nav className="toc-sidebar glass rounded-2xl border border-white/10 p-7">
      <h3 className="mb-4 font-semibold text-white">On This Page</h3>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block transition-colors ${
                heading.type === "h3" ? "pl-4" : ""
              } ${activeId === heading.id ? "active text-primary font-semibold" : "text-muted hover:text-white"}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
