import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

const navItems = [
  { href: '/about', key: 'about' },
  { href: '/experience', key: 'experience' },
  { href: '/projects', key: 'projects' },
  { href: '/contact', key: 'contact' },
] as const;

export function Header() {
  const t = useTranslations('nav');
  const brand = useTranslations('brand');

  const navList = (
    <ul className="flex items-center gap-6 text-sm">
      {navItems.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className="text-ink-muted hover:text-ink transition-colors"
          >
            {t(item.key)}
          </Link>
        </li>
      ))}
    </ul>
  );

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
          {navList}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Container>

      {/* Primary nav — secondary row on small screens (no JS menu needed). */}
      <nav aria-label={t('label')} className="border-border border-t md:hidden">
        <Container className="flex h-12 items-center overflow-x-auto">
          {navList}
        </Container>
      </nav>
    </header>
  );
}
