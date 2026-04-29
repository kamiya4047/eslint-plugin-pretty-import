import type { Identifier, ImportDeclaration } from 'estree';
import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Enforce import statements to be on a single line',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      multiLineImport: 'Import statement should be on a single line',
    },
  },

  create(context: Rule.RuleContext) {
    function buildSingleLineImport(node: ImportDeclaration & { importKind?: 'type' | 'value' }): string {
      const source = node.source.value as string;
      const hasTypeOnly = node.importKind === 'type';
      const keyword = hasTypeOnly ? 'import type' : 'import';

      if (!node.specifiers || node.specifiers.length === 0) {
        return `import '${source}';`;
      }

      const nonNamedParts: string[] = [];
      const namedParts: string[] = [];

      for (const spec of node.specifiers) {
        switch (spec.type) {
          case 'ImportDefaultSpecifier':
            nonNamedParts.push(spec.local.name);
            break;

          case 'ImportNamespaceSpecifier':
            nonNamedParts.push(`* as ${spec.local.name}`);
            break;

          case 'ImportSpecifier': {
            const imported = spec.imported as Identifier;
            const local = spec.local as { name: string };
            const isInlineType = (spec as { importKind?: 'type' }).importKind === 'type';
            const alias = local.name !== imported.name ? `${imported.name} as ${local.name}` : imported.name;
            namedParts.push(isInlineType ? `type ${alias}` : alias);
            break;
          }
        }
      }

      const parts = [...nonNamedParts];
      if (namedParts.length > 0) {
        parts.push(`{ ${namedParts.join(', ')} }`);
      }

      return `${keyword} ${parts.join(', ')} from '${source}';`;
    }

    return {
      ImportDeclaration(node) {
        const importNode = node as ImportDeclaration & { importKind?: 'type' | 'value' };

        const startLine = node.loc!.start.line;
        const endLine = node.loc!.end.line;

        // single line
        if (startLine === endLine) {
          return;
        }

        context.report({
          node,
          messageId: 'multiLineImport',
          fix(fixer) {
            return fixer.replaceText(node, buildSingleLineImport(importNode));
          },
        });
      },
    };
  },
};

export default rule;
