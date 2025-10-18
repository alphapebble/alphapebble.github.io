"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useBookingModal } from "@/lib/modal-store";

export function ModalButton({ children, ...props }: ButtonProps) {
  const { openModal } = useBookingModal();
  return (
    <Button onClick={openModal} {...props} size="lg">
      {children}
    </Button>
  );
}
