/**
 * Scroll reveal: adds .is-in to [data-reveal] and [data-split] elements as they
 * enter the viewport. Without JS (or with reduced motion) everything is visible.
 */
declare global {
  interface Window {
    __mxReveal?: boolean;
  }
}

export function initReveal() {
  window.__mxReveal = true;
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}
