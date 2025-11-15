/**
 * ESLint Configuration - Enforces Architectural Rules
 * Prevents cross-feature imports and maintains layer boundaries
 */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],

  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Architectural rules: Prevent cross-feature imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/features/*/**', '@features/*/**'],
            message: '❌ Import from feature public API only: @features/[name] (not @features/[name]/ui/Component)',
          },
          {
            group: ['@/features/*/ui/*', '@/features/*/api/*', '@/features/*/model/*'],
            message: '❌ Import from feature public API (index.ts) only',
          },
          {
            group: ['@features/*/ui/*', '@features/*/api/*', '@features/*/model/*'],
            message: '❌ Import from feature public API (index.ts) only',
          },
        ],
      },
    ],
  },

  overrides: [
    // Shared layer: Cannot import from features or entities
    {
      files: ['src/shared/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@/features/**',
              '@/entities/**',
              '@/pages/**',
              '@features/**',
              '@entities/**',
              '@pages/**',
            ],
            message: '❌ Shared layer cannot import from features, entities, or pages (maintains low-level abstraction)',
          },
        ],
      },
    },

    // Entities layer: Cannot import from features
    {
      files: ['src/entities/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@/features/**',
              '@/pages/**',
              '@features/**',
              '@pages/**',
            ],
            message: '❌ Entities layer cannot import from features or pages (maintains independence)',
          },
        ],
      },
    },

    // Features: Cannot cross-import from other features
    {
      files: ['src/features/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@/features/!(index)',
              '@features/!(index)',
            ],
            message: '❌ Features cannot import from other features (prevents tight coupling)',
          },
        ],
      },
    },
  ],
}
