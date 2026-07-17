import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buttonVariants } from '@/components/ui/button';
import { cvAvailable, cvPath } from '@/lib/cv';

type PageProps = { params: Promise<{ locale: string }> };

type Metric = { value: string; label: string };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home.hero');
  const metrics = t.raw('metrics') as Metric[];

  return (
    <Container>
      <Section>
        <Eyebrow>{t('eyebrow')}</Eyebrow>
        <h1 className="text-display mt-4">{t('h1')}</h1>
        <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>

        {/* Metric strip: hairlines via divide-border, no cards/boxes/shadows. */}
        <ul className="divide-border mt-12 grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <li
              key={metric.label}
              className="py-5 first:pt-0 last:pb-0 sm:px-6 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            >
              <p className="text-ink font-mono text-2xl font-medium tracking-tight">
                {metric.value}
              </p>
              <p className="text-ink-muted mt-1 text-sm">{metric.label}</p>
            </li>
          ))}
        </ul>

        {/* CTAs — Link/anchor styled via buttonVariants (Button renders a <button>). */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/experience"
            className={buttonVariants({
              variant: 'primary',
              size: 'lg',
              className: 'w-full sm:w-auto',
            })}
          >
            {t('ctaPrimary')}
          </Link>
          {cvAvailable && (
            <a
              href={cvPath(locale as Locale)}
              download
              className={buttonVariants({
                variant: 'outline',
                size: 'lg',
                className: 'w-full sm:w-auto',
              })}
            >
              {t('ctaSecondary')}
            </a>
          )}
        </div>
      </Section>
    </Container>
  );
}
