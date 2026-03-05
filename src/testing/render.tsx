import { ThemeProvider } from "@emotion/react";
import type { RenderOptions } from "@testing-library/react-native";
import { render } from "@testing-library/react-native";
import type React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { theme } from "#design-system/theme/theme";
import { PlayerProvider } from "#modules/player/context/Player.context";
import { I18nProvider } from "#shared/i18n/I18n.provider";

// Using iPhone 13 metrics for tests
const safeAreaInitialMetrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

export const renderWithProviders = (
  component: React.ReactElement,
  options?: RenderOptions,
) =>
  render(component, {
    wrapper: ({ children }) => (
      <I18nProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider initialMetrics={safeAreaInitialMetrics}>
            <PlayerProvider>{children}</PlayerProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </I18nProvider>
    ),
    ...options,
  });
