import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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

// Hex values mirror the Kiln tokens in app/globals.css (light / dark).
const colorTokens: {
  name: string;
  swatch: string;
  light: string;
  dark: string;
  note: string;
}[] = [
  {
    name: '--bg',
    swatch: 'bg-bg',
    light: '#F5F1EB',
    dark: '#14110F',
    note: 'Page background',
  },
  {
    name: '--surface',
    swatch: 'bg-surface',
    light: '#EDE7DE',
    dark: '#1E1A17',
    note: 'Raised surfaces',
  },
  {
    name: '--ink',
    swatch: 'bg-ink',
    light: '#14110F',
    dark: '#F5F1EB',
    note: 'Primary text',
  },
  {
    name: '--ink-muted',
    swatch: 'bg-ink-muted',
    light: '#6B635B',
    dark: '#9A9086',
    note: 'Secondary text',
  },
  {
    name: '--accent',
    swatch: 'bg-accent',
    light: '#C1440E',
    dark: '#D95F31',
    note: 'Terracotta',
  },
  {
    name: '--accent-ink',
    swatch: 'bg-accent-ink',
    light: '#FFFFFF',
    dark: '#14110F',
    note: 'Text on accent',
  },
  {
    name: '--secondary',
    swatch: 'bg-secondary',
    light: '#0F4C5C',
    dark: '#4E9AAB',
    note: 'Deep teal',
  },
  {
    name: '--border',
    swatch: 'bg-border',
    light: '#DCD3C7',
    dark: '#3A332C',
    note: 'Hairlines & dividers',
  },
];

// Display/heading steps render in Fraunces (font-display); body steps in IBM Plex Sans
// (font-sans) — matching how each size actually ships across the site.
const typeScale: {
  token: string;
  className: string;
  font: string;
  family: string;
  sample: string;
}[] = [
  {
    token: 'text-display',
    className: 'text-display',
    font: 'font-display',
    family: 'Fraunces',
    sample: 'Editorial & warm',
  },
  {
    token: 'text-3xl',
    className: 'text-3xl',
    font: 'font-display',
    family: 'Fraunces',
    sample: 'Section heading',
  },
  {
    token: 'text-2xl',
    className: 'text-2xl',
    font: 'font-display',
    family: 'Fraunces',
    sample: 'Subsection heading',
  },
  {
    token: 'text-xl',
    className: 'text-xl',
    font: 'font-sans',
    family: 'IBM Plex Sans',
    sample: 'Lead paragraph',
  },
  {
    token: 'text-lg',
    className: 'text-lg',
    font: 'font-sans',
    family: 'IBM Plex Sans',
    sample: 'Large body text',
  },
  {
    token: 'text-base',
    className: 'text-base',
    font: 'font-sans',
    family: 'IBM Plex Sans',
    sample: 'Body text, the default reading size.',
  },
  {
    token: 'text-sm',
    className: 'text-sm',
    font: 'font-sans',
    family: 'IBM Plex Sans',
    sample: 'Small print and captions.',
  },
];

function GuideBlock({ title, children }: { title: string; children: ReactNode }) {
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
    <>
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
                <p className="text-ink-muted mt-1 font-mono text-[0.7rem] leading-4">
                  <span className="text-ink">{token.light}</span> light
                  <br />
                  <span className="text-ink">{token.dark}</span> dark
                </p>
                <p className="text-ink-muted mt-1 text-xs">{token.note}</p>
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
                <div className="w-40 shrink-0">
                  <p className="text-ink-muted font-mono text-xs">{step.token}</p>
                  <p className="text-ink-muted font-mono text-[0.7rem]">{step.family}</p>
                </div>
                <span className={`${step.font} ${step.className}`}>{step.sample}</span>
              </div>
            ))}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <div className="w-40 shrink-0">
                <p className="text-ink-muted font-mono text-xs">text-eyebrow</p>
                <p className="text-ink-muted font-mono text-[0.7rem]">IBM Plex Mono</p>
              </div>
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
              The <strong>Prose</strong> primitive caps line length near 68 characters for
              a comfortable reading measure, with generous line-height inherited from the
              base layer. Use it to wrap long-form copy.
            </p>
            <p>
              A second paragraph demonstrates the vertical rhythm applied between blocks
              of text within the same prose column.
            </p>
          </Prose>
        </GuideBlock>
      </Container>

      {/* Layout primitives — rendered outside the page Container so Container's own
          max-width and centering are visible against the full-width backdrop. */}
      <section className="border-border border-t">
        <Container className="pt-12">
          <Eyebrow className="mb-4">Layout primitives</Eyebrow>
          <p className="text-ink-muted mb-8 max-w-[60ch] text-sm">
            <code className="font-mono">Container</code> centers content at max-w-5xl with
            responsive gutters; <code className="font-mono">Section</code> applies
            consistent vertical rhythm.
          </p>
        </Container>

        {/* Container demo: full-width surface reveals the centered, guttered column. */}
        <div className="bg-surface py-4">
          <Container className="border-accent rounded-md border border-dashed py-6">
            <p className="text-ink-muted text-center font-mono text-xs">
              &lt;Container&gt; · max-w-5xl · centered · px-5 to px-8 gutters
            </p>
          </Container>
        </div>

        {/* Section demo: the gap between the surface edge and the dashed content box is
            the Section's vertical rhythm (py-16 → py-28). */}
        <Container className="pt-6 pb-12">
          <div className="bg-surface rounded-md">
            <Section className="px-6">
              <div className="border-secondary bg-bg rounded border border-dashed py-3 text-center">
                <p className="text-ink-muted font-mono text-xs">
                  &lt;Section&gt; content · vertical rhythm py-16 to py-28
                </p>
              </div>
            </Section>
          </div>
        </Container>
      </section>
    </>
  );
}
