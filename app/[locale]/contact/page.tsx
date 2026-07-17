import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type PageProps = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('nav');

  return (
    <Container>
      <Section>
        <h1 className="text-3xl">{t('contact')}</h1>
      </Section>
    </Container>
  );
}
