module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/extensions": 0,
    "no-console": 0,
    "no-underscore-dangle": 0,
    quotes: "off",
    "comma-dangle": "off",
  },
};
