import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      primary:
        "cursor-pointer btn-primary interactive-hover rounded-full font-semibold",
      ghost:
        "cursor-pointer btn-ghost interactive-hover text-muted rounded-full",
      modal:
        "cursor-pointer hover:text-primary absolute top-4 right-4 text-ink",
    },
    size: {
      default: "px-5 py-2 text-sm",
      lg: "px-7 py-3",
      full: "w-full py-3",
      icon: "p-2",
      none: "",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
