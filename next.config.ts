import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Empty for the GitHub Pages *user* site (shahfahadpro.github.io). A future move to a
// project repo, a subpath, a custom domain, or Vercel is a single env-var change —
// no component references this value.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Static HTML export — no Node server at runtime.
  output: 'export',
  // Required for `output: 'export'`; also keeps us portable (no Image Optimization server).
  images: { unoptimized: true },
  // `/en/about/` -> `out/en/about/index.html`, which static hosts (GitHub Pages) serve cleanly.
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default withNextIntl(nextConfig);
