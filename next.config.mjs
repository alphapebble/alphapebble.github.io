// next.config.mjs
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

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
    const base = [
      { key: 'Cache-Control', value: 'no-store, max-age=0' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'X-Frame-Options', value: 'DENY' },
    ];
    return [
      { source: '/(.*)', headers: base },
      { source: '/api/(.*)', headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }] },
    ];
  },
};

export default withMDX(nextConfig);
