import type { ExpoConfig } from "@expo/config-types";

const STAGE: "dev" | "production" = (() => {
  const stage = process.env.STAGE || "dev";
  if (stage !== "dev" && stage !== "production") {
    throw new Error(`Invalid STAGE env var: ${stage}`);
  }
  return stage;
})();

const appConfig_DEV = {
  bundleId: "com.naheulbeuk.app.dev",
  appName: "Naheulbeuk DEV",
  scheme: "naheulbeuk-dev",
  waitForUpdateOnSplashScreenMs: 0,
  appEnv: {
    supabaseUrl: "https://owoljaihktorzjziulzn.supabase.co",
    supabasePublishableKey: "sb_publishable_aEBCZjUTHDORzVXvWBybTw_Wz6QHHug",
    r2BaseUrl: "https://pub-b2080dc457b840d2b6ddeef1a326efb0.r2.dev",
  },
};

const appConfig_PRODUCTION: typeof appConfig_DEV = {
  bundleId: "com.naheulbeuk.app",
  appName: "Naheulbeuk",
  scheme: "naheulbeuk",
  waitForUpdateOnSplashScreenMs: 10000,
  appEnv: {
    supabaseUrl: "https://owoljaihktorzjziulzn.supabase.co",
    supabasePublishableKey: "sb_publishable_aEBCZjUTHDORzVXvWBybTw_Wz6QHHug",
    r2BaseUrl: "https://naheulbeuk.izzillo.fr",
  },
};

const appConfigs = {
  dev: appConfig_DEV,
  production: appConfig_PRODUCTION,
};

const appConfig = appConfigs[STAGE];

export type AppEnv = (typeof appConfig_DEV)["appEnv"];

const config: ExpoConfig = {
  name: appConfig.appName,
  slug: "naheulbeuk",
  scheme: appConfig.scheme,
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  jsEngine: "hermes",
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: appConfig.bundleId,
    config: {
      usesNonExemptEncryption: false,
    },
    supportsTablet: false,
    infoPlist: {
      LSApplicationQueriesSchemes: ["itms-apps"],
      CADisableMinimumFrameDurationOnPhone: true, // Allow 120fps animations
      CFBundleAllowMixedLocalizations: true,
      CFBundleDevelopmentRegion: "fr",
      CFBundleLocalizations: ["fr", "en"],
    },
    icon: {
      light: "./assets/icons/ios-light.png",
      dark: "./assets/icons/ios-dark.png",
      tinted: "./assets/icons/ios-tinted.png",
    },
  },
  android: {
    package: appConfig.bundleId,
    adaptiveIcon: {
      foregroundImage: "./assets/icons/adaptive-icon.png",
      monochromeImage: "./assets/icons/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  experiments: {
    typedRoutes: true,
  },
  extra: {
    STAGE,
    appEnv: appConfig.appEnv,
    eas: {
      projectId: "8fa8439e-1366-48a6-9c46-9a05587f9384",
    },
  },
  owner: "julienizz",
  plugins: [
    "./plugins/versioning",
    "./plugins/withCCache.js",
    ["expo-audio", { enableBackgroundPlayback: true }],
    [
      "expo-splash-screen",
      {
        image: "./assets/icons/splash-icon-dark.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          image: "./assets/icons/splash-icon-light.png",
          backgroundColor: "#000000",
        },
      },
    ],
    "expo-font",
    "expo-localization",
    [
      "expo-router",
      {
        root: "./src/app/navigation",
      },
    ],
  ],
};

export default config;
