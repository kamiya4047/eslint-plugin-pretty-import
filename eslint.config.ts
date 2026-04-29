import { defineConfig } from '@eslint/config-helpers';

import javascript from '@eslint/js';
import plugin from 'eslint-plugin-eslint-plugin';
import stylistic from '@stylistic/eslint-plugin';
import typescript from 'typescript-eslint';

import prettyImport from './src/index';

export default defineConfig(
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'example/**', '*.js'],
  },
  // Global files pattern
  {
    files: ['src/**/*.ts', 'test/**/*.ts', '*.config.ts'],
  },
  // TypeScript parser configuration
  {
    files: ['src/**/*.ts', 'test/**/*.ts', '*.config.ts'],
    languageOptions: {
      parser: typescript.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  javascript.configs.recommended,
  typescript.configs.recommendedTypeChecked,
  typescript.configs.stylisticTypeChecked,
  plugin.configs.recommended,
  prettyImport.configs.error,
  stylistic.configs.customize({
    arrowParens: true,
    semi: true,
  }),
);
