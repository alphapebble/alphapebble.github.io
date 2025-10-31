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
      artifact: {
        label: string;
        description: string;
      };
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
    lanes: {
      name: string;
      summary: string;
      engagement: string;
      deliverables: string[];
      outcome: string;
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
  blog_page: {
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
  ogImage: "https://www.alphapebble.io//images/og-image.jpg",
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
        { title: "Insights", href: "/blog" },
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
        artifact: {
          label: "Experiment Brief",
          description:
            "Decision readout with prioritized risks, success metrics, and experiment backlog.",
        },
      },
      {
        period: "DAYS 31—60",
        title: "Workflow MVP Live",
        description:
          "A thin slice of your product is live and in front of real users, generating feedback.",
        aos: "slide-up",
        artifact: {
          label: "Live MVP + Insight Pack",
          description:
            "Hosted workflow, usage analytics, and qualitative insights from real users.",
        },
      },
      {
        period: "DAYS 61—90",
        title: "Harden & Handoff",
        description:
          "The MVP is optimized for run-cost and security, with clean documentation for your team to take over.",
        aos: "slide-left",
        artifact: {
          label: "Production Readiness Kit",
          description:
            "Playbooks, run-cost model, SOC2-ready checklist, and handover training.",
        },
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
    lanes: [
      {
        name: "Strategy Sprint",
        summary:
          "De-risk the problem space, align stakeholders, and surface the fastest path to value.",
        engagement: "2-week diagnostic",
        deliverables: [
          "AI opportunity map & ROI model",
          "Decision brief for leadership",
          "Prioritized experiment backlog",
        ],
        outcome:
          "Clarity on where to place the next bet and how to measure success.",
      },
      {
        name: "Build & Validate",
        summary:
          "Ship a workflow MVP that proves the value with real users—not slideware.",
        engagement: "30–45 day build sprint",
        deliverables: [
          "Thin-slice workflow MVP",
          "User testing loop & insight pack",
          "Ops & automation playbook",
        ],
        outcome:
          "Live product delivering measurable impact within weeks.",
      },
      {
        name: "Scale & Harden",
        summary:
          "Operationalize, de-risk, and hand off a production-ready system to your team.",
        engagement: "30 day hardening sprint",
        deliverables: [
          "Run-cost optimization & monitoring",
          "Security posture & compliance checklist",
          "Training + handover documentation",
        ],
        outcome:
          "Ready-to-scale product with safeguards, documentation, and team adoption.",
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
  blog_page: {
    titleFirst: "Notes From the",
    titleSecond: "Lab",
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
