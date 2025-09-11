"use client";

import { useBookingModal } from "@/lib/modal-store";
import { siteConfig } from "@/site.config";

export function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();

  if (!isOpen) return null;

  return (
    <div
      className="bg-bg/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
      onClick={closeModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Hidden heading for accessibility */}
        <h2 id="modal-title" className="sr-only">
          Schedule a Meeting
        </h2>

        {/* Iframe for scheduling */}
        <iframe
          src={siteConfig.bookingUrl}
          title="Schedule a meeting"
          className="h-full w-full rounded-lg border-0"
        ></iframe>

        {/* Loading fallback */}
        <p className="text-muted absolute inset-0 flex items-center justify-center">
          Loading scheduling interface...
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={closeModal}
        aria-label="Close modal"
        className="hover:text-primary absolute top-4 right-4 text-white"
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
      </button>
    </div>
  );
}
