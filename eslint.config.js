// @ts-check

const bam = require("@bam.tech/eslint-plugin");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

// Get the jest plugin from the test configs
const testConfigWithPlugin = bam.configs.tests.find((config) => config.plugins);

module.exports = [
  {
    ignores: ["expo-env.d.ts", ".expo/**", ".yarn/**"],
  },

  // Base config for all files
  // see source: https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/lib/configs/recommended.js
  ...bam.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side-effect imports
            ["^\\u0000"],
            // Node/npm packages
            ["^@?\\w"],
            // Path aliases (#app, #modules, #shared, #design-system, #testing)
            ["^#"],
            // Relative imports
            ["^\\."],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Allow require() in config files
  {
    files: ["*.config.js", "*.config.ts", "plugins/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Test files configuration
  ...bam.configs.tests,
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "__mocks__/**", "**/jest-*"],
    plugins: testConfigWithPlugin.plugins,
    rules: {
      "jest/no-restricted-matchers": [
        "error",
        {
          toMatchSnapshot:
            "Use toMatchComponentSnapshot for components and toMatchInlineSnapshot otherwise",
        },
      ],
    },
  },
];
