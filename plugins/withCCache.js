// @ts-check

const { withPodfileProperties } = require("expo/config-plugins");
const { execSync } = require("child_process");

/**
 * @type {import("expo/config-plugins").ConfigPlugin}
 */
const withCCache = (c) => {
  return withPodfileProperties(c, (config) => {
    if (!isInstalled("ccache")) {
      if (!process.env.CI) {
        console.warn(
          "ℹ️ You can install ccache `brew install ccache` to speed up your builds. More info: https://reactnative.dev/docs/build-speed#use-a-compiler-cache",
        );
      }

      return config;
    }

    config.modResults["apple.ccacheEnabled"] = "true";

    return config;
  });
};

/**
 * @param {string} command
 * @returns {boolean}
 */
const isInstalled = (command) => {
  try {
    execSync(`which ${command}`, { stdio: "ignore" });

    return true;
  } catch (_error) {
    return false;
  }
};

module.exports = withCCache;
