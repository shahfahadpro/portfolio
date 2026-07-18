import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { NavLinks } from '@/components/layout/nav-links';

export function Header() {
  const t = useTranslations('nav');
  const brand = useTranslations('brand');

  return (
    <header className="border-border bg-bg sticky top-0 z-40 border-b">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-ink text-lg font-semibold tracking-tight"
        >
          {brand('name')}
        </Link>

        {/* Primary nav — inline on larger screens. */}
        <nav aria-label={t('label')} className="hidden md:block">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Container>

      {/* Primary nav — secondary row on small screens (no JS menu needed). */}
      <nav aria-label={t('label')} className="border-border border-t md:hidden">
        <Container className="flex h-12 items-center overflow-x-auto">
          <NavLinks />
        </Container>
      </nav>
    </header>
  );
}
