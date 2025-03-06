import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

//

// /** @type {import('eslint').Linter.Config} */
// export default {
//     files: ['**/*.{js,mjs,cjs,ts}'],
//     languageOptions: {
//         globals: globals.node,
//     },
//     extends: [
//         'eslint:recommended',
//         ...tseslint.configs.recommended,
//         'plugin:prettier/recommended', // Fix for eslint-config-prettier
//     ],
//     ignores: ['node_modules', 'dist'],
//     plugins: {
//         prettier: eslintPluginPrettier,
//     },

//

/** @type {import('eslint').Linter.Config[]} */
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
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'no-unused-expressions': 'error',
            'prefer-const': 'error',
            'no-console': 'warn',
            'no-undef': 'error',
            'prettier/prettier': 'error', // Ensure Prettier formatting is enforced
        },
    },

    {
        extends: ['plugin:prettier/recommended'],
    },
    // eslintConfigPrettier, // Ensures ESLint doesn't conflict with Prettier
];
