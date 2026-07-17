import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';

type PageProps = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const brand = await getTranslations('brand');

  return (
    <Container>
      <Section>
        <Eyebrow>{brand('role')}</Eyebrow>
        <h1 className="text-display mt-4">{brand('name')}</h1>
      </Section>
    </Container>
  );
}
