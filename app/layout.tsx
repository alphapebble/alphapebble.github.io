// src/app/layout.tsx
import { AOSProvider } from "@/components/aos-provider";
import { BookingModal } from "@/components/booking-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InteractionEffects } from "@/components/interaction-effects";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { siteConfig } from "../site.config";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { WebVitals } from "./web-vitals";

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
  description: siteConfig.seoDescription || siteConfig.description, // Prefer SEO-friendly description
  alternates: { canonical: "/" },
  keywords: siteConfig.seoKeywords || siteConfig.keywords, // Prefer SEO-friendly keywords
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage || "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Prototype-o-Tron 3000`, // Nerdy alt text
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.seoDescription || siteConfig.description,
    images: [siteConfig.ogImage || "/images/og-image.jpg"],
    creator: siteConfig.twitterHandle || "@AlphaPebbleLab",
    site: siteConfig.twitterHandle || "@AlphaPebbleLab",
  },
  other: {
    "msapplication-TileColor": "#6366f1",
    "theme-color": "#6366f1",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
};

const jsonData = {
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
  description: siteConfig.description, // Keep nerdy for JSON-LD
  foundingDate: siteConfig.foundingDate || "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: siteConfig.links?.email?.replace("mailto:", "") || "labs@alphapebble.io",
    availableLanguage: "English",
  },
  sameAs: [
    siteConfig.links?.linkedin || "https://linkedin.com/company/alphapebble",
    siteConfig.links?.github || "https://github.com/alphapebble",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: siteConfig.address?.country || "India",
  },
  serviceType: "Technology Consulting",
  areaServed: "Worldwide",
  knowsAbout: [
    "AI",
    "MVP Development",
    "Product Strategy",
    "Rapid Prototyping",
  ],
  offers: [
    {
      "@type": "Service",
      name: "Prototype-o-Tron 3000",
      description: "Clickable mockups in days, not geological epochs, to test your wildest startup guesses.",
      serviceType: "Product Development",
    },
    {
      "@type": "Service",
      name: "Workflow Nanobots",
      description: "Tiny AI-powered bots that automate real work, no vaporware included.",
      serviceType: "Automation",
    },
    {
      "@type": "Service",
      name: "Due Diligence Death Ray",
      description: "One-week X-ray of your product and code, delivered with a spaceship-or-bicycle scorecard.",
      serviceType: "Consulting",
    },
    {
      "@type": "Service",
      name: "Growth-Stage Shielding",
      description: "Optimize costs and security for startups with traction, audit-ready without the tears.",
      serviceType: "Consulting",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://calendly.com" />

        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonData) }}
        />
      </head>
      <body
        className={`text-ink bg-bg selection:bg-primary/30 overflow-x-hidden font-sans antialiased ${inter.variable}`}
      >
        <a
          href="#main"
          className="skip-link focus:top-4 focus:left-4 focus:z-[9999] focus:h-auto focus:w-auto focus:p-3"
          data-tooltip="Warp to main content, avoid the asteroid field!" // Nerdy tooltip
        >
          Skip to main content
        </a>
        <AOSProvider>
          <div
            aria-hidden="true"
            className="gridlines pointer-events-none fixed inset-0 z-0"
            data-tooltip="Lab laser grid: Aesthetic, not for trapping intruders (we promise)." // xkcd flair
          ></div>
          <ScrollIndicator />
          <InteractionEffects />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <BookingModal />
          <WebVitals />
        </AOSProvider>
      </body>
    </html>
  );
}