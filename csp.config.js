export const directives = {
  "default-src": ["'self'"],

  // scripts
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    "https://calendly.com",
    "https://static.cloudflareinsights.com"
  ],
  // some browsers apply -elem separately; mirror the allow-list
  "script-src-elem": [
    "'self'",
    "https://calendly.com",
    "https://static.cloudflareinsights.com"
  ],

  // styles/images/fonts/etc.
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", "https:"],
  "font-src": ["'self'", "data:", "https:"],

  // network calls the beacon makes
  "connect-src": [
    "'self'",
    "https://calendly.com",
    "https://*.calendly.com",
    "https://static.cloudflareinsights.com",
    "https://cloudflareinsights.com"
  ],

  "frame-src": ["https://calendly.com"],
  "frame-ancestors": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'"],
  "upgrade-insecure-requests": []
};
