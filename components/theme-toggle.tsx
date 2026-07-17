'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations('a11y');
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={t('themeToggle')}
      title={t('themeToggle')}
      className={cn(
        'border-border text-ink hover:bg-surface inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors',
        className,
      )}
    >
      {/* Both icons render; the `.dark` class (set pre-paint by next-themes) toggles
          visibility via CSS, so there is no hydration mismatch or layout shift. The
          resolved theme is only read inside the click handler, which runs post-mount. */}
      <Sun className="h-5 w-5 dark:hidden" aria-hidden />
      <Moon className="hidden h-5 w-5 dark:block" aria-hidden />
    </button>
  );
}
