"use client";

import { useBookingModal } from "@/lib/modal-store";
import { Button, ButtonProps } from "./button";

export function ModalButton({ children, ...props }: ButtonProps) {
  const { openModal } = useBookingModal();
  return (
    <Button onClick={openModal} {...props} size="lg">
      {children}
    </Button>
  );
}
