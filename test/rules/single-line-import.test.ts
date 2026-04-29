import { describe } from 'bun:test';

import { RuleTester } from 'eslint';
import { parser } from 'typescript-eslint';

import rule from '@/rules/single-line-import';

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
});

describe('single-line-import rule', () => {
  ruleTester.run('single-line-import', rule, {
    valid: [
      // Simple single-line named import
      {
        code: `import { a, b, c } from 'module';`,
      },

      // Single-line default import
      {
        code: `import React from 'react';`,
      },

      // Single-line namespace import
      {
        code: `import * as fs from 'fs';`,
      },

      // Side-effect import (always single-line)
      {
        code: `import './styles.css';`,
      },

      // Single-line type-only import
      {
        code: `import type { User, Profile } from './types';`,
      },

      // Single-line with mixed specifiers
      {
        code: `import React, { useState, useEffect } from 'react';`,
      },

      // Already single-line multiline-style is OK
      {
        code: `import { useCallback, useMemo, useRef } from 'react';`,
      },

      // Inline type specifiers on a single line
      {
        code: `import { useState, type ComponentProps } from 'react';`,
      },

      // With aliases on one line
      {
        code: `import { z } from 'zod';`,
      },

      // Long but still single line
      {
        code: `import { QueryClient, useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';`,
      },
    ],

    invalid: [
      // Multi-line named import collapsed to single line
      {
        code: `import {\n  a,\n  b,\n  c,\n} from 'module';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import { a, b, c } from 'module';`,
      },

      // Multi-line default import
      {
        code: `import\n  React\nfrom\n'react';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import React from 'react';`,
      },

      // Multi-line with trailing comma
      {
        code: `import {\n  useState,\n  useEffect,\n  useContext,\n} from 'react';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import { useState, useEffect, useContext } from 'react';`,
      },

      // Multi-line namespace import
      {
        code: `import *\n  as fs\nfrom\n'fs';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import * as fs from 'fs';`,
      },

      // Multi-line type-only import
      {
        code: `import type {\n  User,\n  Profile,\n} from './types';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import type { User, Profile } from './types';`,
      },

      // Multi-line with inline type specifiers
      {
        code: `import {\n  useState,\n  type ComponentProps,\n  useEffect,\n} from 'react';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import { useState, type ComponentProps, useEffect } from 'react';`,
      },

      // Multi-line with default and named specifiers
      {
        code: `import\n  React,\n  { useState,\n    useEffect }\nfrom\n'react';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import React, { useState, useEffect } from 'react';`,
      },

      // Multi-line with aliases
      {
        code: `import {\n  z as zod,\n  v as valibot,\n} from 'packages';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import { z as zod, v as valibot } from 'packages';`,
      },

      // Multi-line side-effect style that spans lines
      {
        code: `import\n  './styles/global.css';`,
        errors: [{ messageId: 'multiLineImport' }],
        output: `import './styles/global.css';`,
      },
    ],
  });
});
