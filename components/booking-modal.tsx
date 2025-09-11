"use client";

import { useBookingModal } from "@/lib/modal-store";
import { siteConfig } from "@/site.config";
import { useState } from "react";
import { Button } from "./ui/button";

export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="bg-bg/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
      onClick={closeModal}
    >
      <div
        className="relative h-[80vh] w-[90vw] max-w-4xl overflow-hidden rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden heading for accessibility */}
        <h2 id="modal-title" className="sr-only">
          Schedule a Meeting
        </h2>

        {/* Iframe for scheduling */}
        <iframe
          src={siteConfig.bookingUrl}
          title="Schedule a meeting"
          className="h-full w-full rounded-lg border-0"
          onLoad={() => setIsLoading(false)}
        ></iframe>

        {/* Loading fallback */}
        {isLoading && (
          <p className="text-muted bg-bg/70 absolute inset-0 flex items-center justify-center">
            Loading scheduling interface...
          </p>
        )}
      </div>

      {/* Close button */}
      <Button
        onClick={closeModal}
        aria-label="Close modal"
        size="none"
        variant="modal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
}
