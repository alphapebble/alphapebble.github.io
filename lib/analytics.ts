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
    
    console.log('Web Vital:', metric);
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
