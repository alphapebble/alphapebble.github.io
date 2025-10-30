"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function FeaturedResearchCard({ post }: { post: any }) {
  return (
    <Link
      href={`/research/${post.slug}`}
      className="glass interactive-hover block items-center gap-8 overflow-hidden rounded-2xl md:grid md:grid-cols-5"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="relative aspect-video h-full overflow-hidden md:col-span-3 md:aspect-auto">
        <Image
          src={post.frontmatter.heroImage}
          alt={post.frontmatter.title}
          fill
          className="research-card-image h-full w-full rounded-t-2xl md:rounded-t-none md:rounded-l-2xl"
          style={{ viewTransitionName: `research-image-${post.slug}` }}
        />
      </div>

      <div className="p-8 md:col-span-2">
        <div className="mb-3 flex items-center gap-2">
          {post.frontmatter.tags.map((tag: string) => (
            <span key={tag} className="pill text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          {post.frontmatter.title}
        </h2>
        <p className="text-muted mt-3 text-sm">{post.frontmatter.subtitle}</p>
        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
          <Image
            src={post.frontmatter.author.avatar}
            alt={post.frontmatter.author.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-ink text-sm font-semibold">
              {post.frontmatter.author.name}
            </p>
            <p className="text-muted text-xs">
              {post.frontmatter.publishedDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ResearchCard({ post, delay }: { post: any; delay: number }) {
  return (
    <Link
      href={`/research/${post.slug}`}
      className="glass interactive-hover block flex h-full flex-col overflow-hidden rounded-2xl"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl">
        <Image
          src={post.frontmatter.heroImage}
          alt={post.frontmatter.title}
          fill
          className="research-card-image"
          style={{ viewTransitionName: `research-image-${post.slug}` }}
        />
        <Image
          src={post.frontmatter.heroImage}
          alt={post.frontmatter.title}
          fill
          className="research-card-image h-full w-full rounded-t-2xl object-cover md:rounded-t-none md:rounded-l-2xl"
          style={{ viewTransitionName: `research-image-${post.slug}` }}
        />
      </div>
      <div className="flex flex-grow flex-col p-7">
        <h3 className="text-xl font-semibold">{post.frontmatter.title}</h3>
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
        <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
          <Image
            src={post.frontmatter.author.avatar}
            alt={post.frontmatter.author.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-ink text-sm font-semibold">
              {post.frontmatter.author.name}
            </p>
            <p className="text-muted text-xs">
              {post.frontmatter.publishedDate}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ResearchGrid({
  posts,
  tags,
}: {
  posts: any[];
  tags: string[];
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.frontmatter.tags.includes(activeFilter));

  const showFeatured = activeFilter === "All" && filteredPosts.length > 1;

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

      {showFeatured && (
        <div className="mb-12">
          <FeaturedResearchCard post={filteredPosts[0]} />
        </div>
      )}

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(showFeatured ? filteredPosts.slice(1) : filteredPosts).map(
          (post, index) => (
            <ResearchCard key={post.slug} post={post} delay={index * 100} />
          )
        )}
      </section>
    </>
  );
}
