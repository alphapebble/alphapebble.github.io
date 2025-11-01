"use client";

import { siteConfig } from "@/app/site.config";
import { SubscribeForm } from "@/components/subscribe-form";
import { Button } from "@/components/ui/button";
import { ModalButton } from "@/components/ui/modal-button";
import Image from "next/image";
import Link from "next/link";
import { AnimateOnView } from "./animate-on-view";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = siteConfig.footer.cta.download.href;
    link.download =
      siteConfig.footer.cta.download.href.split("/").pop() || "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="border-card-stroke mt-8 border-t">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <AnimateOnView variant="fadeRight" delay={0.2}>
            <h3 className="text-3xl leading-tight font-bold md:text-4xl">
              {siteConfig.footer.titleFirst} <br />
              <span className="gtext">{siteConfig.footer.titleSecond}</span>
            </h3>
            <p className="text-muted mt-4 text-lg">
              {siteConfig.footer.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ModalButton>{siteConfig.footer.cta.title}</ModalButton>
              {siteConfig.footer.cta.download && (
                <Button variant="ghost" size="lg" onClick={handleDownload}>
                  {siteConfig.footer.cta.download.title}
                </Button>
              )}
            </div>
          </AnimateOnView>

          <AnimateOnView variant="fadeLeft" delay={0.2}>
            <div className="glass rounded-3xl p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl">
                  <span className="text-2xl">📬</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    {siteConfig.footer.newsletter.title}
                  </h4>
                  <p className="text-muted mt-1 text-sm">
                    {siteConfig.footer.newsletter.description}
                  </p>
                </div>
              </div>
              <SubscribeForm />
              <div className="text-muted mt-6 flex flex-wrap gap-4 text-xs">
                {siteConfig.footer.newsletter.benefits.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            </div>
          </AnimateOnView>
        </div>

        <AnimateOnView
          variant="fadeDown"
          delay={0.2}
          className="border-card-stroke mt-8 border-t pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={72}
                height={32}
                className="h-8 w-18 object-contain opacity-60"
              />
              <span className="text-muted text-sm">
                © {currentYear} {siteConfig.name}. All Rights Reserved.
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              {siteConfig.footer.nav.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    item.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  className="text-muted hover:text-primary interactive-hover transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </AnimateOnView>
      </div>
    </footer>
  );
}
