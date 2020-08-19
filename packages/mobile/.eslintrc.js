module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions:  {
    ecmaVersion:  2018,  
    sourceType:  'module',
  },
  plugins: ['@typescript-eslint'],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
  }
};
