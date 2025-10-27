import { WebVitals } from "@/app/web-vitals";
import { AOSProvider } from "@/components/aos-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InteractionEffects } from "@/components/interaction-effects";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { siteConfig } from "@/site.config";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seoDescription || siteConfig.description,
  alternates: { canonical: siteConfig.url },
  keywords: siteConfig.seoKeywords || siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle || "@AlphaPebbleLab",
    creator: siteConfig.twitterHandle || "@AlphaPebbleLab",
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    images: [siteConfig.ogImage || "/images/og-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/images/logo.png`,
    width: 144,
    height: 64,
  },
  description: siteConfig.description,
  foundingDate: siteConfig.foundingDate || "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email:
      siteConfig.links?.email?.replace("mailto:", "") || "labs@alphapebble.io",
    availableLanguage: ["English"],
  },
  sameAs: [
    siteConfig.links?.linkedin || "https://linkedin.com/company/alphapebble",
    siteConfig.links?.github || "https://github.com/alphapebble",
  ],
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
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/logo.png`,
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" prefix="og: https://ogp.me/ns#">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link
          rel="preload"
          as="image"
          href="/images/logo.png"
          type="image/png"
        />
        <Script
          id="organization-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Script
          id="website-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <Script
          id="breadcrumb-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </head>
      <body
        className={`text-ink bg-bg selection:bg-primary/30 overflow-x-hidden font-sans antialiased ${inter.variable}`}
      >
        <noscript>
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              background: "#fff3cd",
              color: "#6366f1",
              border: "1px solid #ffc107",
              margin: "20px",
              borderRadius: "6px",
              fontFamily: "sans-serif",
            }}
          >
            <strong>JavaScript is required</strong> to use AlphaPebble. Please
            enable JavaScript in your browser for the best experience.
          </div>
        </noscript>
        <a
          href="#main"
          className="skip-link focus:top-4 focus:left-4 focus:z-[9999] focus:h-auto focus:w-auto focus:p-3"
          data-tooltip="Warp to main content, avoid the asteroid field!"
        >
          Skip to main content
        </a>
        <AOSProvider>
          <div
            aria-hidden="true"
            className="gridlines pointer-events-none fixed inset-0 z-0"
            data-tooltip="Lab laser grid: Aesthetic, not for trapping intruders (we promise)."
          ></div>
          <ScrollIndicator />
          <InteractionEffects />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          {/* BookingModalClientWrapper removed: booking now opens in new tab */}
          <WebVitals />
        </AOSProvider>
      </body>
    </html>
  );
}
