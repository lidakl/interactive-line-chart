import {defineConfig} from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';

export default defineConfig([
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },

    // Imports
    {
        languageOptions: {
            parser: typescriptParser,
        },
        plugins: {
            boundaries,
            'simple-import-sort': simpleImportSort,
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            'no-restricted-imports': ['error'],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [
                            // `react` related packages come first
                            '^react',
                            '^[^@#]\\w',
                            '^@\\w',

                            // External imports
                            '^#',

                            // Local imports, `css` last
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                            '^.+\\.?(css)$',
                        ],
                    ],
                },
            ],
        },
    },

    // Code style
    {
        plugins: {
            react,
            prettier,
        },
        rules: {
            ...prettierConfig.rules,
            'prettier/prettier': 'error',
            'no-multiple-empty-lines': ['error', {max: 1}],
            'no-trailing-spaces': 'error',
            'object-shorthand': 'error',
            'no-multi-spaces': 'error',
            'react/jsx-curly-brace-presence': 'error',
            'padding-line-between-statements': [
                'error',
                {blankLine: 'always', prev: '*', next: ['return', 'block-like']},
                {blankLine: 'always', prev: ['block-like', 'break'], next: '*'},
            ],
            'no-restricted-syntax': ['error'],
        },
    },
    {
        files: ['src/**/*'],
        rules: {
            'no-console': 'error',
        },
    },
]);
