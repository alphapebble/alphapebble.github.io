export type SiteConfig = {
  name: string;
  title: string;
  description: string;
  seoDescription?: string;
  seoKeywords?: string[];
  url: string;
  author: string;
  foundingDate?: string;
  keywords: string[];
  ogImage: string;
  twitterHandle?: string;
  address?: { country?: string };
  links: {
    github: string;
    linkedin: string;
    email: string;
    privacy: string;
    terms: string;
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
    titleFirst: string;
    titleSecond: string;
    description: string;
    features: string[];
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
  why: {
    icon: string;
    title: string;
    description: string;
    edges: {
      icon: string;
      text: string;
    }[];
  };
  timeline: {
    icon: string;
    title: string;
    description: string;
    timeline: {
      period: string;
      title: string;
      description: string;
      aos: string;
    }[];
  };
  insights: {
    icon: string;
    title: string;
    description: string;
  };
  case_studies: {
    icon: string;
    title: string;
    description: string;
  };
  capabilities: {
    icon: string;
    title: string;
    description: string;
    capabilities: {
      title: string;
      description: string;
    }[];
  };
  footer: {
    titleFirst: string;
    titleSecond: string;
    description: string;
    cta: {
      title: string;
      download: {
        title: string;
        href: string;
      };
    };
    newsletter: {
      title: string;
      description: string;
      benefits: string[];
    };
    nav: {
      title: string;
      href: string;
    }[];
  };
  bookingUrl: string;
  research_page: {
    titleFirst: string;
    titleSecond: string;
    description: string;
  };
  projects_page: {
    titleFirst: string;
    titleSecond: string;
    description: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "AlphaPebble",
  title: "AlphaPebble - From Idea to MVP | AI-First Product Studio",
  description:
    "An AI-first micro-product studio for founders who move fast. We run small, smart experiments that become workflow MVPs in 30-60-90 days.",
  seoDescription:
    "AI-first micro-product studio for rapid MVP development, prototyping, and workflow automation for startups.",
  seoKeywords: [
    "MVP development",
    "AI prototyping",
    "startup automation",
    "rapid product studio",
  ],
  url: "https://www.alphapebble.io/",
  author: "AlphaPebble",
  foundingDate: "2025",
  keywords: [
    "MVP",
    "AI",
    "product studio",
    "rapid prototyping",
    "startup",
    "automation",
  ],
  ogImage: "https://www.alphapebble.io/images/og-image.jpg",
  twitterHandle: "@AlphaPebbleLab",
  address: { country: "India" },
  links: {
    github: "https://github.com/alphapebble",
    linkedin: "https://linkedin.com/company/alphapebble",
    email: "mailto:labs@alphapebble.io",
    privacy: "/privacy-policy",
    terms: "/terms-of-service",
  },
  header: {
    nav: [
      { title: "What We Do", href: "/#capabilities" },
      { title: "How We Work", href: "/#timeline" },
      { title: "Guiding Principles", href: "/guiding-principles" },
      { title: "Experiments", href: "/projects" },
      { title: "Insights", href: "/research" },
    ],
    cta: {
      title: "Let's Talk",
    },
  },
  hero: {
    titleFirst: "From Idea to",
    titleSecond: "MVP",
    description:
      "An AI-first micro-product studio for founders who move fast. We run small, smart experiments that become workflow MVPs and reusable outcomes.",
    features: [
      "Rapid Prototyping",
      "AI-First Experiments",
      "Workflow Automation",
    ],
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
  why: {
    icon: "🚀",
    title: "Your Experimental Edge.",
    description:
      "Everything we do is designed to reduce your time to insight and deliver a reusable outcome you can scale.",
    edges: [
      {
        icon: "🤝",
        text: "Built by founders — <br /> not career consultants.",
      },
      {
        icon: "🌪️",
        text: "Thrives in ambiguity — <br /> with a bias to ship.",
      },
      {
        icon: "💥",
        text: "Embedded partnership — <br /> we ship with your team.",
      },
      {
        icon: "📈",
        text: "Results over decks — <br /> tangible outcomes, not slideware.",
      },
    ],
  },
  timeline: {
    icon: "📅",
    title: "The 30—60—90 Promise.",
    description:
      "A clear timeline for tangible results. No ambiguity, just progress.",
    timeline: [
      {
        period: "DAYS 1—30",
        title: "De-risk & Decide",
        description:
          "Launch experiments that provide data-backed answers to your riskiest assumptions.",
        aos: "slide-right",
      },
      {
        period: "DAYS 31—60",
        title: "Workflow MVP Live",
        description:
          "A thin slice of your product is live and in front of real users, generating feedback.",
        aos: "slide-up",
      },
      {
        period: "DAYS 61—90",
        title: "Harden & Handoff",
        description:
          "The MVP is optimized for run-cost and security, with clean documentation for your team to take over.",
        aos: "slide-left",
      },
    ],
  },
  insights: {
    icon: "🔬",
    title: "Notes From the Lab.",
    description:
      "Our thoughts on building, validating, and shipping effectively.",
  },
  case_studies: {
    icon: "📈",
    title: "Real Results, Rapidly.",
    description:
      "Our experiments deliver tangible outcomes. Here's a look at how we approach different challenges.",
  },
  capabilities: {
    icon: "✨",
    title: "We Don't Offer Services. We Build Possibilities.",
    description:
      "Everything we do is designed to reduce your time to insight and deliver a reusable outcome you can scale.",
    capabilities: [
      {
        title: "🧪 MVP Experiments",
        description:
          "Clickable prototypes in days, not months. We help you validate core assumptions before you invest significant capital.",
      },
      {
        title: "⚡ Workflow MVPs",
        description:
          "Thin-slice prototypes that actually do the work—powered by code, automation, or AI to handle real tasks for real users.",
      },
      {
        title: "📊 Product & Tech Due Diligence",
        description:
          "A one-week teardown for investors or acquirers: product, code, infra, scalability, and risks—delivered with a clear scorecard.",
      },
      {
        title: "🔧 Growth-Stage Support",
        description:
          "For when you have traction. We help you optimize run-costs, improve security posture, and prepare for audits like SOC 2.",
      },
    ],
  },
  footer: {
    titleFirst: "",
    titleSecond: "Maximum Breakthroughs.",
    description:
      "Ready to run your first experiment? Let's turn your biggest assumption into your most valuable asset. We're ready when you are.",
    cta: {
      title: "Book a 15-min Call",
      download: {
        title: "Download 1-Pager",
        href: "/alphapebble_one_pager.pdf",
      },
    },
    newsletter: {
      title: "Stay in the Loop",
      description:
        "Get practical insights on rapid prototyping, AI experiments, and workflow automation delivered to your inbox. No fluff, just actionable takeaways.",
      benefits: ["✓ Weekly insights", "✓ No spam", "✓ Unsubscribe anytime"],
    },
    nav: [
      { title: "Email", href: "mailto:labs@alphapebble.io" },
      { title: "LinkedIn", href: "https://linkedin.com/company/alphapebble" },
      { title: "GitHub", href: "https://github.com/alphapebble" },
      { title: "Privacy", href: "/privacy-policy" },
      { title: "Terms", href: "/terms-of-service" },
    ],
  },
  bookingUrl: "https://cal.com/alphapebble/15min",
  research_page: {
    titleFirst: "Notes From",
    titleSecond: "the Lab",
    description:
      "Our thoughts on building, validating, and shipping effectively. No fluff, just actionable takeaways.",
  },
  projects_page: {
    titleFirst: "Our",
    titleSecond: "Work",
    description:
      "Our experiments deliver tangible outcomes. Here's a look at how we approach different challenges.",
  },
};
