module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "linebreak-style": 0,
        // "func-names": ["error", "never"],
        // "max-len": ["warn", 170],
        // "no-useless-escape": ["warn"],
        // "no-continue": ["warn"],
        // "no-control-regex": ["warn"],
        // "no-unused-vars": ["warn"],
        "comma-dangle": 0,
        "no-console": 0,
      //   "no-param-reassign": [2, {
      //   "props": false
      // }],
      "prefer-destructuring": 0
  },
};
