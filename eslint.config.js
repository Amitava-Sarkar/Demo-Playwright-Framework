import js from '@eslint/js';
import globals from 'globals';
import playwright from 'eslint-plugin-playwright';

export default [
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'src/auth/**',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['src/tests/**/*.spec.js', 'src/tests/**/*.setup.js'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      // Assertions often live in page objects / helpers, not in the spec itself
      'playwright/expect-expect': 'off',
    },
  },
];
