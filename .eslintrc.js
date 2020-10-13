module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'error',
    'class-methods-use-this': 0,
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'import/no-unresolved': 0,
    'global-require': 0,
    'no-underscore-dangle': 0,
  },
};
