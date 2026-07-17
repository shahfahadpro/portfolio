import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Eyebrow } from '@/components/ui/eyebrow';
import { buttonVariants } from '@/components/ui/button';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <Container>
      <Section className="text-center">
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 text-3xl">{t('title')}</h1>
        <p className="text-ink-muted mx-auto mt-4 max-w-[48ch]">{t('description')}</p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className={buttonVariants({ variant: 'primary' })}>
            {t('back')}
          </Link>
        </div>
      </Section>
    </Container>
  );
}
