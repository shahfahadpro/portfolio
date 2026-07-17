import { useTranslations } from 'next-intl';

/** Keyboard-first skip link — visually hidden until focused, then jumps to <main>. */
export function SkipLink() {
  const t = useTranslations('a11y');
  return (
    <a
      href="#main"
      className="focus:bg-accent focus:text-accent-ink sr-only rounded-md focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:font-medium"
    >
      {t('skipToContent')}
    </a>
  );
}
