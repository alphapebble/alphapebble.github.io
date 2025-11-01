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
    badge: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
  };
  projects_page: {
    badge: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
  };
  guiding_principles_page: {
    badge: string;
    titleFirst: string;
    titleSecond: string;
    description: string;
    principles: {
      icon: string;
      title: string;
      description: string;
    }[];
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
    privacy: "/legal/privacy-policy",
    terms: "/legal/terms-of-service",
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
      },
      {
        period: "DAYS 31—60",
        title: "Workflow MVP Live",
        description:
          "A thin slice of your product is live and in front of real users, generating feedback.",
      },
      {
        period: "DAYS 61—90",
        title: "Harden & Handoff",
        description:
          "The MVP is optimized for run-cost and security, with clean documentation for your team to take over.",
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
      { title: "Privacy", href: "/legal/privacy-policy" },
      { title: "Terms", href: "/legal/terms-of-service" },
    ],
  },
  bookingUrl: "https://cal.com/alphapebble/15min",
  research_page: {
    badge: "Inside the Lab",
    titleFirst: "Notes From",
    titleSecond: "the Lab",
    description:
      "Explore insights from our hands-on research. We share proven playbooks for AI strategy, data-powered MVPs, and applied data science.",
  },
  projects_page: {
    badge: "Our Philosophy",
    titleFirst: "Our",
    titleSecond: "Work",
    description:
      "We transform complex challenges into measurable results. Discover how we deliver high-impact AI and data-driven solutions that create real value.",
  },
  guiding_principles_page: {
    badge: "Our Core Values",
    titleFirst: "Guiding",
    titleSecond: "Principles",
    description:
      "Our north star. The core principles that define how we build, collaborate, and innovate — shaping our work, partnerships, and products..",
    principles: [
      {
        icon: "🎯",
        title: "Measurable Impact, Fast",
        description:
          "We validate AI use cases in 2-4 weeks through pilot-first execution, ensuring ROI-driven results with clear cost savings and efficiency gains before full-scale deployment.",
      },
      {
        icon: "💡",
        title: "Pragmatic Innovation Over Science Projects",
        description:
          "We solve real-world business problems with the simplest, most effective technology. Our success is measured by your ROI and tangible value, not technical novelty or R&D budgets.",
      },
      {
        icon: "🚀",
        title: "Ship Fast, Learn Faster",
        description:
          "We prioritize shipping a 'thin slice' of value quickly to get real-world feedback. This agile, iterative approach de-risks development and ensures the final product aligns perfectly with user needs.",
      },
      {
        icon: "🧩",
        title: "Customized Fit for Your Needs",
        description:
          "From proven AI solutions to cutting-edge innovations, we provide best-in-class expertise in LLMs, AI agents, and automation that seamlessly integrates into your workflows with minimal disruption.",
      },
      {
        icon: "🔥",
        title: "Flexibility Without Compromise",
        description:
          "Choose advisory, full implementation, or ongoing support with tailored pricing models. We balance budget, risk, and speed while maintaining quality—adapting to your unique business needs.",
      },
      {
        icon: "🤝",
        title: "Co-Pilot, Not Autopilot",
        description:
          "We build tools that augment your team, not replace them. Our solutions empower your domain experts, enhance their judgment, and create collaborative human-in-the-loop systems that outperform pure automation.",
      },
      {
        icon: "🔑",
        title: "Build for Independence",
        description:
          "Our goal is to make ourselves obsolete. We deliver robust, maintainable systems with comprehensive documentation and training, enabling your team to own, operate, and extend solutions long-term.",
      },
      {
        icon: "🛡️",
        title: "Your Data, Your Asset",
        description:
          "We operate with radical transparency. Your data, models, and IP remain entirely yours. We provide expertise to unlock value, but you retain complete ownership and control—always.",
      },
      {
        icon: "📈",
        title: "Value-Driven Partnership",
        description:
          "We align our success with yours. If a solution doesn't create tangible value, we don't build it. We're transparent about our capabilities and limitations, ensuring we're the right fit—and not afraid to say no.",
      },
    ],
  },
};
