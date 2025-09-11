import { AOSProvider } from "@/components/aos-provider";
import { BookingModal } from "@/components/booking-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { InteractionEffects } from "@/components/interaction-effects";
import { ScrollIndicator } from "@/components/scroll-indicator";
import { siteConfig } from "@/site.config";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { WebVitals } from "./web-vitals";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.author}`,
    site: `@${siteConfig.author}`,
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
  description: siteConfig.description,
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    email: "labs@alphapebble.io",
    availableLanguage: "English",
  },
  sameAs: [
    "https://linkedin.com/company/alphapebble",
    "https://github.com/alphapebble",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "India",
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
      name: "MVP Experiments",
      description: "Clickable prototypes in days, not months",
      serviceType: "Product Development",
    },
    {
      "@type": "Service",
      name: "Workflow MVPs",
      description: "Thin-slice prototypes powered by code, automation, or AI",
      serviceType: "Automation",
    },
    {
      "@type": "Service",
      name: "Product & Tech Due Diligence",
      description: "One-week teardown for investors or acquirers",
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
        >
          Skip to main content
        </a>
        <AOSProvider>
          <div
            aria-hidden="true"
            className="gridlines pointer-events-none fixed inset-0 z-0"
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
