import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type PageProps = { params: Promise<{ locale: string }> };

type Channel = { label: string; value: string; href?: string; external?: boolean };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');
  const channels = t.raw('channels') as Channel[];

  return (
    <Container>
      <Section>
        <h1 className="text-display">{t('h1')}</h1>
        <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>

        {/* Definition-list pattern, consistent with the About page. */}
        <dl className="divide-border mt-10 divide-y">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <dt className="text-ink font-mono text-sm">{channel.label}</dt>
              <dd className="text-sm">
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className="text-ink hover:text-accent underline-offset-4 transition-colors hover:underline"
                  >
                    {channel.value}
                  </a>
                ) : (
                  <span className="text-ink-muted">{channel.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </Container>
  );
}
