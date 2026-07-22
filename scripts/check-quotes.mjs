import { readdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

// Fail if any curly quote or apostrophe appears in copy or source. This project uses
// straight quotes everywhere (see the copy rules). The forbidden code points are built
// from their char codes so this guard file itself contains no curly glyphs:
//   U+2018 and U+2019 (single), U+201C and U+201D (double).
const CURLY = new RegExp(`[${String.fromCharCode(0x2018, 0x2019, 0x201c, 0x201d)}]`);
const ROOTS = ['messages', 'app', 'components', 'lib', 'i18n'];
const EXTENSIONS = new Set(['.json', '.ts', '.tsx']);
const SKIP_DIRS = new Set(['node_modules', '.next', 'out']);

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...walk(join(dir, entry.name)));
    } else if (EXTENSIONS.has(extname(entry.name))) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

const offenders = [];
for (const root of ROOTS) {
  let files;
  try {
    files = walk(root);
  } catch {
    continue; // root may not exist yet
  }
  for (const file of files) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((line, index) => {
        if (CURLY.test(line)) offenders.push(`${file}:${index + 1}`);
      });
  }
}

if (offenders.length > 0) {
  console.error('Curly quotes found. Use straight quotes ( \' and " ) instead:');
  for (const offender of offenders) console.error(`  ${offender}`);
  process.exit(1);
}

console.log('no curly quotes');
