import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

// next/font downloads and self-hosts these at build time — no runtime requests to
// Google Fonts. Each exposes a CSS variable consumed by the Tailwind theme (globals.css).

// Display / headings — variable font, so weight is a continuous range.
export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
});

// Body.
export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
  weight: ['400', '500', '600', '700'],
});

// Metrics, labels, eyebrow text.
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
});

export const fontVariables = `${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`;
