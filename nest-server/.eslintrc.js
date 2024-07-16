module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['simple-import-sort'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['./src'],
        extensions: ['.js', '.ts']
      },
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  env: {
    node: true,
    jest: true
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    'no-empty': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'error',
      { patterns: ['../*'] }
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^(?!\\.)'], ['^\\u0000', '^\\.', '^src/']]
      }
    ],
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error'
  }
};
