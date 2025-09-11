import Link from "next/link";

export function BlogPreview({ posts }: { posts: any[] }) {
  const icons: Record<string, string> = {
    "Data Science": "📊",
    "AI Strategy": "🤖",
    MVP: "🏗️",
    Validation: "🧪",
  };

  return (
    <section id="insights" className="py-16">
      {/* Heading */}
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <span className="emoji-heading">🔬</span> Notes From the Lab
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Our thoughts on building, validating, and shipping effectively.
        </p>
      </div>

      {/* Blog Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((post, index) => {
          const icon = icons[post.tags?.[0]] || "🔬";

          return (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="glass interactive-hover block h-full rounded-2xl p-7"
              data-aos="slide-up"
              data-aos-delay={100 * (index + 1)}
            >
              {/* Icon */}
              <div className="bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <span className="text-2xl">{icon}</span>
              </div>

              {/* Title + Subtitle */}
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-muted mt-3 text-sm">{post.subtitle}</p>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag: string, i: number) => (
                    <span key={i} className="pill text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
