// next.config.mjs
import pwa from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

// --- Content Security Policy (CSP) ---
const directives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://cal.com",
    "https://static.cloudflareinsights.com",
  ],
  "script-src-elem": [
    "'self'",
    "'unsafe-inline'",
    "https://cal.com",
    "https://static.cloudflareinsights.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  "style-src-elem": [
    "'self'",
    "'unsafe-inline'",
    "https://fonts.googleapis.com",
  ],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:", "https:", "https://fonts.gstatic.com"],
  "connect-src": [
    "'self'",
    "https://cal.com",
    "https://*.cal.com",
    "https://static.cloudflareinsights.com",
    "https://cloudflareinsights.com",
    "https://*.cloudflareinsights.com",
  ],
  "frame-src": ["https://cal.com"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "worker-src": ["'self'", "blob:"],
  "upgrade-insecure-requests": [],
};

// Generate CSP header string
const csp = Object.entries(directives)
  .map(([directive, sources]) =>
    sources.length ? `${directive} ${sources.join(" ")}` : directive
  )
  .join("; ");

// Bundle Analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// MDX Support
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

// Initialize the PWA plugin
const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: {
    document: "/offline",
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  compress: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.cloudflareinsights.com" },
    ],
  },

  outputFileTracingIncludes: {
    "/**/*": [
      "./node_modules/@next/env/**",
      "./node_modules/@swc/helpers/**",
      "./node_modules/client-only/**",
      "./node_modules/scheduler/**",
      "./node_modules/styled-jsx/**",
      "./node_modules/tslib/**",
    ],
  },

  webpack(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      sharp: false,
      "next/dist/compiled/sharp": false,
    };
    return config;
  },

  async headers() {
    const securityHeaders = [
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=31536000; includeSubDomains",
      },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Content-Security-Policy", value: csp },
    ];

    return [
      {
        source: "/images/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(_next/static|favicon|manifest|robots)/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/((?!api/).*)",
        headers: [
          ...securityHeaders,
          { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          ...securityHeaders,
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withMDX(withPWA(nextConfig)));
