module.exports = {
  extends: [
    "prettier"
  ],
  env: {
    "browser": true,
    "node": true,
    "es6": true,
    "jquery": true,
    "jest": true
  },
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    }
},
  rules: {
    "no-debugger": 0,
    "no-alert": 0,
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 80,
      }
    ],
  },
  plugins: [
    "html",
    "prettier"
  ]
}
