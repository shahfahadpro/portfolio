import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SkillIcon } from '@/components/icons/skill-icons';
import { cn } from '@/lib/utils';

type PageProps = { params: Promise<{ locale: string }> };

type Skill = { name: string; icon: string };
type Tier = { heading: string; skills: Skill[] };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'skills.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

// Tier 1 (proven) = solid hairline tiles; tier 2 (in progress) = dashed. The distinction
// is carried by the heading text and the border style, never by color alone.
function SkillTier({ tier, variant }: { tier: Tier; variant: 'solid' | 'dashed' }) {
  return (
    <section className="border-border border-t py-12">
      <Eyebrow as="h2">{tier.heading}</Eyebrow>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tier.skills.map((skill) => (
          <li
            key={skill.name}
            className={cn(
              'border-border text-ink flex items-center gap-2.5 rounded-md border px-3 py-2.5',
              variant === 'dashed' && 'border-dashed',
            )}
          >
            <SkillIcon name={skill.icon} className="shrink-0" />
            <span className="text-sm">{skill.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SkillsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('skills');

  return (
    <Container>
      <Section className="pb-0">
        <h1 className="text-display">{t('h1')}</h1>
        <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>
      </Section>

      <SkillTier tier={t.raw('tier1') as Tier} variant="solid" />
      <SkillTier tier={t.raw('tier2') as Tier} variant="dashed" />
    </Container>
  );
}
