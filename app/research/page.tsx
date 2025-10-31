import { siteConfig } from "@/app/site.config";
import { ResearchGrid } from "@/components/research-grid";
import { getResearchPosts } from "@/lib/data";

export default async function ResearchPage() {
  const posts = await getResearchPosts();
  const tags = [
    "All",
    ...new Set(posts.flatMap((p) => p.frontmatter?.tags ?? []).filter(Boolean)),
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-20">
      <section className="pb-12 text-center" data-aos="fade-in">
        <h1
          className="text-4xl leading-tight font-extrabold md:text-6xl"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          {siteConfig.research_page.titleFirst}{" "}
          <span className="gtext">{siteConfig.research_page.titleSecond}</span>
        </h1>
        <p
          className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {siteConfig.research_page.description}
        </p>
      </section>
      <ResearchGrid posts={posts} tags={tags} />
    </div>
  );
}
