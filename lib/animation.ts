import { Transition, UseInViewOptions, Variants } from "framer-motion";

export const springTransition: Transition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
};

export const easeOutTransition: Transition = {
  duration: 0.6,
  ease: "easeOut",
};

export const defaultViewport: UseInViewOptions = {
  once: true,
  margin: "0px 0px -100px 0px",
} as const;

export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: easeOutTransition },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: easeOutTransition },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: easeOutTransition },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: easeOutTransition },
  },

  zoomIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: easeOutTransition },
  },
  zoomOut: {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { opacity: 1, scale: 1, transition: easeOutTransition },
  },

  flipLeft: {
    hidden: { opacity: 0, rotateY: -90, scale: 0.9 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: easeOutTransition,
    },
  },

  slideInFromBottom: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...easeOutTransition, duration: 0.8 },
    },
  },

  staggerParent: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  },
  staggerChild: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: easeOutTransition },
  },
} satisfies Record<string, Variants>;

export type AnimationName = keyof typeof animationVariants;
