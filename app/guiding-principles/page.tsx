import { siteConfig } from "@/app/site.config";
import { AnimateOnView } from "@/components/animate-on-view";
import { ModalButton } from "@/components/ui/modal-button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guiding Principles",
  description: siteConfig.guiding_principles_page.description,
  alternates: { canonical: "/guiding-principles" },
  openGraph: {
    title: "Guiding Principles | " + siteConfig.name,
    description: siteConfig.guiding_principles_page.description,
    url: `${siteConfig.url}/guiding-principles`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Alphapebble Guiding Principles",
      },
    ],
  },
  twitter: {
    title: "Guiding Principles | " + siteConfig.name,
    description: siteConfig.guiding_principles_page.description,
    images: [siteConfig.ogImage],
  },
};

export default function GuidingPrinciplesPage() {
  return (
    <main>
      <AnimateOnView variant="fadeLeft">
        <nav className="mx-auto max-w-7xl px-5 py-2">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="truncate text-gray-900 dark:text-white">
              Guiding Principles
            </li>
          </ol>
        </nav>
      </AnimateOnView>
      <div className="mx-auto max-w-7xl px-5 py-20">
        <AnimateOnView variant="fadeUp" className="text-center">
          <span className="pill mb-4 inline-block bg-white/20 text-xs text-white">
            {siteConfig.guiding_principles_page.badge}
          </span>
        </AnimateOnView>

        <AnimateOnView variant="zoomIn" duration={1} className="text-center">
          <h1 className="text-4xl leading-tight font-extrabold md:text-6xl">
            {siteConfig.guiding_principles_page.titleFirst}{" "}
            <span className="gtext">
              {siteConfig.guiding_principles_page.titleSecond}
            </span>
          </h1>
        </AnimateOnView>

        <AnimateOnView
          variant="fadeUp"
          delay={0.2}
          duration={0.8}
          className="pb-12 text-center"
        >
          <p className="text-muted mx-auto mt-5 max-w-3xl text-lg md:text-xl">
            {siteConfig.guiding_principles_page.description}
          </p>
        </AnimateOnView>
        <AnimateOnView
          variant="staggerParent"
          className="my-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {siteConfig.guiding_principles_page.principles.map((principle) => (
            <AnimateOnView
              variant="staggerChild"
              key={principle.title}
              className="glass rounded-2xl p-7 text-center"
            >
              <span className="emoji-heading text-4xl font-bold">
                {principle.icon}
              </span>
              <h2 className="mt-4 text-2xl font-semibold">{principle.title}</h2>
              <p className="text-muted mt-2">{principle.description}</p>
            </AnimateOnView>
          ))}
        </AnimateOnView>
        <div className="mt-12 flex justify-center">
          <ModalButton> Learn More / Contact Us</ModalButton>
        </div>
      </div>
    </main>
  );
}
