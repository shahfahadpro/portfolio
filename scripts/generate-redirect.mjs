import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

// Static export has no middleware, so `/` needs a real redirect page. This writes a
// single `out/index.html` that sends visitors to the default locale. It deliberately
// does NOT touch `out/404.html` — every route is prerendered, so Next emits the real
// 404 from the not-found pages and no SPA fallback is needed.

const outDir = 'out';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const target = `${basePath}/en/`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Shah Fahad</title>
    <link rel="canonical" href="${target}" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <script>
      location.replace(${JSON.stringify(target)} + location.search + location.hash);
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${target}">${target}</a>…</p>
  </body>
</html>
`;

await writeFile(join(outDir, 'index.html'), html, 'utf8');
console.log(`✓ wrote ${outDir}/index.html → ${target}`);
