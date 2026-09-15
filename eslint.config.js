const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-unused-vars': 'error'
    }
  }
];
