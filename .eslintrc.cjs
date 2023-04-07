module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx', '**/*.js'],
      plugins: [
        '@typescript-eslint',
        'promise',
        'import',
        'tailwindcss',
        'unused-imports',
        'prettier',
        // 'simple-import-sort',
      ],
      extends: [
        'standard-with-typescript',
        'plugin:tailwindcss/recommended',
        'plugin:prettier/recommended',],
      parserOptions: {
        project: ['./tsconfig.json', './cypress/tsconfig.json']
      },
      rules: {
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/no-var-requires": "warn",
        "@typescript-eslint/method-signature-style": "off",
        "@typescript-eslint/strict-boolean-expressions": "warn"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
  }
}
