"use client";

import {
  AnimationName,
  animationVariants,
  defaultViewport,
} from "@/lib/animation";
import {
  motion,
  MotionProps,
  useInView,
  UseInViewOptions,
  Variants,
} from "framer-motion";
import { useRef } from "react";

interface AnimateOnViewProps extends MotionProps {
  variant: AnimationName;
  className?: string;
  delay?: number;
  duration?: number;
  as?: keyof typeof motion;
  viewport?: UseInViewOptions;
  children: React.ReactNode;
}

export function AnimateOnView({
  children,
  variant,
  className,
  delay = 0,
  duration,
  as = "div",
  viewport = defaultViewport,
  ...rest
}: AnimateOnViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);

  const baseVariants = animationVariants[variant];
  if (!baseVariants) {
    console.warn(`[AnimateOnView] Unknown variant: ${variant}`);
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = JSON.parse(JSON.stringify(baseVariants));
  const visibleVariant = variants.visible as Record<string, any> | undefined;
  if (visibleVariant) {
    const transition = { ...(visibleVariant.transition || {}) };
    if (delay) transition.delay = delay;
    if (duration) transition.duration = duration;
    visibleVariant.transition = transition;
    variants.visible = visibleVariant;
  }

  const MotionComponent = motion[as] as typeof motion.div;
  return (
    <MotionComponent
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
