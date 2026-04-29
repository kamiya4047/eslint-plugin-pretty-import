# Documentation

This directory contains comprehensive documentation for all rules provided by
`eslint-plugin-pretty-import`.

## Available Rules

### Import Organization

- [`sort-import-groups`](./rules/sort-import-groups.md) - Groups and sorts
  imports with CSS grouping
- [`sort-import-names`](./rules/sort-import-names.md) - Sorts named imports
  within import statements
- [`separate-type-imports`](./rules/separate-type-imports.md) - Enforces
  separate `import type` declarations over inline type imports
- [`single-line-import`](./rules/single-line-import.md) - Enforces import
  statements on a single line

## Quick Reference

| Rule | Description | Auto-fixable |
|------|-------------|--------------|------------------|
| [`sort-import-groups`](./rules/sort-import-groups.md) | Groups and sorts imports with CSS grouping | ✅ |
| [`sort-import-names`](./rules/sort-import-names.md) | Sorts named imports within import statements | ✅ |
| [`separate-type-imports`](./rules/separate-type-imports.md) | Enforces separate `import type` declarations | ✅ |
| [`single-line-import`](./rules/single-line-import.md) | Enforces import statements on a single line | ✅ |

## Configuration Examples

### Basic Setup

```js
// eslint.config.js
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';

export default [
  {
    plugins: {
      'pretty-import': prettyImport
    },
    rules: {
      'pretty-import/separate-type-imports': 'error',
      'pretty-import/sort-import-groups': 'error',
      'pretty-import/sort-import-names': 'error',
      'pretty-import/single-line-import': 'error'
    }
  }
];
```

### Using Preset Configurations

```js
// eslint.config.js
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';

export default [
  // Warn: warn severity for sorting rules
  prettyImport.configs.warn,
  
  // Or error: error severity with advanced options
  prettyImport.configs.error
];
```

### Advanced Configuration

```js
// eslint.config.js
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';

export default [
  {
    plugins: {
      'pretty-import': prettyImport
    },
    rules: {
      'pretty-import/separate-type-imports': 'error',
      'pretty-import/sort-import-groups': ['error', {
        localPatterns: ['@/', '~/', '#/'],
        builtinModulePrefixes: ['node:', 'bun:', 'deno:'],
        groupStyleImports: true
      }],
      'pretty-import/sort-import-names': ['error', {
        caseInsensitive: false
      }]
    }
  }
];
```

## Integration Guides

### Working with Prettier

Prettier conflicts with `single-line-import`. Its formatter expands long imports
to multiple lines, which this rule collapses back.

To use this plugin with Prettier, disable `single-line-import` or accept that
ESLint wins on import formatting. `sort-import-groups`, `sort-import-names`, and
`separate-type-imports` have no conflict with Prettier.

### Working with Biome

Biome conflicts with this plugin in two ways. Its formatter expands long imports
to multiple lines, which `single-line-import` collapses back. Its
`organizeImports` code assist conflicts with `sort-import-groups`,
`sort-import-names`, and `separate-type-imports`. Both tools will try to reorder
the same imports.

To use this plugin with Biome, disable `organizeImports` in your Biome config.
For `single-line-import`, disable the Biome formatter for imports or accept that
ESLint wins.

### TypeScript

For TypeScript projects, ensure you're using the TypeScript ESLint parser:

```js
// eslint.config.js
import prettyImport from '@kamiya4047/eslint-plugin-pretty-import';
import tsParser from '@typescript-eslint/parser';
// or
import { parser } from 'typescript-eslint'; 

export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser
    },
    plugins: {
      'pretty-import': prettyImport
    },
    rules: {
      'pretty-import/separate-type-imports': 'error',
      'pretty-import/sort-import-groups': 'error',
      'pretty-import/sort-import-names': 'error',
      'pretty-import/single-line-import': 'error'
    }
  }
];
```

### Path Aliases Configuration

Configure `localPatterns` to match your TypeScript path mapping configuration:

```js
// If your tsconfig.json contains:
// {
//   "compilerOptions": {
//     "paths": {
//       "@/*": ["./src/*"],
//       "~/*": ["./lib/*"],
//       "#/*": ["./types/*"]
//     }
//   }
// }

export default [
  {
    rules: {
      'pretty-import/separate-type-imports': 'error',
      'pretty-import/sort-import-groups': ['error', {
        localPatterns: ['@/', '~/', '#/']
      }],
      'pretty-import/sort-import-names': 'error'
    }
  }
];
```

### IDE Integration

Most modern IDEs support ESLint auto-fixing on save:

#### VS Code

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

#### WebStorm/IntelliJ

- Enable "ESLint" in Settings → Languages & Frameworks → JavaScript → Code
  Quality Tools
- Check "Run eslint --fix on save"

## Performance Optimization

For optimal performance in large projects:

- **Use file patterns**: Target specific directories or file types
- **Enable caching**: Use `--cache` flag to avoid re-processing unchanged files
- **Parallel processing**: ESLint automatically uses available CPU cores
- **IDE integration**: Configure auto-fix on save for immediate feedback
