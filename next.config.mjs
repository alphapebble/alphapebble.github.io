import createMDX from '@next/mdx';
import { directives } from "./csp.config.mjs";

const withMDX = createMDX({ extension: /\.mdx?$/ });

function buildCSP(d) {
  return Object.entries(d).map(([k, vals]) => `${k} ${vals.join(' ')}`).join('; ');
}
const csp = buildCSP(directives);

const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [          
          { key: 'Content-Security-Policy', 
                  value: [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://calendly.com https://static.cloudflareinsights.com",
                  "script-src-elem 'self' https://calendly.com https://static.cloudflareinsights.com",
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
          { key: 'X-Frame-Options', value: 'DENY' }
        ]
      }
    ];
  }
};

export default withMDX(nextConfig);
