'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

// Order: About, Experience, Skills, Contact. Projects returns once it has content
// (its route still exists; it just has no nav entry for now).
const navItems = [
  { href: '/about', key: 'about' },
  { href: '/experience', key: 'experience' },
  { href: '/skills', key: 'skills' },
  { href: '/contact', key: 'contact' },
] as const;

// Normalize trailing slashes so server (SSG) and client comparisons agree. With
// trailingSlash: true, usePathname can yield "/skills/" on the client but "/skills"
// during static generation; without this they'd disagree and drop the active state
// (and trigger a hydration mismatch).
const normalize = (path: string) => path.replace(/\/+$/, '') || '/';

export function NavLinks() {
  const t = useTranslations('nav');
  const pathname = usePathname(); // locale-stripped, e.g. "/skills"

  return (
    <ul className="flex items-center gap-6 text-sm">
      {navItems.map((item) => {
        const isActive = normalize(pathname) === normalize(item.href);
        return (
          <li key={item.key}>
            <Link
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'transition-colors',
                isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
              )}
            >
              {t(item.key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
