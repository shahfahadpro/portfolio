import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SkipLink } from '@/components/layout/skip-link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { isIndexable } from '@/lib/seo';
import { fontVariables } from '../fonts';
import '../globals.css';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

// Prerender every locale tree at build time (required for `output: 'export'`).
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { default: t('titleDefault'), template: t('titleTemplate') },
    // Inherited by every page. Unindexed everywhere except the production domain.
    robots: isIndexable ? undefined : { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt this route into static rendering (otherwise next-intl falls back to dynamic,
  // which is incompatible with static export).
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SkipLink />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
