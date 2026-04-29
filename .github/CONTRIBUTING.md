# Contributing to ESLint Plugin Pretty Import

Thanks for your interest in contributing! This plugin is pretty opinionated
about how imports should look, but there's always room for improvement in
implementation, performance, and reliability.

## Getting Started

### Prerequisites

- **Bun** v1.0+ (I use Bun for package management and testing)
- **ESLint** v8+ (v9 preferred)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/kamiya4047/eslint-plugin-pretty-import.git
cd eslint-plugin-pretty-import

# Install dependencies
bun install

# Run tests
bun test

# Build the plugin
bun run build

# Test with the example project
cd example
bun install
bunx eslint test.js --fix
```

## Project Structure

```text
src/
├── index.ts              # Main plugin export
├── rules/               # ESLint rule implementations
│   ├── sort-import-groups.ts
│   ├── sort-import-names.ts
│   └── separate-type-imports.ts
├── utils.ts            # Shared utilities
├── types.ts            # TypeScript type definitions
└── test-utils.ts       # Testing helpers

test/
├── rules/              # Rule-specific tests
└── utils.test.ts       # Utility function tests

docs/
├── README.md           # Detailed documentation
└── rules/              # Individual rule docs
```

## Development Workflow

### Running Tests

```bash
# Run all tests
bun test

# Watch mode for development
bun test:watch

# Test a specific file
bun test test/rules/sort-import-groups.test.ts
```

### Testing Changes

The `example/` directory contains sample files to test your changes:

```bash
cd example
bunx eslint test.js --fix  # Test the plugin
```

You can also create additional test files in `example/` to verify specific
scenarios.

### Building

```bash
# Build for distribution
bun run build

# Development mode (rebuilds on changes)
bun run dev
```

## Writing Tests

We use Bun's built-in test runner. Rule tests should follow this pattern:

```typescript
import { RuleTester } from "@typescript-eslint/utils/testing";
import { parser } from 'typescript-eslint';

import rule from "@/rules/my-rule";

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});

ruleTester.run("rule", rule, {
  valid: [
    {
      code: `import { a } from 'valid';`,
    },
  ],
  invalid: [
    {
      code: `import { b, a } from 'invalid';`,
      errors: [{ messageId: "sortAlphabetically" }],
      output: `import { a, b } from 'invalid';`,
    },
  ],
});
```

## What We're Looking For

### Good Contributions

- **Bug fixes** - Especially edge cases in sorting logic
- **Performance improvements** - Import parsing can be expensive
- **Test coverage** - More test cases, especially edge cases
- **Documentation improvements** - Clearer examples, better explanations
- **TypeScript improvements** - Better type safety, inference
- **Compatibility** - Support for more ESLint versions, Node versions

### Things We're Not Looking For

- **Changes to the sorting philosophy** - The opinionated behavior is
  intentional
- **New rules** - This plugin is focused on import sorting specifically
- **Major API changes** - Keep it simple and focused

## Coding Standards

- **TypeScript** - All code should be properly typed
- **ESLint** - Follow our ESLint configuration
- **Naming** - Use clear, descriptive function and variable names
- **Comments** - Explain complex sorting logic, but don't over-comment

### Code Style

```typescript
// Good: Clear function names and types
function sortByImportCount(imports: ImportGroup[]): ImportGroup[] {
  return imports.sort((a, b) => b.names.length - a.names.length);
}

// Good: Descriptive variable names
const builtinImports = imports.filter(isBuiltinModule);
const thirdPartyImports = imports.filter(isThirdPartyModule);

// Good: Comment complex logic
// River system: preserve side effect execution order by treating
// them as section boundaries that cannot be crossed
function splitByRivers(imports: Import[]): Import[][] {
  // ... implementation
}
```

## Submitting Changes

### Pull Request Process

1. **Fork the repository** and create a feature branch
2. **Write tests** for your changes
3. **Ensure all tests pass**: `bun test`
4. **Build successfully**: `bun run build`
5. **Test with the example**: `cd example && bunx eslint test.js --fix`
6. **Submit a pull request** with a clear description

### Pull Request Template

```markdown
## What Changed
Brief description of your changes

## Why
Explanation of why this change is needed

## Testing
- [ ] All existing tests pass
- [ ] Added tests for new functionality
- [ ] Tested with example project
- [ ] Manual testing in real projects (if applicable)

## Breaking Changes
List any breaking changes (hopefully none!)
```

## Reporting Issues

### Bug Reports

Please include:

- **ESLint version**
- **Node.js version**
- **Minimal reproduction case**
- **Expected vs actual behavior**
- **Configuration used**

### Feature Requests

Before opening a feature request, consider:

- Does this align with the plugin's opinionated philosophy?
- Is this about import sorting specifically?
- Could this be solved with configuration options?

## Release Process

Releases are automated via GitHub Actions.

For maintainers:

```bash
bun run release        # patch version
bun run release:minor  # minor version  
bun run release:major  # major version
```

## Questions?

- **Issues**: For bugs and feature requests
- **Discussions**: For questions about usage or contribution ideas
- **Email**: For security concerns or private matters

## Code of Conduct

Be nice. We're all here because we care about code quality and developer
experience. Constructive feedback and respectful disagreement are welcome.

---

Thanks for contributing! Even small improvements make a difference. 🎉
