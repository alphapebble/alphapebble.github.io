// next.config.mjs
import createMDX from '@next/mdx';

// If you use MDX, keep this. Otherwise you can drop @next/mdx entirely.
const withMDX = createMDX({
  extension: /\.mdx?$/,
  // remarkPlugins: [], rehypePlugins: []  // add if needed
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for OpenNext Cloudflare bundler
  output: 'standalone',

  // If you author MDX pages, let Next pick them up
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },

  async redirects() {
    return [
      { source: '/projects.html', destination: '/projects', permanent: true },
      { source: '/blogs.html', destination: '/blog', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  compress: true,
  poweredByHeader: false,
};

export default withMDX(nextConfig);
