module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:react/recommended", "airbnb", "airbnb-typescript", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: ["**/*.stories.tsx"]
    }]
  }
};