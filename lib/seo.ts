/**
 * The site is indexable ONLY when the deployment explicitly opts in with
 * `NEXT_PUBLIC_INDEXABLE=true` — reserved for the final production domain.
 *
 * Everything else — GitHub Pages, Vercel preview deployments, local dev — leaves it
 * unset and therefore stays unindexed, so staging never leaks into search engines.
 */
export const isIndexable = process.env.NEXT_PUBLIC_INDEXABLE === 'true';
