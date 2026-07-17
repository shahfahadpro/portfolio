import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';

export function Footer() {
  const brand = useTranslations('brand');
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-auto border-t">
      <Container className="text-ink-muted flex flex-col gap-2 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-ink font-medium">{brand('name')}</span>
          <span className="text-border mx-2" aria-hidden>
            ·
          </span>
          <span className="font-mono">{t('location')}</span>
        </p>
        <p className="font-mono text-xs">
          © {year} · {t('rights')}
        </p>
      </Container>
    </footer>
  );
}
