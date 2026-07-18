import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type Channel = { label: string; value: string; href?: string; external?: boolean };

export function Contact() {
  const t = useTranslations('contact');
  const sections = useTranslations('sections');
  const channels = t.raw('channels') as Channel[];

  return (
    <section id={sections('contact.id')} className="scroll-mt-28 md:scroll-mt-16">
      <Container>
        <Section>
          <h2 className="text-3xl">{t('h1')}</h2>
          <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>

          {/* Definition-list pattern, consistent with the About section. */}
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
    </section>
  );
}
