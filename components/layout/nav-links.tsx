import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// Order: About, Experience, Skills, Contact. Each links to its in-page section anchor
// (localized id), so it works both on the home page and from other routes.
const items = [
  { labelKey: 'about', idKey: 'about' },
  { labelKey: 'experience', idKey: 'experience' },
  { labelKey: 'skills', idKey: 'skills' },
  { labelKey: 'contact', idKey: 'contact' },
] as const;

export function NavLinks() {
  const nav = useTranslations('nav');
  const sections = useTranslations('sections');

  return (
    <ul className="flex items-center gap-6 text-sm">
      {items.map((item) => (
        <li key={item.labelKey}>
          {/* Active-section highlighting is intentionally not implemented yet — it needs
              scroll-spy, which lands in the motion step. */}
          <Link
            href={{ pathname: '/', hash: sections(`${item.idKey}.id`) }}
            className="text-ink-muted hover:text-ink transition-colors"
          >
            {nav(item.labelKey)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
