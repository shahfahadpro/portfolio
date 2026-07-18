import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Prose } from '@/components/ui/prose';

type PageProps = { params: Promise<{ locale: string }> };

type DefItem = { term: string; detail: string };

// next/image does not prefix string srcs with basePath, so the /public photo would 404
// on the GitHub project site (/portfolio/...). Prefix it explicitly, like the CV link.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });
  return {
    title: { absolute: t('title') },
    description: t('description'),
  };
}

// Definition-style list with mono terms and hairline-separated rows.
function DefinitionList({ items }: { items: DefItem[] }) {
  return (
    <dl className="divide-border mt-6 divide-y">
      {items.map((item) => (
        <div
          key={item.term}
          className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
        >
          <dt className="text-ink font-mono text-sm">{item.term}</dt>
          <dd className="text-ink-muted text-sm">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  const paragraphs = t.raw('paragraphs') as string[];
  const languages = t.raw('languages') as DefItem[];
  const education = t.raw('education') as DefItem[];
  const note =
    locale === 'de' ? (t.raw('languageNote') as { heading: string; body: string }) : null;

  return (
    <Container>
      <Section className="pb-0">
        <h1 className="text-display">{t('h1')}</h1>
      </Section>

      {/* Bio: photo floats beside the first paragraph on desktop, sits above on mobile.
          flow-root contains the float; the explicit 413x531 prevents layout shift. */}
      <div className="border-border flow-root border-t py-12">
        <Image
          src={`${basePath}/photos/shah_fahad_photo.jpg`}
          alt={t('photoAlt')}
          width={413}
          height={531}
          priority={false}
          className="mb-6 block h-auto w-40 rounded-md sm:float-left sm:mr-8 sm:mb-2 sm:w-52"
        />
        <Prose>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Prose>
      </div>

      {/* Rendered only on /de; never accessed on /en. */}
      {note && (
        <section className="border-border border-t py-12">
          <Eyebrow as="h2">{note.heading}</Eyebrow>
          <Prose className="mt-4">
            <p>{note.body}</p>
          </Prose>
        </section>
      )}

      <section className="border-border border-t py-12">
        <Eyebrow as="h2">{t('languagesHeading')}</Eyebrow>
        <DefinitionList items={languages} />
      </section>

      <section className="border-border border-t py-12">
        <Eyebrow as="h2">{t('educationHeading')}</Eyebrow>
        <DefinitionList items={education} />
      </section>
    </Container>
  );
}
