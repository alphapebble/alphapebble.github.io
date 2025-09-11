"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function FloatingAstronaut() {
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      className="drop-shadow-2xl"
      data-aos="zoom-in"
    >
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop
            offset="0%"
            style={{ stopColor: "rgba(59, 130, 246, 0.2)", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "rgba(59, 130, 246, 0)", stopOpacity: 1 }}
          />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="100" fill="url(#grad1)" />

      {/* Astronaut Body */}
      <rect x="80" y="90" width="40" height="50" rx="20" fill="#F6F6F7" />

      {/* Helmet */}
      <circle cx="100" cy="80" r="30" fill="#F6F6F7" />
      <circle cx="100" cy="80" r="25" fill="#0B1220" />
      <rect
        x="110"
        y="75"
        width="5"
        height="10"
        rx="2.5"
        fill="#3B82F6"
        transform="rotate(15 110 75)"
      />

      {/* Backpack */}
      <rect x="70" y="100" width="60" height="30" rx="10" fill="#9AA3B2" />

      {/* Limbs */}
      <rect x="60" y="105" width="20" height="10" rx="5" fill="#F6F6F7" />
      <rect x="120" y="105" width="20" height="10" rx="5" fill="#F6F6F7" />
      <rect x="85" y="140" width="10" height="20" rx="5" fill="#F6F6F7" />
      <rect x="105" y="140" width="10" height="20" rx="5" fill="#F6F6F7" />
    </svg>
  );
}

export default function NotFound() {
  const astronautRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveAstronaut = () => {
      const container = astronautRef.current?.parentElement;
      const contentBox = contentRef.current?.getBoundingClientRect();
      const containerBox = container?.getBoundingClientRect();

      if (!containerBox || !contentBox) return;
      let x, y;
      do {
        x =
          Math.floor(Math.random() * (containerBox.width - 200)) -
          (containerBox.width / 2 - 100);
        y =
          Math.floor(Math.random() * (containerBox.height - 200)) -
          (containerBox.height / 2 - 100);
      } while (
        x + containerBox.width / 2 > contentBox.left - 100 &&
        x + containerBox.width / 2 < contentBox.right + 100 &&
        y + containerBox.height / 2 > contentBox.top - 100 &&
        y + containerBox.height / 2 < contentBox.bottom + 100
      );

      setPosition({ x, y });
    };

    const interval = setInterval(moveAstronaut, 3000);
    moveAstronaut();

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5">
      <div
        ref={astronautRef}
        className="absolute transition-all duration-2000 ease-in-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        data-aos="fade-up"
      >
        <FloatingAstronaut />
      </div>

      <div ref={contentRef} className="relative z-10 text-center">
        <h1
          className="gtext text-6xl font-extrabold md:text-9xl"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          404
        </h1>

        <p
          className="mt-4 text-2xl font-semibold text-white"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Lost in Space?
        </p>

        <p
          className="text-muted mt-2 text-lg"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          The page you are looking for does not exist or has been moved.
        </p>

        <div className="mt-10" data-aos="fade-up" data-aos-delay="400">
          <Link href="/">
            <button
              className="btn-primary rounded-full px-8 py-3 font-semibold"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              Go Back Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
