import { siteConfig } from "@/site.config";
import Image from "next/image";
import { SubscribeForm } from "./subscribe-form";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div data-aos="slide-right" data-aos-delay="50">
            <h3 className="text-3xl leading-tight font-bold md:text-4xl">
              Minimum Bureaucracy. <br />
              <span className="gtext">Maximum Breakthroughs.</span>
            </h3>
            <p className="text-muted mt-4 text-lg">
              Ready to run your first experiment? Let&apos;s turn your biggest
              assumption into your most valuable asset. We&apos;re ready when
              you are.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg">{siteConfig.footer.cta.title}</Button>
              <Button variant="ghost" size="lg">
                <a href={siteConfig.footer.cta.download.href} download>
                  {siteConfig.footer.cta.download.title}
                </a>
              </Button>
            </div>
            {/* <div className="mt-12 border-t border-white/10 pt-8">
              <p className="text-muted mb-4 text-sm">Trusted by founders at:</p>
              <div className="flex items-center gap-8 opacity-60">
                <span className="font-mono text-sm">YC</span>
                <span className="font-mono text-sm">Techstars</span>
                <span className="font-mono text-sm">500 Global</span>
                <span className="font-mono text-sm">Pioneer</span>
              </div>
            </div> */}
          </div>

          <div data-aos="slide-left" data-aos-delay="200">
            <div className="glass rounded-3xl p-8">
              <div className="mb-6 flex items-start gap-4">
                <div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-xl">
                  <span className="text-2xl">📬</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Stay in the Loop</h4>
                  <p className="text-muted mt-1 text-sm">
                    Get practical insights on rapid prototyping, AI experiments,
                    and workflow automation delivered to your inbox. No fluff,
                    just actionable takeaways.
                  </p>
                </div>
              </div>
              <SubscribeForm />
              <div className="text-muted mt-6 flex items-center gap-4 text-xs">
                <span>✓ Weekly insights</span>
                <span>✓ No spam</span>
                <span>✓ Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-16 border-t border-white/10 pt-8"
          data-aos="fade-down"
          data-aos-delay="200"
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
              <a
                href={siteConfig.links.email}
                className="text-muted hover:text-primary interactive-hover transition-colors"
              >
                hello@alphapebble.com
              </a>
              <span className="text-muted hidden md:inline">·</span>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary interactive-hover transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-muted hidden md:inline">·</span>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary interactive-hover transition-colors"
              >
                GitHub
              </a>
              <span className="text-muted hidden md:inline">·</span>
              <a
                href={siteConfig.links.privacy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary interactive-hover transition-colors"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
