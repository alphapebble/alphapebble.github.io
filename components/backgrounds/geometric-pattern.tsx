/**
 * Geometric Pattern Background
 * Adds subtle visual interest while maintaining calmness
 */

export function GeometricPattern() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="geometric-grid"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            {/* Subtle grid lines */}
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
            />
            {/* Small circles at intersections */}
            <circle cx="0" cy="0" r="1.5" fill="rgba(59, 130, 246, 0.4)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric-grid)" />
      </svg>
    </div>
  );
}

export function WavePattern() {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="wave-pattern"
            x="0"
            y="0"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 100 Q 50 80, 100 100 T 200 100"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
            />
            <path
              d="M 0 120 Q 50 100, 100 120 T 200 120"
              fill="none"
              stroke="rgba(103, 126, 234, 0.2)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wave-pattern)" />
      </svg>
    </div>
  );
}

export function ConcentricCircles() {
  return (
    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width="1200"
        height="1200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1">
          <circle cx="600" cy="600" r="100" />
          <circle cx="600" cy="600" r="200" />
          <circle cx="600" cy="600" r="300" />
          <circle cx="600" cy="600" r="400" />
          <circle cx="600" cy="600" r="500" />
        </g>
      </svg>
    </div>
  );
}
