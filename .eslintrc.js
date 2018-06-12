module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
      "ecmaVersion": 8
    },
    "globals": {
      "test": true,
      "expect": true,
      "describe": true,
      "beforeAll": true
    },
    "rules": {
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
