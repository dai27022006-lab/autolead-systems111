/**
 * AutoLead Systems - Motion Foundation
 * Apple-inspired smooth, purposeful animations with strict performance & reduced-motion safety.
 */

// Custom Apple-style easing curves
export const EASINGS = {
  smooth: [0.25, 0.1, 0.25, 1],
  gentleOut: [0.16, 1, 0.3, 1],
  springy: [0.34, 1.56, 0.64, 1],
  snappy: [0.4, 0, 0.2, 1]
};

// Fade up animation for sections & cards
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.55,
      delay: custom.delay ?? 0,
      ease: EASINGS.gentleOut
    }
  })
};

// Fade in (no movement)
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.45,
      delay: custom.delay ?? 0,
      ease: EASINGS.smooth
    }
  })
};

// Staggered parent container
export const staggerContainerVariant = (staggerDelay = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren
    }
  }
});

// Card hover micro-interaction
export const cardHoverMotion = {
  whileHover: {
    y: -4,
    transition: { duration: 0.2, ease: EASINGS.gentleOut }
  }
};

// Button interaction physics
export const buttonMotion = {
  whileHover: {
    scale: 1.02,
    transition: { duration: 0.15, ease: EASINGS.gentleOut }
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: EASINGS.snappy }
  }
};

// Standard viewport config for scroll reveals
export const defaultViewport = {
  once: true,
  margin: '-40px'
};
