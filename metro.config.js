const { getDefaultConfig } = require("expo/metro-config");
const { FileStore } = require("metro-cache");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.cacheStores = [
  new FileStore({ root: path.resolve(__dirname, ".cache/metro") }),
];

/*
 * Ensure test files are not included in the bundle
 * This unlocks colocating tests with the code in the expo-router directory (`src/app/navigation`)
 */
config.resolver.blockList = [/.*\.test\.(js|jsx|ts|tsx)$/];

module.exports = config;
