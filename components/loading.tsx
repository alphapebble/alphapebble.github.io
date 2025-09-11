interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({ size = "md", text, className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-primary/20 border-t-primary ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className="text-sm text-muted animate-pulse">{text}</p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-white/10 rounded mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-1/2"></div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="glass rounded-xl p-6 animate-pulse">
      <div className="h-48 bg-white/10 rounded-lg mb-4"></div>
      <div className="h-6 bg-white/10 rounded mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-white/10 rounded w-1/2"></div>
    </div>
  );
}
