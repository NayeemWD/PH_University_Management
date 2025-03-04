import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,

    {
        ignores: ['node_modules', 'dist'],
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            // 'no-unused-vars': 'error',
            'no-unused-vars': 'off', // ❌ Disable built-in ESLint rule
            '@typescript-eslint/no-unused-vars': 'error', // ✅ Use TypeScript's version
            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            'prettier/prettier': 'error',
        },
    },

    eslintConfigPrettier, // Ensures ESLint doesn't conflict with Prettier formatting
]
