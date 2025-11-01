"use client";

import { siteConfig } from "@/app/site.config";
import type { ProjectFrontmatter, ResearchFrontmatter } from "@/lib/data";
import { Command } from "cmdk";
import {
  BookOpenText,
  CalendarIcon,
  Github,
  Linkedin,
  Navigation,
  Palette,
  Presentation,
  Twitter,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState } from "react";

type Project = { slug: string; frontmatter: ProjectFrontmatter };
type Research = { slug: string; frontmatter: ResearchFrontmatter };

type CommandPaletteProps = {
  projects: Project[];
  research: Research[];
};

export function CommandPalette({ projects, research }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runAction = (action: () => void) => {
    setOpen(false);
    startTransition(action);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="cmdk-dialog"
    >
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Navigation">
          {siteConfig.header.sections.map((item) => (
            <Command.Item
              key={item.href}
              value={`Go to ${item.title}`}
              onSelect={() => runAction(() => router.push(item.href))}
            >
              <Navigation className="text-muted mr-3 h-5 w-5" />
              {item.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Research">
          {research.map((post) => (
            <Command.Item
              key={post.slug}
              value={post.frontmatter.title}
              onSelect={() =>
                runAction(() => router.push(`/research/${post.slug}`))
              }
            >
              <BookOpenText className="text-muted mr-3 h-5 w-5" />
              {post.frontmatter.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Projects">
          {projects.map((project) => (
            <Command.Item
              key={project.slug}
              value={project.frontmatter.title}
              onSelect={() =>
                runAction(() => router.push(`/projects/${project.slug}`))
              }
            >
              <Presentation className="text-muted mr-3 h-5 w-5" />
              {project.frontmatter.title}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item
            value="Toggle Theme"
            onSelect={() =>
              runAction(() => setTheme(theme === "dark" ? "light" : "dark"))
            }
          >
            <Palette className="text-muted mr-3 h-5 w-5" />
            Toggle Theme
          </Command.Item>
          <Command.Item
            value="Book a Call"
            onSelect={() =>
              runAction(() => {
                (
                  document.getElementById(
                    "booking-modal-button"
                  ) as HTMLButtonElement
                )?.click();
              })
            }
          >
            <CalendarIcon className="text-muted mr-3 h-5 w-5" />
            Book a Call
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Social">
          <Command.Item
            value="View on LinkedIn"
            onSelect={() =>
              runAction(() => window.open(siteConfig.links.linkedin, "_blank"))
            }
          >
            <Linkedin className="text-muted mr-3 h-5 w-5" />
            LinkedIn
          </Command.Item>
          <Command.Item
            value="View on Twitter"
            onSelect={() =>
              runAction(() => window.open(siteConfig.links.twitter, "_blank"))
            }
          >
            <Twitter className="text-muted mr-3 h-5 w-5" />
            Twitter / X
          </Command.Item>

          <Command.Item
            value="View on Github"
            onSelect={() =>
              runAction(() => window.open(siteConfig.links.github, "_blank"))
            }
          >
            <Github className="text-muted mr-3 h-5 w-5" />
            Github
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
