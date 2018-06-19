module.exports = {
    "plugins": [
      "css-modules",
      "react"
    ],
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:css-modules/recommended",
      "plugin:react/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": 8,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "globals": {
      "test": true,
      "expect": true,
      "describe": true,
      "beforeAll": true,
      "HTMLElement": true,
      "io": true,
      "window": true,
      "document": true
    },
    "rules": {
        "react/prop-types": 0,
        "no-empty": 0,
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "prefer-const": 1,
        "no-console": 0
    }
};
