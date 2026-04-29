# single-line-import

Enforces import statements to be on a single line.

## Rule Details

This rule reports an error when an import declaration spans multiple lines in
the source code. It provides auto-fixing capability to collapse multi-line
imports into a single line while preserving all specifiers, aliases, and type
annotations.

## Examples

### Incorrect

```typescript
// Multi-line named import
import {
  useState,
  useEffect,
  useMemo,
} from 'react';

// Multi-line default import
import React
from 'react';

// Multi-line namespace import
import *
as fs
from 'fs';

// Multi-line type import
import type {
  User,
  Profile,
} from './types';
```

### Correct

```typescript
import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import * as fs from 'fs';
import type { User, Profile } from './types';
```

### With Aliases

```typescript
// Before (multi-line)
import {
  longFunctionName as short,
  anotherFunction as af,
} from './utils';

// After (single-line, aliases preserved)
import { longFunctionName as short, anotherFunction as af } from './utils';
```

### Mixed Specifier Types

```typescript
// Before
import
  React,
  { useState, useEffect },
from 'react';

// After
import React, { useState, useEffect } from 'react';
```

## Integration with Other Rules

This rule works alongside other pretty-import rules without conflicts:

```js
export default [
  {
    plugins: { 'pretty-import': prettyImport },
    rules: {
      'pretty-import/single-line-import': 'error',
      'pretty-import/sort-import-names': 'error',
    }
  }
];
```

## When Not to Use

- If you prefer multi-line imports for readability with many specifiers
- If your team has a different coding style for import formatting
- If you want Prettier to handle import formatting instead
