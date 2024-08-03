module.exports = {
  extends: [
    'next/core-web-vitals',
    'turbo',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:mdx/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // always at the end
  ],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          // Lib and hooks
          ['^@/lib', '^@/hooks'],
          // static data
          ['^@/data'],
          // components
          ['^@/components'],
          // Other imports
          ['^@/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          // other that didn't fit in
          ['^'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'no-console': ['error'],
    'react/jsx-no-undef': ['off', { allowGlobals: true }],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
