import {defineConfig, globalIgnores} from 'eslint/config';
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
import structure from './structure.json' with {type: 'json'};

const restrictImportPaths = []; // Example: [{name: '@mantine/core'}, {name: '@mantine/dates'}]
// const restrictImportRegex =
//     '(' + [`^#[^/]+/[^/]+/`, ...Object.keys(structure.layers).map((layer) => `../${layer}/`)].join('|') + ')';

export default defineConfig([
    globalIgnores(['dist']),
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
            'boundaries/include': ['src/**/*', 'testing/**/*'],
            'boundaries/elements': [
                {
                    type: 'root',
                    pattern: 'src/*.{ts,tsx}',
                    mode: 'file',
                },
                {
                    type: 'app',
                    pattern: `src/app/*`,
                    capture: ['slice'],
                },
                {
                    type: 'pages',
                    pattern: `src/pages/*`,
                    capture: ['slice'],
                },
                {
                    type: 'widgets',
                    pattern: `src/widgets/*`,
                    capture: ['slice'],
                },
                {
                    type: 'features',
                    pattern: `src/features/*`,
                    capture: ['slice'],
                },
                {
                    type: 'entities',
                    pattern: `src/entities/*`,
                    capture: ['slice'],
                },
                {
                    type: 'shared',
                    pattern: `src/shared/*`,
                    capture: ['slice'],
                },
                {
                    type: 'testing',
                    pattern: `testing/*`,
                    capture: ['slice'],
                },
            ],
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            ...boundaries.configs.strict.rules,
            'no-duplicate-imports': 'error',
            'boundaries/no-ignored': 'off',
            'boundaries/external': [
                'error',
                {
                    default: 'allow',
                },
            ],
            // TODO Remove?
            // 'boundaries/element-types': [
            //     'error',
            //     {
            //         message: '#${file.type} is not allowed to import #${dependency.type} ',
            //         default: 'disallow',
            //         rules: [
            //             {
            //                 from: ['root'],
            //                 allow: ['root', 'app', 'pages', 'widgets', 'features', 'entities', 'shared', 'testing'],
            //             },
            //             {
            //                 from: ['app'],
            //                 allow: ['app', 'pages', 'widgets', 'features', 'entities', 'shared', 'testing'],
            //             },
            //             {
            //                 from: ['pages'],
            //                 allow: ['widgets', 'features', 'entities', 'shared', 'testing'],
            //             },
            //             {
            //                 from: ['widgets'],
            //                 allow: ['features', 'entities', 'shared', 'testing'],
            //             },
            //             {
            //                 from: ['features'],
            //                 allow: ['entities', 'shared', 'testing'],
            //             },
            //             {
            //                 from: ['entities'],
            //                 allow: ['shared', 'testing'],
            //             },
            //             {
            //                 from: ['shared'],
            //                 allow: ['shared', 'testing'],
            //             },
            //             {
            //                 from: ['testing'],
            //                 allow: ['app', 'shared', 'testing'],
            //             },
            //         ],
            //     },
            // ],
            'no-restricted-imports': [
                'error',
                {
                    paths: restrictImportPaths,
                    // patterns: [{regex: restrictImportRegex}],
                },
            ],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        [
                            // `react` related packages come first.
                            '^react',
                            '^[^@#]\\w',
                            '^@\\w',

                            // External imports.
                            '^#',

                            // Local imports, `css` last.
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
            'no-restricted-syntax': [
                'error',
                {
                    message: 'Use getRouteLink instead.',
                    selector: 'CallExpression[callee.name="generatePath"]',
                },
            ],
        },
    },
    {
        files: ['src/**/*'],
        rules: {
            'no-console': 'error',
        },
    },
    {
        files: ['src/shared/context/**/*', 'testing/**/*'],
        rules: {
            'react-refresh/only-export-components': 'off',
        },
    },
]);
