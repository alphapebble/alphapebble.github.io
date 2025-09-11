"use client";

import { subscribeAction } from "@/app/actions";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ isSuccess }: { isSuccess: boolean }) {
  const { pending } = useFormStatus();

  let buttonText = "Subscribe to Lab Notes";
  if (pending) buttonText = "Subscribing...";
  if (isSuccess) buttonText = "Subscribed!";

  return (
    <button
      type="submit"
      disabled={pending || isSuccess}
      className="btn-primary w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-70"
    >
      {buttonText}
    </button>
  );
}
export function SubscribeForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (formData: FormData) => {
    const result = await subscribeAction(formData);
    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        formRef.current?.reset();
        setIsSuccess(false);
      }, 2000);
    } else if (result.error) {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <form ref={formRef} action={handleAction} className="space-y-4">
      <div className="absolute left-[-5000px]" aria-hidden="true">
        <input
          type="text"
          name="confirm_email"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="form-name" value="subscribe" />
      <div>
        <input
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          className="focus:border-primary focus:ring-primary w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          name="firstname"
          type="text"
          placeholder="First name"
          className="focus:border-primary focus:ring-primary w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm"
        />
        <input
          name="company"
          type="text"
          placeholder="Company"
          className="focus:border-primary focus:ring-primary w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm backdrop-blur-sm"
        />
      </div>
      <SubmitButton isSuccess={isSuccess} />
    </form>
  );
}
