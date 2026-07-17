'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const shortLabel: Record<Locale, string> = { en: 'EN', de: 'DE' };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// `pathname` is locale-stripped (e.g. "/about" or "/"). Build the target as a real URL
// so switching locale is a full document navigation, not an SPA transition. That avoids
// re-rendering the `[locale]` layout on the client — which is what caused next-themes to
// briefly drop the theme class (white flash) and re-emit its no-FOUC <script>.
function localeHref(locale: Locale, pathname: string) {
  const suffix = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${basePath}/${locale}${suffix}/`;
}

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
            {isActive ? (
              <span
                aria-current="true"
                className="text-ink rounded px-1.5 py-1 font-medium uppercase"
              >
                {shortLabel[locale]}
              </span>
            ) : (
              <a
                href={localeHref(locale, pathname)}
                hrefLang={locale}
                aria-label={ariaLabel[locale]}
                className="text-ink-muted hover:text-ink rounded px-1.5 py-1 uppercase transition-colors"
              >
                {shortLabel[locale]}
              </a>
            )}
          </span>
        );
      })}
    </nav>
  );
}
