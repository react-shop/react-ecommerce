const tsconfig = require(`./tsconfig`);

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: `readonly`,
    SharedArrayBuffer: `readonly`,
  },
  extends: [
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:prettier/recommended`,
    `next`,
  ],
  rules: {
    'no-shadow': `off`,
    camelcase: `off`,
    'no-mixed-operators': `error`,
    'no-unneeded-ternary': `error`,
    'no-nested-ternary': `error`,
    'no-use-before-define': [`off`],
    '@typescript-eslint/explicit-function-return-type': `off`,
    '@typescript-eslint/explicit-module-boundary-types': `off`,
    '@typescript-eslint/no-use-before-define': [`warn`],
    '@typescript-eslint/no-explicit-any': `error`,
    '@typescript-eslint/no-var-requires': `off`,
    '@typescript-eslint/no-unused-vars': `error`,
    '@typescript-eslint/no-shadow': [`error`],
    '@typescript-eslint/quotes': [
      2,
      `backtick`,
      {
        avoidEscape: true,
      },
    ],
    'react/jsx-no-bind': `error`,
    'react/prop-types': `off`,
    'react/display-name': `off`,
    'react/jsx-filename-extension': `off`,
    'react/jsx-props-no-spreading': `off`,
    'react/no-unused-prop-types': `off`,
    'react/react-in-jsx-scope': `off`,
    'react/require-default-props': `off`,
    'import/prefer-default-export': `off`,
    'import/extensions': [
      `error`,
      `ignorePackages`,
      {
        ts: `never`,
        tsx: `never`,
        js: `never`,
        jsx: `never`,
      },
    ],
    'import/order': [
      `error`,
      {
        groups: [[`builtin`, `external`], `internal`, [`sibling`, `index`]],
        pathGroups: [
          {
            pattern: `react`,
            group: `external`,
            position: `before`,
          },
          {
            pattern: `@react-shop/**`,
            group: `external`,
            position: `after`,
          },
          ...Object.keys(tsconfig.compilerOptions.paths).map(key => ({
            pattern: `${key}*`,
            group: `internal`,
            position: `after`,
          })),
        ],
        pathGroupsExcludedImportTypes: [],
        'newlines-between': `always`,
        alphabetize: {
          order: `asc`,
          caseInsensitive: true,
        },
      },
    ],
  },
  ignorePatterns: [`next.config.js`],
  settings: {
    'import/resolver': {
      typescript: {
        project: `.`,
      },
    },
    'import/core-modules': [`styled-components`],
    react: {
      version: `detect`,
    },
  },
};
