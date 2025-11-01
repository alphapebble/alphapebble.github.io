"use client";

import { useEffect, useRef, useState } from "react";
import { AnimateOnView } from "./animate-on-view";

type Heading = {
  id: string;
  text: string;
  type: "h2" | "h3";
};

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const observer = useRef<IntersectionObserver | null>(null);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const visibleHeadings = new Map<string, boolean>();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        visibleHeadings.set(entry.target.id, entry.isIntersecting);
      });

      let newActiveId = "";
      for (const heading of headings) {
        if (visibleHeadings.get(heading.id)) {
          newActiveId = heading.id;
          break;
        }
      }
      setActiveId(newActiveId);
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -80% 0px",
    });

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    elements.forEach((el) => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);

  return (
    <AnimateOnView variant="fadeLeft">
      <nav className="toc-sidebar glass border-primary/15 rounded-2xl border p-7">
        <h3 className="text-ink mb-4 font-semibold">On This Page</h3>
        <ul className="toc-list">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={`block transition-colors ${
                  heading.type === "h3" ? "pl-4" : ""
                } ${activeId === heading.id ? "active text-primary font-semibold" : "text-muted hover:text-ink"}`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </AnimateOnView>
  );
}
