import { BlogGrid } from "@/components/blog-grid";
import { getBlogPosts } from "@/lib/data";

export const metadata = {
  title: "Notes From the Lab",
  description:
    "Our thoughts on building, validating, and shipping effectively. No fluff, just actionable takeaways.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const tags = ["All", ...new Set(posts.flatMap((p) => p.tags))];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <section className="text-center">
        <h1
          className="text-4xl leading-tight font-extrabold md:text-6xl"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          Notes From the <span className="gtext">Lab</span>
        </h1>
        <p
          className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
        >
          {metadata.description}
        </p>
      </section>
      <BlogGrid posts={posts} tags={tags} />
    </div>
  );
}
