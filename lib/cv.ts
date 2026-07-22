import type { Locale } from '@/i18n/routing';
import { withBasePath } from '@/lib/base-path';

// CV assets live in /public but don't exist yet. Phase 4: drop `cv-en.pdf` and
// `cv-de.pdf` into /public and flip `cvAvailable` to true — that single edit is all
// that's needed. Until then the Download CV button is not rendered (no dead links).
export const cvAvailable: boolean = false;

const paths: Record<Locale, string> = { en: '/cv-en.pdf', de: '/cv-de.pdf' };

export const cvPath = (locale: Locale) => withBasePath(paths[locale]);
