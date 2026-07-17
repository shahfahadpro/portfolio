'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const shortLabel: Record<Locale, string> = { en: 'EN', de: 'DE' };

/**
 * Two plain links (EN | DE). `usePathname` is locale-stripped, so linking to the same
 * path under a different `locale` preserves the current page when switching languages.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const active = useLocale();
  const t = useTranslations('a11y');
  const ariaLabel: Record<Locale, string> = {
    en: t('switchToEnglish'),
    de: t('switchToGerman'),
  };

  return (
    <nav
      aria-label={t('languageLabel')}
      className={cn('flex items-center font-mono text-sm', className)}
    >
      {routing.locales.map((locale, index) => {
        const isActive = locale === active;
        return (
          <span key={locale} className="flex items-center">
            {index > 0 && (
              <span aria-hidden className="text-border px-1 select-none">
                /
              </span>
            )}
            <Link
              href={pathname}
              locale={locale}
              aria-current={isActive ? 'true' : undefined}
              aria-label={ariaLabel[locale]}
              className={cn(
                'rounded px-1.5 py-1 uppercase transition-colors',
                isActive ? 'text-ink font-medium' : 'text-ink-muted hover:text-ink',
              )}
            >
              {shortLabel[locale]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
