import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type Role = { title: string; period: string; bullets: string[] };
type Company = {
  name: string;
  description?: string;
  location: string;
  period: string;
  roles: Role[];
};

export function Experience() {
  const t = useTranslations('experience');
  const sections = useTranslations('sections');
  const companies = t.raw('companies') as Company[];

  return (
    <section id={sections('experience.id')} className="scroll-mt-28 md:scroll-mt-16">
      <Container>
        <Section className="pb-0">
          <h2 className="text-3xl">{t('h1')}</h2>
          <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>
        </Section>

        {companies.map((company) => (
          <section key={company.name} className="border-border border-t py-12">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-[minmax(0,16rem)_1fr]">
              {/* Company meta: left column on desktop, top on mobile. */}
              <div>
                <h3 className="text-2xl">{company.name}</h3>
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
                      <h4 className="text-lg">{role.title}</h4>
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
    </section>
  );
}
