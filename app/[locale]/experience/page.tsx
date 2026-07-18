import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type PageProps = { params: Promise<{ locale: string }> };

type Role = { title: string; period: string; bullets: string[] };
type Company = {
  name: string;
  description?: string;
  location: string;
  period: string;
  roles: Role[];
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'experience.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

export default async function ExperiencePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('experience');
  const companies = t.raw('companies') as Company[];

  return (
    <Container>
      <Section className="pb-0">
        <h1 className="text-display">{t('h1')}</h1>
        <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>
      </Section>

      {companies.map((company) => (
        <section key={company.name} className="border-border border-t py-12">
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-[minmax(0,16rem)_1fr]">
            {/* Company meta: left column on desktop, top on mobile. */}
            <div>
              <h2 className="text-2xl">{company.name}</h2>
              {company.description && (
                <p className="text-ink-muted mt-2 text-sm">{company.description}</p>
              )}
              <p className="text-ink-muted mt-3 font-mono text-xs">
                {company.location} · {company.period}
              </p>
            </div>

            {/* Roles: one continuous progression, newest first, spacing only. */}
            <div className="space-y-10">
              {company.roles.map((role) => (
                <div key={role.title}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <h3 className="text-lg">{role.title}</h3>
                    <p className="text-ink-muted font-mono text-xs">{role.period}</p>
                  </div>
                  <ul className="text-ink-muted marker:text-ink-muted mt-3 list-disc space-y-2 pl-5 text-sm">
                    {role.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Container>
  );
}
