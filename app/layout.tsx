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
  logo: `${siteConfig.url}/images/logo.png`,
  description: siteConfig.description,
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-XXX-XXX-XXXX",
    contactType: "Customer Service",
    email: "hello@alphapebble.com",
  },
  sameAs: [
    "https://linkedin.com/company/alphapebble",
    "https://github.com/alphapebble",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  offers: {
    "@type": "Service",
    name: "MVP Development",
    description: "30-60-90 day MVP development process",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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
        </AOSProvider>
      </body>
    </html>
  );
}
