import "expo-dev-client";
import "@formatjs/intl-locale/polyfill";
import "@formatjs/intl-listformat/polyfill";
import "@formatjs/intl-listformat/locale-data/en";

import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { theme as appTheme } from "#design-system/theme/theme";
import { Player } from "#modules/player/components/Player.component";
import { PlayerProvider } from "#modules/player/context/Player.context";
import { usePreloadAssets } from "#shared/assets/usePreloadAssets.hook";
import { useCustomFonts } from "#shared/fonts/useCustomFonts.hook";
import { I18nProvider } from "#shared/i18n/I18n.provider";

void SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 500,
  fade: true,
});

const queryClient = new QueryClient();

export default function RootLayout() {
  const { fontsLoaded } = useCustomFonts();
  const { assetsLoaded } = usePreloadAssets();

  const appReady = fontsLoaded && assetsLoaded;

  const onLayoutRootView = useCallback(
    function hideSplashScreen() {
      if (appReady) {
        void SplashScreen.hideAsync();
      }
    },
    [appReady],
  );

  if (!appReady) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView}>
      <I18nProvider>
        <ThemeProvider theme={appTheme}>
          <QueryClientProvider client={queryClient}>
            <PlayerProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: {
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                  },
                }}
              />
              <Player />
            </PlayerProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </I18nProvider>
    </GestureHandlerRootView>
  );
}
