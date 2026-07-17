import type { MetadataRoute } from 'next';
import { isIndexable } from '@/lib/seo';

// Emitted as a static /robots.txt at build time. Disallows everything unless the
// deployment is the indexable production domain (NEXT_PUBLIC_INDEXABLE=true).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexable
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
  };
}
