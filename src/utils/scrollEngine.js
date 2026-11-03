import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerListener = null;
let clickListener = null;

/**
 * Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
 * @param {Object} options Configuration overrides
 * @returns {Lenis|null} The initialized Lenis instance
 */
export function initScrollEngine(options = {}) {
  // If running in non-browser environment, return null
  if (typeof window === 'undefined') return null;

  // Destroy any existing instance to prevent duplicates during development / hot reload
  destroyScrollEngine();

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // If reduced motion is requested, do not run smooth scrolling. Native scrolling is preserved.
    return null;
  }

  // Detect touch-only mobile devices (phones/tablets without pointer)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  try {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // On mobile / touch screens, ensure natural touch behavior is preserved
      touchMultiplier: isTouchDevice ? 1.0 : 1.5,
      infinite: false,
      autoRaf: false, // Driven by GSAP ticker
      ...options
    });

    // 1. Synchronize Lenis scroll with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // 2. Drive Lenis through GSAP ticker for synchronous RAF loop
    tickerListener = (time) => {
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };
    gsap.ticker.add(tickerListener);
    gsap.ticker.lagSmoothing(0);

    // 3. Smooth anchor link scrolling with sticky header offset (-85px)
    clickListener = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute('href');
      // Ignore HashRouter routes like '#/demo', '#/crm', etc. or bare '#'
      if (!hash || hash === '#' || hash.startsWith('#/')) return;

      try {
        const targetEl = document.querySelector(hash);
        if (targetEl && lenisInstance) {
          e.preventDefault();
          lenisInstance.scrollTo(targetEl, {
            offset: -85,
            duration: 1.2
          });

          // Update URL hash without causing an unhandled jump
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', hash);
          }
        }
      } catch (err) {
        // In case selector is not valid querySelector
      }
    };
    document.addEventListener('click', clickListener);

    // Refresh ScrollTrigger once DOM layout stabilizes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return lenisInstance;
  } catch (err) {
    console.warn('AutoLead Systems: Could not initialize Lenis smooth scroll:', err);
    return null;
  }
}

/**
 * Get current Lenis instance
 */
export function getLenis() {
  return lenisInstance;
}

/**
 * Programmatically scroll to target with sticky header compensation
 */
export function scrollToTarget(target, offset = -85) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

/**
 * Destroy Lenis and clean up GSAP ticker & event listeners
 */
export function destroyScrollEngine() {
  if (clickListener) {
    document.removeEventListener('click', clickListener);
    clickListener = null;
  }

  if (tickerListener) {
    gsap.ticker.remove(tickerListener);
    tickerListener = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export { gsap, ScrollTrigger };
