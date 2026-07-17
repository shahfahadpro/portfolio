import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Locale-aware navigation APIs. `Link` and the hooks keep the active locale prefix
// in the URL, and `usePathname` returns the path *without* the locale segment — which
// is what the language switcher uses to preserve the current page across locales.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
