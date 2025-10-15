// csp.config.mjs
export const directives = {
  "default-src": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://calendly.com",
    "https://static.cloudflareinsights.com"
  ],
  "script-src-elem": [
    "'self'",
    "'unsafe-inline'",
    "https://calendly.com",
    "https://static.cloudflareinsights.com"
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "style-src-elem": ["'self'", "'unsafe-inline'"],         // NEW
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:", "https:"],
  "connect-src": [
    "'self'",
    "https://calendly.com",
    "https://*.calendly.com",
    "https://static.cloudflareinsights.com",
    "https://cloudflareinsights.com",
    "https://*.cloudflareinsights.com"                     // NEW
  ],
  "frame-src": ["https://calendly.com"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "worker-src": ["'self'", "blob:"],                       // NEW
  "upgrade-insecure-requests": []
};
