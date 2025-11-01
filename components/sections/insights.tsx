import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import Link from "next/link";

export function ResearchPreview({ posts }: { posts: any[] }) {
  const icons: Record<string, string> = {
    "Data Science": "📊",
    "AI Strategy": "🤖",
    MVP: "🏗️",
    Validation: "🧪",
  };

  return (
    <section id="insights" className="py-20">
      <div className="mb-12 text-center">
        <AnimateOnView variant="zoomIn" duration={0.8}>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="emoji-heading">{siteConfig.insights.icon}</span>{" "}
            {siteConfig.insights.title}
          </h2>
        </AnimateOnView>
        <AnimateOnView variant="fadeUp" delay={0.2}>
          <p className="text-muted mx-auto mt-3 max-w-3xl text-lg">
            {siteConfig.insights.description}
          </p>
        </AnimateOnView>
      </div>

      <AnimateOnView
        variant="staggerParent"
        className="grid gap-6 md:grid-cols-3"
      >
        {posts.slice(0, 3).map((post) => {
          const icon = icons[post.frontmatter.tags?.[0]] || "🔬";

          return (
            <AnimateOnView
              variant="staggerChild"
              key={post.slug}
              className="h-full"
            >
              <Link
                href={`/research/${post.slug}`}
                className="glass interactive-hover block h-full rounded-2xl p-7"
              >
                <div className="bg-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                  <span className="text-2xl">{icon}</span>
                </div>
                <h3 className="text-xl font-semibold">
                  {post.frontmatter.title}
                </h3>
                <p className="text-muted mt-3 text-sm">
                  {post.frontmatter.subtitle}
                </p>
                {post.frontmatter.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {post.frontmatter.tags.map((tag: string, i: number) => (
                      <span key={i} className="pill text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </AnimateOnView>
          );
        })}
      </AnimateOnView>
    </section>
  );
}
