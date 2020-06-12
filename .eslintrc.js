module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  env: {
    "browser": true,
    "es6": true,
    "jest": true,
    "jquery": true,
    "node": true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  rules: {
    "no-debugger": 0,
    "no-alert": 0,
    'no-console': 0,
    "no-multi-spaces": [1, {
      "exceptions": {
        "VariableDeclaration": true
      }
    }],
  }
};
