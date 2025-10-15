// next.config.mjs
import createMDX from '@next/mdx';
import { directives } from './csp.config.mjs';

// Bundle analyzer
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

// Generate CSP header value
const csp = Object.entries(directives)
  .map(([directive, sources]) => {
    if (sources.length === 0) return directive;
    return `${directive} ${sources.join(' ')}`;
  })
  .join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  compress: true,

  // Disable Next image optimization to avoid sharp on workers
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.cloudflareinsights.com' },
    ],
  },

  // NOTE: in Next 15 this lives at the TOP LEVEL (not under "experimental")
  outputFileTracingIncludes: {
    '/**/*': [
      './node_modules/@next/env/**',
      './node_modules/@swc/helpers/**',
      './node_modules/client-only/**',
      './node_modules/scheduler/**',
      './node_modules/styled-jsx/**',
      './node_modules/tslib/**',
    ],
  },

  // ESM-safe: no "require" here
  webpack(config) {
    // Hard-disable sharp so it won't be bundled/loaded on the worker
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      sharp: false,
      'next/dist/compiled/sharp': false,
    };
    return config;
  },

  async headers() {
    const securityHeaders = [
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: csp },
    ];
    
    return [
      // Static assets with long cache
      {
        source: '/images/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Static files
      {
        source: '/(_next/static|favicon|manifest|robots)/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // HTML pages with short cache
      {
        source: '/((?!api/).*)',
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'public, max-age=300, s-maxage=3600' },
        ],
      },
      // API routes - no cache
      { 
        source: '/api/(.*)', 
        headers: [
          ...securityHeaders,
          { key: 'Cache-Control', value: 'no-store, max-age=0' }
        ] 
      },
    ];
  },
};

export default withBundleAnalyzer(withMDX(nextConfig));
