module.exports = {
  extends: [
    "prettier"
  ],
  env: {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
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
