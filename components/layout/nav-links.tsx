'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

// Order: About, Experience, Skills, Contact. Each links to its in-page section anchor
// (localized id), so it works both on the home page and from other routes.
const items = [
  { labelKey: 'about', idKey: 'about' },
  { labelKey: 'experience', idKey: 'experience' },
  { labelKey: 'skills', idKey: 'skills' },
  { labelKey: 'contact', idKey: 'contact' },
] as const;

// Scroll-spy: the section whose top has crossed a line ~20% down the viewport is
// "active". This is state, not motion, so it runs regardless of prefers-reduced-motion.
// `idsKey` is the pipe-joined localized ids so the effect only re-runs when they change.
function useActiveSection(idsKey: string): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = idsKey.split('|');
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const seen = new Set<string>();
    const isAtBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    const resolve = () => {
      // Short last section at the very bottom may never cross the line; pin it.
      if (isAtBottom()) {
        setActiveId(ids.at(-1) ?? null);
        return;
      }
      // Topmost section currently crossing the activation line (null in the hero).
      setActiveId(ids.find((id) => seen.has(id)) ?? null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }
        resolve();
      },
      { rootMargin: '-20% 0px -79% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      if (isAtBottom()) setActiveId(ids.at(-1) ?? null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    resolve();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [idsKey]);

  return activeId;
}

export function NavLinks() {
  const nav = useTranslations('nav');
  const sections = useTranslations('sections');
  const ids = items.map((item) => sections(`${item.idKey}.id`));
  const activeId = useActiveSection(ids.join('|'));

  return (
    <ul className="flex items-center gap-6 text-sm">
      {items.map((item, index) => {
        const id = ids[index];
        const isActive = activeId === id;
        return (
          <li key={item.labelKey}>
            <Link
              href={{ pathname: '/', hash: id }}
              aria-current={isActive ? 'location' : undefined}
              className={cn(
                'transition-colors',
                isActive ? 'text-accent' : 'text-ink-muted hover:text-ink',
              )}
            >
              {nav(item.labelKey)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
