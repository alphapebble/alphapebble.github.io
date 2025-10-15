// Web Vitals tracking
export function reportWebVitals(metric: any) {
  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
    
    // Send to console for now - replace with your analytics service
    console.log('Web Vital:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      rating: metric.rating,
      delta: metric.delta,
    });

    // Track metrics that exceed thresholds
    const thresholds = {
      FCP: 1800, // First Contentful Paint
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1,  // Cumulative Layout Shift
      TTFB: 800, // Time to First Byte
    };

    const threshold = thresholds[metric.name as keyof typeof thresholds];
    if (threshold && metric.value > threshold) {
      console.warn(`⚠️ Poor ${metric.name}: ${metric.value} (threshold: ${threshold})`);
    }
  }
}

// Performance monitoring
export function trackPerformance(name: string, duration: number) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    console.log(`Performance: ${name} took ${duration}ms`);
  }
}

// Error tracking
export function trackError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service like Sentry
    console.error('Tracked error:', error, context);
  }
}

// User interaction tracking
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    console.log(`Event: ${eventName}`, properties);
  }
}

// Page view tracking
export function trackPageView(url: string) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    console.log(`Page view: ${url}`);
  }
}
