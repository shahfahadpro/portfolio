import type { Metadata } from 'next';
import { buttonVariants } from '@/components/ui/button';
import { fontVariables } from './fonts';
import './globals.css';

// Global 404 for unmatched top-level paths that never enter the `[locale]` tree.
// It sits outside the locale layout, so it renders its own <html>/<body> and falls
// back to the default locale for its (few) strings. In the static export this becomes
// `out/404.html`, which GitHub Pages serves for any unknown URL.
export const metadata: Metadata = {
  title: 'Page not found · Shah Fahad',
  robots: { index: false, follow: false },
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function GlobalNotFound() {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-eyebrow text-accent font-mono font-medium uppercase">404</p>
        <h1 className="text-3xl">Page not found</h1>
        <p className="text-ink-muted max-w-[48ch]">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <a href={`${basePath}/en/`} className={buttonVariants({ variant: 'primary' })}>
          Back to home
        </a>
      </body>
    </html>
  );
}
