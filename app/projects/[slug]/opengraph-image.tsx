import { siteConfig } from "@/app/site.config";
import { OgImageTemplate } from "@/components/og-image-template";
import { getProjectBySlug } from "@/lib/data";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alphapebble Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getProjectBySlug(params.slug);
  if (!post) {
    return new ImageResponse(<div>Not Found</div>, { ...size });
  }

  const { title, category, clientName, heroImage } = post.frontmatter;

  return new ImageResponse(
    (
      <OgImageTemplate
        title={`${title} ${clientName || ""}`}
        heroImage={heroImage}
        authorName="Case Study"
        authorTitle={siteConfig.name}
        tags={category ? [category] : []}
      />
    ),
    { ...size }
  );
}
