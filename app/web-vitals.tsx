"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Web Vitals Tracker
 * Automatically captures and reports core web vitals.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Web Vital:", metric);
    } else if (process.env.NODE_ENV === "production") {
      reportWebVitals(metric);
    }
  });

  return null;
}

/**
 * Handles reporting of web vitals metrics.
 * Extend this function to integrate with your analytics service.
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV !== "production") return;

  // Example: Log to console or send to analytics service
  console.log("Web Vital:", {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    rating: metric.rating,
    delta: metric.delta,
  });

  // Thresholds for performance classification
  const thresholds = {
    FCP: 1800, // First Contentful Paint
    LCP: 2500, // Largest Contentful Paint
    FID: 100, // First Input Delay
    CLS: 0.1, // Cumulative Layout Shift
    TTFB: 800, // Time to First Byte
  };

  const threshold = thresholds[metric.name as keyof typeof thresholds];
  if (threshold && metric.value > threshold) {
    console.warn(
      `⚠️ Poor ${metric.name}: ${metric.value} (threshold: ${threshold})`
    );
  }

  // Example: Send to analytics endpoint or GA
  // fetch('/api/analytics/web-vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
}

/**
 * Track custom performance measurements
 */
export function trackPerformance(name: string, duration: number) {
  if (process.env.NODE_ENV !== "production") return;
  console.log(`Performance: ${name} took ${duration}ms`);

  // Example: send to analytics endpoint
  // fetch('/api/analytics/performance', { method: 'POST', body: JSON.stringify({ name, duration }) });
}

/**
 * Track application errors
 */
export function trackError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV !== "production") return;
  console.error("Tracked error:", error, context);

  // Example: send to Sentry or your backend
  // Sentry.captureException(error, { extra: context });
}

/**
 * Track custom user interactions
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (process.env.NODE_ENV !== "production") return;
  console.log(`Event: ${eventName}`, properties);

  // Example: send to analytics
  // fetch('/api/analytics/event', { method: 'POST', body: JSON.stringify({ eventName, ...properties }) });
}

/**
 * Track page views (for route changes, etc.)
 */
export function trackPageView(url: string) {
  if (process.env.NODE_ENV !== "production") return;
  console.log(`Page view: ${url}`);

  // Example: send to analytics
  // fetch('/api/analytics/pageview', { method: 'POST', body: JSON.stringify({ url }) });
}
