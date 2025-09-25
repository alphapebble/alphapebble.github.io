// components/blog-grid.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";

// Infer the post type from getBlogPosts return type
type BlogPost = Awaited<ReturnType<typeof getBlogPosts>>[number];

interface BlogGridProps {
  posts: BlogPost[];
  tags: string[];
}

export function BlogGrid({ posts, tags }: BlogGridProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Filter posts based on selected tag
  const filteredPosts = selectedTag === "All"
    ? posts
    : posts.filter(post => 
        post.frontmatter?.tags?.includes(selectedTag)
      );

  return (
    <div className="space-y-8">
      {/* Tag Filter */}
      {tags.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2" data-aos="fade-up">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`pill transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="100">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* No posts message */}
      {filteredPosts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {selectedTag !== "All"
              ? `No posts found with tag "${selectedTag}"`
              : "No blog posts found"
            }
          </p>
        </div>
      )}
    </div>
  );
}

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  const { frontmatter, slug } = post;

  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl dark:bg-gray-800">
      <Link href={`/blog/${slug}`}>
        {/* Featured Image */}
        {frontmatter?.heroImage && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={frontmatter.heroImage}
              alt={frontmatter.title ?? slug}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              placeholder={frontmatter.heroImagePlaceholder ? "blur" : undefined}
              blurDataURL={frontmatter.heroImagePlaceholder}
            />
          </div>
        )}

        <div className="p-6">
          {/* Tags */}
          {frontmatter?.tags && frontmatter.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {frontmatter.tags
                .filter((tag): tag is string => typeof tag === 'string')
                .slice(0, 3)
                .map((tag) => (
                  <span
                    key={tag}
                    className="pill bg-primary/10 text-primary text-xs"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}

          {/* Title */}
          <h2 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">
            {frontmatter?.title ?? slug}
          </h2>

          {/* Subtitle */}
          {frontmatter?.subtitle && (
            <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">
              {frontmatter.subtitle}
            </p>
          )}

          {/* Author and Date */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              {frontmatter?.author?.avatar && (
                <Image
                  src={frontmatter.author.avatar}
                  alt={frontmatter.author.name ?? "Author"}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{frontmatter?.author?.name ?? "Anonymous"}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {frontmatter?.publishedDate && (
                <span>{frontmatter.publishedDate}</span>
              )}
              {frontmatter?.readTime && (
                <>
                  <span>•</span>
                  <span>{frontmatter.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}