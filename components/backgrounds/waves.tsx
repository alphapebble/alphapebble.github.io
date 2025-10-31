/**
 * Animated Wave Background Components
 * Add calm, flowing motion to any section
 */

export function FlowingWaves() {
  return (
    <div className="flowing-waves" aria-hidden="true">
      <svg
        className="wave-layer-1"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"
          fill="rgba(59, 130, 246, 0.08)"
        />
      </svg>
      <svg
        className="wave-layer-2"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,120 C240,70 480,170 720,120 C960,70 1200,170 1440,120 L1440,200 L0,200 Z"
          fill="rgba(103, 126, 234, 0.06)"
        />
      </svg>
      <svg
        className="wave-layer-3"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,140 C360,90 720,190 1080,140 C1200,120 1320,160 1440,140 L1440,200 L0,200 Z"
          fill="rgba(59, 130, 246, 0.05)"
        />
      </svg>
    </div>
  );
}

export function TopWaves() {
  return (
    <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none rotate-180 opacity-10" aria-hidden="true">
      <svg
        className="wave-layer-1"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"
          fill="rgba(59, 130, 246, 0.1)"
        />
      </svg>
    </div>
  );
}

export function WavePattern() {
  return <div className="wave-pattern" aria-hidden="true" />;
}

export function WaveDivider({ position = "bottom" }: { position?: "top" | "bottom" }) {
  const isTop = position === "top";
  
  return (
    <div 
      className={`absolute ${isTop ? 'top-0 rotate-180' : 'bottom-0'} left-0 w-full overflow-hidden pointer-events-none z-0`}
      style={{ height: '150px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,160 C320,100 420,300 740,220 C1060,140 1120,200 1440,160 L1440,320 L0,320 Z"
          fill="rgba(59, 130, 246, 0.03)"
        />
      </svg>
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-full absolute bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'wave-flow 20s ease-in-out infinite' }}
      >
        <path
          d="M0,192 C240,128 480,256 720,192 C960,128 1200,256 1440,192 L1440,320 L0,320 Z"
          fill="rgba(103, 126, 234, 0.04)"
        />
      </svg>
    </div>
  );
}
