import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Prose } from '@/components/ui/prose';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Style Guide',
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ locale: string }> };

const colorTokens: { name: string; swatch: string; note: string }[] = [
  { name: '--bg', swatch: 'bg-bg', note: 'Page background (warm paper)' },
  { name: '--surface', swatch: 'bg-surface', note: 'Raised surfaces' },
  { name: '--ink', swatch: 'bg-ink', note: 'Primary text' },
  { name: '--ink-muted', swatch: 'bg-ink-muted', note: 'Secondary text' },
  { name: '--accent', swatch: 'bg-accent', note: 'Terracotta' },
  { name: '--accent-ink', swatch: 'bg-accent-ink', note: 'Text on accent' },
  { name: '--secondary', swatch: 'bg-secondary', note: 'Deep teal' },
  { name: '--border', swatch: 'bg-border', note: 'Hairlines & dividers' },
];

const typeScale: { token: string; className: string; sample: string }[] = [
  { token: 'text-display', className: 'text-display', sample: 'Editorial & warm' },
  { token: 'text-3xl', className: 'text-3xl', sample: 'Section heading' },
  { token: 'text-2xl', className: 'text-2xl', sample: 'Subsection heading' },
  { token: 'text-xl', className: 'text-xl', sample: 'Lead paragraph' },
  { token: 'text-lg', className: 'text-lg', sample: 'Large body text' },
  {
    token: 'text-base',
    className: 'text-base',
    sample: 'Body text — the default reading size.',
  },
  { token: 'text-sm', className: 'text-sm', sample: 'Small print and captions.' },
];

function GuideBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border border-t py-12">
      <Eyebrow className="mb-6">{title}</Eyebrow>
      {children}
    </section>
  );
}

export default async function StyleGuidePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container>
      <Section className="pb-0">
        <Eyebrow>Design system · Kiln</Eyebrow>
        <h1 className="mt-4 text-3xl">Style Guide</h1>
        <p className="text-ink-muted mt-4 max-w-[60ch]">
          A living reference for the Kiln design system. Toggle the theme and switch
          locales to verify tokens, type, and primitives in every mode.
        </p>
      </Section>

      <GuideBlock title="Color tokens">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colorTokens.map((token) => (
            <div key={token.name}>
              <div className={`border-border h-16 rounded-md border ${token.swatch}`} />
              <p className="text-ink mt-2 font-mono text-xs">{token.name}</p>
              <p className="text-ink-muted text-xs">{token.note}</p>
            </div>
          ))}
        </div>
      </GuideBlock>

      <GuideBlock title="Type scale">
        <div className="space-y-6">
          {typeScale.map((step) => (
            <div
              key={step.token}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="text-ink-muted w-32 shrink-0 font-mono text-xs">
                {step.token}
              </span>
              <span className={`font-display ${step.className}`}>{step.sample}</span>
            </div>
          ))}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
            <span className="text-ink-muted w-32 shrink-0 font-mono text-xs">
              text-eyebrow
            </span>
            <Eyebrow>Eyebrow / label</Eyebrow>
          </div>
        </div>
      </GuideBlock>

      <GuideBlock title="Typefaces">
        <div className="space-y-6">
          <div>
            <p className="text-ink-muted font-mono text-xs">Fraunces · display</p>
            <p className="font-display text-2xl">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div>
            <p className="text-ink-muted font-mono text-xs">IBM Plex Sans · body</p>
            <p className="font-sans text-lg">
              The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div>
            <p className="text-ink-muted font-mono text-xs">IBM Plex Mono · metrics</p>
            <p className="font-mono text-lg">The quick brown fox 0123456789</p>
          </div>
        </div>
      </GuideBlock>

      <GuideBlock title="Buttons">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </GuideBlock>

      <GuideBlock title="Prose">
        <Prose>
          <p>
            The <strong>Prose</strong> primitive caps line length near 68 characters for a
            comfortable reading measure, with generous line-height inherited from the base
            layer. Use it to wrap long-form copy.
          </p>
          <p>
            A second paragraph demonstrates the vertical rhythm applied between blocks of
            text within the same prose column.
          </p>
        </Prose>
      </GuideBlock>
    </Container>
  );
}
