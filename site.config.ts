export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  url: string;
  author: string;
  keywords: string[];
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
    privacy: string;
  };
  header: {
    nav: {
      title: string;
      href: string;
    }[];
    cta: {
      title: string;
    };
  };
  hero: {
    title: string;
    description: string;
    cta: {
      primary: {
        title: string;
      };
      secondary: {
        title: string;
        href: string;
      };
    };
  };
  footer: {
    cta: {
      title: string;
      download: {
        title: string;
        href: string;
      };
    };
    nav: {
      title: string;
      href: string;
    }[];
  };
  bookingUrl: string;
};

export const siteConfig: SiteConfig = {
  name: "AlphaPebble",
  title: "AlphaPebble - From Idea to MVP | AI-First Product Studio",
  description:
    "An AI-first micro-product studio for founders who move fast. We run small, smart experiments that become workflow MVPs in 30-60-90 days.",
  url: "https://www.alphapebble.io/",
  author: "AlphaPebble",
  keywords: [
    "MVP",
    "AI",
    "product studio",
    "rapid prototyping",
    "startup",
    "automation",
  ],
  ogImage: "https://www.alphapebble.io//images/og-image.jpg",
  links: {
    github: "https://github.com/alphapebble",
    linkedin: "https://linkedin.com/company/alphapebble",
    email: "mailto:hello@alphapebble.com",
    privacy: "privacy",
  },
  header: {
    nav: [
      { title: "What We Do", href: "/#capabilities" },
      { title: "How We Work", href: "/#timeline" },
      { title: "Experiments", href: "/projects" },
      { title: "Insights", href: "/blog" },
    ],
    cta: {
      title: "Let's Talk",
    },
  },
  hero: {
    title: "From Idea to MVP",
    description:
      "An AI-first micro-product studio for founders who move fast. We run small, smart experiments that become workflow MVPs and reusable outcomes.",
    cta: {
      primary: {
        title: "Start an Experiment",
      },
      secondary: {
        title: "See Our Capabilities",
        href: "/#capabilities",
      },
    },
  },
  footer: {
    cta: {
      title: "Book a 15-min Call",
      download: {
        title: "Download 1-Pager",
        href: "/alphapebble_one_pager.pdf",
      },
    },
    nav: [{ title: "Privacy", href: "/privacy" }],
  },
  bookingUrl: "https://calendly.com/your-username",
};
