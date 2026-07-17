# Portfolio

Personal portfolio of **Shah Fahad** — fullstack software engineer based in Frankfurt, Germany.

A statically-exported Next.js site, built to deploy unchanged to either **GitHub Pages**
or **Vercel** — the base path is the only thing that differs, and it's read from a single
environment variable.

## Tech stack

- **Next.js** (App Router, `output: 'export'`) + **TypeScript** (strict)
- **Tailwind CSS v4** — design tokens as CSS custom properties (the "Kiln" palette)
- **next-intl** — internationalization (English + German, path-based `/[locale]`)
- **next-themes** — light/dark mode
- **next/font** — self-hosted Fraunces, IBM Plex Sans & IBM Plex Mono (no runtime CDN)
- **pnpm**, ESLint, Prettier

## Getting started

```bash
pnpm install
pnpm dev
# → http://localhost:3000/en
```

## Build

```bash
pnpm build      # static export to ./out
```

## Internationalization

Locales are folders under the URL: `/en/…` and `/de/…`. Translations live in
[`messages/`](messages). Adding a locale means editing [`i18n/routing.ts`](i18n/routing.ts)
and adding a matching `messages/<locale>.json`.

## Deployment

The base path is read from `NEXT_PUBLIC_BASE_PATH` (empty by default):

| Target                      | `NEXT_PUBLIC_BASE_PATH` | Served at                                   |
| --------------------------- | ----------------------- | ------------------------------------------- |
| GitHub Pages (project site) | `/portfolio`            | `https://shahfahadpro.github.io/portfolio/` |
| Vercel / custom domain      | _(empty)_               | root                                        |

GitHub Pages deploys automatically from `main` via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Search-engine indexing

Indexing is off by default so staging deployments never leak into search results. It's
controlled by `NEXT_PUBLIC_INDEXABLE` and applied site-wide (see [`lib/seo.ts`](lib/seo.ts)):

| `NEXT_PUBLIC_INDEXABLE`         | `robots.txt`  | Per-page meta       |
| ------------------------------- | ------------- | ------------------- |
| _(unset / anything but `true`)_ | `Disallow: /` | `noindex, nofollow` |
| `true`                          | `Allow: /`    | normal (indexable)  |

Set it to `true` **only** on the final production domain (e.g. a Vercel **Production**
environment variable). Leave it unset on GitHub Pages and Vercel preview deployments.
