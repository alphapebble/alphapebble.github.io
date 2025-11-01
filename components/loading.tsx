interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export function Loading({ size = "md", text, className = "" }: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div
        className={`border-primary/20 border-t-primary animate-spin rounded-full border-2 ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-muted animate-pulse text-sm">{text}</p>}
      <span>Loading...</span>
    </div>
  );
}

export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-primary/10 mb-2 h-4 rounded"></div>
      <div className="bg-primary/10 mb-2 h-4 w-3/4 rounded"></div>
      <div className="bg-primary/10 h-4 w-1/2 rounded"></div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="glass animate-pulse rounded-xl p-6">
      <div className="bg-primary/10 mb-4 h-48 rounded-lg"></div>
      <div className="bg-primary/10 mb-2 h-6 rounded"></div>
      <div className="bg-primary/10 mb-2 h-4 w-3/4 rounded"></div>
      <div className="bg-primary/10 h-4 w-1/2 rounded"></div>
    </div>
  );
}
