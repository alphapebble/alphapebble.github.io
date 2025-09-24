import createMDX from '@next/mdx';
import { directives } from './csp.config.mjs';

const withMDX = createMDX({ extension: /\.mdx?$/ });

// Build a CSP header value from the directives object.
// If a directive has an empty array (e.g. upgrade-insecure-requests), emit just the key.
function buildCSP(d) {
  return Object.entries(d)
    .map(([k, vals]) => (Array.isArray(vals) && vals.length ? `${k} ${vals.join(' ')}` : k))
    .join('; ');
}
const csp = buildCSP(directives);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  async redirects() {
    return [
      { source: '/privacy-policy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms-of-service', destination: '/legal/terms-of-service', permanent: true },
    ];
  },

        async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Content-Security-Policy',
                value: [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://calendly.com https://static.cloudflareinsights.com",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: blob: https:",
                  "font-src 'self' data: https:",
                  "connect-src 'self' https://calendly.com https://*.calendly.com https://cloudflareinsights.com https://static.cloudflareinsights.com",
                  "frame-src https://calendly.com",
                  "frame-ancestors 'none'",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "upgrade-insecure-requests",
                ].join('; ')
              },
              { key: 'Cache-Control', value: 'no-store, max-age=0' },
              { key: 'X-XSS-Protection', value: '1; mode=block' },
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
              { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
              { key: 'X-Frame-Options', value: 'DENY' },
            ],
          },
          {
            source: '/api/(.*)',
            headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
          },
        ];
      },
      {
        // Stricter caching only for API routes if we need it:
        source: '/api/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store, max-age=0' }],
      },
    ];
  },
};

export default withMDX(nextConfig);
