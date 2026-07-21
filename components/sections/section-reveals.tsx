'use client';

import { useEffect } from 'react';

// Section reveal-on-scroll. Sections render visible by default (SSR), so no-JS,
// pre-hydration, reduced-motion, and any hydration failure all show final content —
// never a stuck hidden state. This effect *opts into* the entrance: it hides only
// sections still fully below the fold (off-screen, so no visible flash), then reveals
// each once as it approaches the viewport. Reveal is one class toggle on the whole
// section, so the section moves as a single unit (children are never touched).
export function SectionReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-hidden');
            obs.unobserve(entry.target); // reveal once, then stay revealed
          }
        }
      },
      // Fire slightly before fully in view, so it resolves as it arrives.
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    );

    for (const section of sections) {
      // Only hide what's fully below the fold — anything already visible stays put.
      if (section.getBoundingClientRect().top >= window.innerHeight) {
        section.classList.add('reveal-hidden');
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
