import createMDX from '@next/mdx';
import { directives } from './csp.config.js';

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
          { key: 'Content-Security-Policy', value: csp },
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
