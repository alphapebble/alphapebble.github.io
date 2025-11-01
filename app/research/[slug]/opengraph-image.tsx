import { OgImageTemplate } from "@/components/og-image-template";
import { getResearchPostBySlug } from "@/lib/data";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alphapebble Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getResearchPostBySlug(params.slug);
  if (!post) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const { title, tags, author, heroImage } = post.frontmatter;

  return new ImageResponse(
    (
      <OgImageTemplate
        title={title}
        heroImage={heroImage}
        authorName={author?.name}
        authorTitle={author?.title}
        authorImage={author?.avatar}
        tags={tags}
      />
    ),
    { ...size }
  );
}
