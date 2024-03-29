module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  ignorePatterns: ['build/*'],
  rules: {
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'no-use-before-define': 'off',
    "@typescript-eslint/no-unused-vars": ["error"],
    'no-shadow': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'no-empty-function': 'off',
    "no-unused-vars": "off",
    'max-len': ["error", { "code": 120 }],
    "react/prop-types": 0,
    "import/prefer-default-export": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-non-null-assertion": 0,
    "react-hooks/exhaustive-deps": "off",
  },
};
