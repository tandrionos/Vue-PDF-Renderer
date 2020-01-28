module.exports = {
  root: true,
  env: {
      es6: true,
      mocha: true,
      node: true,
      browser: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      quotes: [2, 'single'],
      semi: 'error',
      'vue/script-indent': ['error', 4, { 'baseIndent': 1 }]
  },
  parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 6,
      sourceType: 'module'
  }
};
