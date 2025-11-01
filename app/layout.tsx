import { siteConfig } from "@/app/site.config";
import { BookingModal } from "@/components/booking-modal";
import { CommandPalette } from "@/components/command-palette";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PageScrollObserver } from "@/components/page-scroll-observer";
import { ThemeProvider } from "@/components/theme-provider";
import { getProjects, getResearchPosts } from "@/lib/data";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription || siteConfig.description,
  keywords: siteConfig.seoKeywords || siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "Alphapebble RSS Feed" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: siteConfig.twitterHandle,
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    images: [siteConfig.ogImage],
  },
  other: {
    "theme-color": "#6366f1",
    "msapplication-TileColor": "#6366f1",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.name,
    "format-detection": "telephone=no",
    language: "English",
    "geo.region": "IN",
    "geo.placename": "India",
    "revisit-after": "7 days",
    generator: "Next.js",
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/images/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/images/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/images/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/images/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  foundingDate: siteConfig.foundingDate || "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    email:
      siteConfig.links?.email?.replace("mailto:", "") || "labs@alphapebble.io",
    availableLanguage: ["English"],
  },
  sameAs: [siteConfig.links?.linkedin, siteConfig.links?.github],
  address: {
    "@type": "PostalAddress",
    addressCountry: siteConfig.address?.country || "India",
  },
  areaServed: "Worldwide",
  knowsAbout: [
    "AI",
    "MVP Development",
    "Product Strategy",
    "Rapid Prototyping",
    "Automation",
    "Technology Consulting",
  ],
  offers: [
    {
      "@type": "Service",
      name: "Prototype-o-Tron 3000",
      description:
        "Clickable mockups in days, not geological epochs, to test your wildest startup guesses.",
      serviceType: "Product Development",
    },
    {
      "@type": "Service",
      name: "Workflow Nanobots",
      description:
        "Tiny AI-powered bots that automate real work, no vaporware included.",
      serviceType: "Automation",
    },
    {
      "@type": "Service",
      name: "Due Diligence Death Ray",
      description:
        "One-week X-ray of your product and code, delivered with a spaceship-or-bicycle scorecard.",
      serviceType: "Consulting",
    },
    {
      "@type": "Service",
      name: "Growth-Stage Shielding",
      description:
        "Optimize costs and security for startups with traction, audit-ready without the tears.",
      serviceType: "Consulting",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: `${siteConfig.url}/images/logo.png`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();
  const research = await getResearchPosts();
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-py-8 scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="schema-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body className="bg-bg text-ink selection:bg-primary/30 min-h-screen overflow-x-hidden antialiased">
        <noscript>
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "hsl(48 100% 88%)",
              color: "hsl(217 91% 60%)",
              border: "1px solid hsl(48 100% 50%)",
              margin: "20px",
              borderRadius: "6px",
              fontFamily: "sans-serif",
            }}
          >
            <strong>JavaScript is required</strong> to use AlphaPebble. Please
            enable JavaScript in your browser for the best experience.
          </div>
        </noscript>

        <ThemeProvider>
          <PageScrollObserver />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <BookingModal />
          <CommandPalette projects={projects} research={research} />
        </ThemeProvider>
      </body>
    </html>
  );
}
