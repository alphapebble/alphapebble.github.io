"use client";

import { siteConfig } from "@/app/site.config";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/lib/modal-store";
import React, { useState } from "react";

export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="bg-bg/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="relative h-[90vh] w-[90vw] max-w-4xl overflow-hidden rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="sr-only">
          Schedule a Meeting
        </h2>
        <p id="modal-description" className="sr-only">
          Use this calendar interface to schedule a meeting with our team.
        </p>

        <iframe
          src={siteConfig.bookingUrl}
          title="Schedule a meeting with AlphaPebble team"
          className="h-full w-full rounded-lg border-0"
          onLoad={() => setIsLoading(false)}
          loading="lazy"
        ></iframe>

        {isLoading && (
          <div
            className="text-muted bg-bg/70 absolute inset-0 flex items-center justify-center"
            role="status"
            aria-live="polite"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-2"></div>
              <p>Loading scheduling interface...</p>
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={closeModal}
        aria-label="Close scheduling modal"
        size="none"
        variant="modal"
        className="absolute top-4 right-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
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
