import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  { ignores: ['out/**', '.next/**', 'node_modules/**'] },
  ...coreWebVitals,
  ...typescript,
  // Disable stylistic rules that conflict with Prettier; keep this last.
  prettier,
];

export default eslintConfig;
