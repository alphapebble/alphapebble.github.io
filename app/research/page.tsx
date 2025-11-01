import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { ResearchGrid } from "@/components/research-grid";
import { getResearchPosts } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research",
  description: siteConfig.research_page.description,
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research | " + siteConfig.name,
    description: siteConfig.research_page.description,
    url: `${siteConfig.url}/research`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Alphapebble Research",
      },
    ],
  },
  twitter: {
    title: "Research | " + siteConfig.name,
    description: siteConfig.research_page.description,
    images: [siteConfig.ogImage],
  },
};

export default async function ResearchPage() {
  const posts = await getResearchPosts();
  const tags = [
    "All",
    ...new Set(posts.flatMap((p) => p.frontmatter?.tags ?? []).filter(Boolean)),
  ];

  return (
    <main>
      <AnimateOnView variant="fadeLeft">
        <nav className="mx-auto max-w-7xl px-5 py-2">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-gray-900 dark:text-white">Research</li>
          </ol>
        </nav>
      </AnimateOnView>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <AnimateOnView variant="fadeUp" className="text-center">
          <span className="pill mb-4 inline-block bg-white/20 text-xs text-white">
            {siteConfig.research_page.badge}
          </span>
        </AnimateOnView>

        <AnimateOnView variant="zoomIn" duration={1} className="text-center">
          <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
            {siteConfig.research_page.titleFirst}{" "}
            <span className="gtext">
              {siteConfig.research_page.titleSecond}
            </span>
          </h1>
        </AnimateOnView>

        <AnimateOnView
          variant="fadeUp"
          delay={0.2}
          duration={0.8}
          className="pb-12 text-center"
        >
          <p className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl">
            {siteConfig.research_page.description}
          </p>
        </AnimateOnView>
        <ResearchGrid posts={posts} tags={tags} />
      </div>
    </main>
  );
}
