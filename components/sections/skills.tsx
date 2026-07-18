import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SkillIcon } from '@/components/icons/skill-icons';
import { cn } from '@/lib/utils';

type Skill = { name: string; icon: string };
type Tier = { heading: string; skills: Skill[] };

// Tier 1 (proven) = solid hairline tiles; tier 2 (in progress) = dashed. The distinction
// is carried by the heading text and the border style, never by color alone.
function SkillTier({ tier, variant }: { tier: Tier; variant: 'solid' | 'dashed' }) {
  return (
    <section className="border-border border-t py-12">
      <Eyebrow as="h3">{tier.heading}</Eyebrow>
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

export function Skills() {
  const t = useTranslations('skills');
  const sections = useTranslations('sections');

  return (
    <section id={sections('skills.id')} className="scroll-mt-28 md:scroll-mt-16">
      <Container>
        <Section className="pb-0">
          <h2 className="text-3xl">{t('h1')}</h2>
          <p className="text-ink-muted mt-6 max-w-[60ch] text-xl">{t('lead')}</p>
        </Section>

        <SkillTier tier={t.raw('tier1') as Tier} variant="solid" />
        <SkillTier tier={t.raw('tier2') as Tier} variant="dashed" />
      </Container>
    </section>
  );
}
