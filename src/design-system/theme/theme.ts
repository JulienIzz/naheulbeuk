export const theme = {
  colors: {
    primary: "#FFF",
    secondary: "#000",
    active: "#0000001a",
    disabled: "#CCC",
    white: "#FFF",
    gray: "#cfcfcf",
    black: "#000",
    transparent: "transparent",
    wood: "#261E1A",
  },
  border: {
    separator: "#EEE",
  },
  spacing: {
    xs: 2,
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
    xxl: 24,
    xxxl: 32,
  } as const,
  fontSizes: {
    s: 14,
    m: 18,
    l: 24,
    xl: 32,
  } as const,
  icons: {
    s: 16,
    m: 32,
    l: 48,
    xl: 64,
  } as const,
  fonts: {
    regular: "Alegreya_400Regular",
    medium: "Alegreya_500Medium",
    semiBold: "Alegreya_600SemiBold",
    bold: "Alegreya_700Bold",
  } as const,
  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    xxl: 32,
    round: 9999,
  } as const,
};

export type AppTheme = typeof theme;
