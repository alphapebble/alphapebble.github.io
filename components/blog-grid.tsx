"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function BlogGrid({ posts, tags }: { posts: any[]; tags: string[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.frontmatter.tags.includes(activeFilter));

  return (
    <>
      <section
        className="my-12 flex flex-wrap items-center justify-center gap-3"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${activeFilter === tag ? "bg-primary border-primary font-semibold text-white" : "text-muted hover:border-primary border-white/20"}`}
          >
            {tag}
          </button>
        ))}
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.slug}
            className="group glass block flex h-full flex-col overflow-hidden rounded-2xl"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.frontmatter.heroImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-grow flex-col p-7">
              <h3 className="text-xl font-semibold">
                {post.frontmatter.title}
              </h3>
              <p className="text-muted mt-3 flex-grow text-sm">
                {post.frontmatter.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {post.frontmatter.tags.map((tag: string) => (
                  <span key={tag} className="pill text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
