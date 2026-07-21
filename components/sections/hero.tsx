import { useLocale, useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buttonVariants } from '@/components/ui/button';
import { cvAvailable, cvPath } from '@/lib/cv';

type Metric = { value: string; label: string };

export function Hero() {
  const t = useTranslations('home.hero');
  const sections = useTranslations('sections');
  const locale = useLocale() as Locale;
  const metrics = t.raw('metrics') as Metric[];

  return (
    <section>
      <Container>
        <Section>
          <Eyebrow data-hero-item="1">{t('eyebrow')}</Eyebrow>
          <h1 data-hero-item="1" className="text-display mt-4">
            {t('h1')}
          </h1>
          <p
            data-hero-item="2"
            className="text-ink-muted mt-6 max-w-[60ch] text-xl"
          >
            {t('lead')}
          </p>

          {/* Metric strip: hairlines via divide-border, no cards/boxes/shadows. */}
          <ul
            data-hero-item="3"
            className="divide-border mt-12 grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
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

          {/* CTAs — in-page anchor to the Experience section + the (gated) CV download. */}
          <div
            data-hero-item="4"
            className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={`#${sections('experience.id')}`}
              className={buttonVariants({
                variant: 'primary',
                size: 'lg',
                className: 'w-full sm:w-auto',
              })}
            >
              {t('ctaPrimary')}
            </a>
            {cvAvailable && (
              <a
                href={cvPath(locale)}
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
    </section>
  );
}
