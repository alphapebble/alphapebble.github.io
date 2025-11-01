import { siteConfig } from "@/app/site.config";
import Image from "next/image";

export type OgImageProps = {
  title: string | undefined;
  heroImage: string | undefined;
  brandIcon?: string;
  brandName?: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string;
  tags?: string[];
};

export function OgImageTemplate({
  title,
  heroImage,
  brandName = siteConfig.name,
  brandIcon = `${siteConfig.url}/images/logo.png`,
  authorName,
  authorTitle,
  authorImage,
  tags,
}: OgImageProps) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "60px 80px",
        fontFamily: '"GeistSans"',
        backgroundColor: "#0b1220",
        color: "#f6f6f7",
        backgroundImage: `url(${heroImage || siteConfig.ogImage})`,
        backgroundSize: "1200px 630px",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(11, 18, 32, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={brandIcon}
            width="60"
            height="60"
            alt="AlphaPebble Logo"
            style={{
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "16px",
            }}
          />
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              marginLeft: 20,
              color: "#fff",
            }}
          >
            {brandName}
          </div>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 40,
            maxWidth: 1000,
            color: "#fff",
          }}
        >
          {title}
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {authorImage && (
            <Image
              src={authorImage}
              width="64"
              height="64"
              alt="Author Image"
              style={{ borderRadius: "50%", border: "2px solid #3b82f6" }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: authorImage ? 20 : 0,
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 600, color: "#fff" }}>
              {authorName}
            </div>
            <div style={{ fontSize: 24, color: "#f6f6f7b0" }}>
              {authorTitle}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags?.slice(0, 3).map((tag: string) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "99px",
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.1)",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
