// Single source of the deployment base path. next/image, plain <a>/<link> hrefs, and
// hand-written redirect targets do NOT get Next's `basePath` applied to string URLs, so
// anything pointing at /public or an in-site route must be prefixed explicitly to stay
// correct on the GitHub project site (/portfolio/...). Empty by default (user site).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Prefix a root-absolute asset or route path (e.g. "/cv-en.pdf") with the base path. */
export const withBasePath = (path: string) => `${basePath}${path}`;
