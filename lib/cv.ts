import type { Locale } from '@/i18n/routing';

// CV assets live in /public but don't exist yet. Phase 4: drop `cv-en.pdf` and
// `cv-de.pdf` into /public and flip `cvAvailable` to true — that single edit is all
// that's needed. Until then the Download CV button is not rendered (no dead links).
export const cvAvailable: boolean = false;

// basePath keeps the link correct on the GitHub project site (/portfolio/...).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const paths: Record<Locale, string> = { en: '/cv-en.pdf', de: '/cv-de.pdf' };

export const cvPath = (locale: Locale) => `${basePath}${paths[locale]}`;
