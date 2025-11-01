import pwa from "@ducanh2912/next-pwa";
import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";

// Content Security Policy (CSP)
const directives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "https://cal.com",
    "https://static.cloudflareinsights.com",
  ],
  "script-src-elem": [
    "'self'",
    "'unsafe-inline'",
    "https://cal.com",
    "https://static.cloudflareinsights.com",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "style-src-elem": ["'self'", "'unsafe-inline'"],
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
const csp = Object.entries(directives)
  .map(([key, value]) => `${key} ${value.join(" ")}`)
  .join("; ");

// Plugin Initializations

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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
    document: "/offline.html",
  },
});

// Next.js Config
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "static.cloudflareinsights.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
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
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Cache-Control",
            value: "private, no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default withPWA(withMDX(withBundleAnalyzer(nextConfig)));
