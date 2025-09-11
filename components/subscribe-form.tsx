"use client";

import { subscribeAction } from "@/app/actions";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

function SubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const { pending } = useFormStatus();

  let buttonText = "Subscribe to Lab Notes";
  if (pending) buttonText = "Subscribing...";
  if (isSuccess) buttonText = "Subscribed!";

  return (
    <Button type="submit" disabled={pending || isSuccess} size="full">
      {buttonText}
    </Button>
  );
}
export function SubscribeForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    setError(null);
    const result = await subscribeAction(formData);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        formRef.current?.reset();
        setIsSuccess(false);
      }, 3000);
    } else if (result.error) {
      setError(result.error);
    }
  };

  return (
    <form
      ref={formRef}
      action={handleAction}
      className="space-y-4"
      aria-label="Newsletter subscription form"
      noValidate
    >
      {/* Honeypot field */}
      <div className="absolute left-[-5000px]" aria-hidden="true">
        <input
          type="text"
          name="confirm_email"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <input type="hidden" name="form-name" value="subscribe" />

      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Success message */}
      {isSuccess && (
        <div
          role="alert"
          className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400"
          aria-live="polite"
        >
          ✓ Successfully subscribed! Thank you for joining our newsletter.
        </div>
      )}

      <div>
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          aria-required="true"
          aria-describedby="email-error"
          className="enhanced-input focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-colors focus:ring-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstname" className="sr-only">
            First name
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="First name"
            className="enhanced-input focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-colors focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="company" className="sr-only">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company"
            className="enhanced-input focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm transition-colors focus:ring-2"
          />
        </div>
      </div>

      <SubmitButton isSuccess={isSuccess} />
    </form>
  );
}
