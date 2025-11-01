"use client";
import { siteConfig } from "@/app/site.config";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/lib/modal-store";
import { useState } from "react";

export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [isLoading, setIsLoading] = useState(true);
  if (!isOpen) return null;

  return (
    <div
      className="bg-bg/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
      role="dialog"
    >
      <div className="relative h-[90vh] w-[90vw] max-w-7xl overflow-hidden rounded-lg shadow-lg">
        <div className="flex items-center justify-between border-b p-3">
          <h2 className="text-xl font-semibold">Schedule a Meeting</h2>
          <Button
            onClick={closeModal}
            aria-label="Close scheduling modal"
            size="none"
            variant="modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
    </div>
  );
}
