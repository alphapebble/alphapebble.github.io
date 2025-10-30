import { NextResponse } from "next/server";

export async function GET() {
  const securityHeaders = {
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cal.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "media-src 'self'",
      "connect-src 'self' https://cal.com",
      "frame-src 'self' https://cal.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),

    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Embedder-Policy": "require-corp",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Resource-Policy": "same-origin",
  };

  return NextResponse.json({
    message: "Security headers configuration",
    headers: securityHeaders,
    recommendations: [
      "Implement Content Security Policy (CSP)",
      "Use HTTPS everywhere",
      "Set secure cookie flags",
      "Implement rate limiting",
      "Validate all user inputs",
      "Use CSRF protection for forms",
      "Keep dependencies updated",
      "Implement proper error handling",
    ],
  });
}
