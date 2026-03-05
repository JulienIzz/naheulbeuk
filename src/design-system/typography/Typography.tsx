import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import type { TextProps } from "react-native";

import type { AppTheme } from "#design-system/theme/theme";

type TextVariant = "H1" | "H2" | "P1" | "P2";

const variantToFontSize: Record<TextVariant, keyof AppTheme["fontSizes"]> = {
  H1: "xl",
  H2: "l",
  P1: "m",
  P2: "s",
};

const variantToFont: Record<TextVariant, keyof AppTheme["fonts"] | undefined> =
  {
    H1: "bold",
    H2: "semiBold",
    P1: "medium",
    P2: undefined,
  };

type Props = {
  variant: TextVariant;
  text: string;
  color?: string;
  bold?: boolean;
  center?: boolean;
} & TextProps;

export const Typography = ({ variant, text, color, bold, ...props }: Props) => {
  const theme = useTheme();

  const fontSize = theme.fontSizes[variantToFontSize[variant]];
  const defaultFont = variantToFont[variant];
  const resolvedFont = bold ? "semiBold" : defaultFont;
  const fontFamily = resolvedFont
    ? theme.fonts[resolvedFont]
    : theme.fonts.regular;
  const textColor = color ?? theme.colors.primary;

  return (
    <StyledText
      fontSize={fontSize}
      fontFamily={fontFamily}
      color={textColor}
      center={props.center}
      {...props}
    >
      {text}
    </StyledText>
  );
};

const StyledText = styled.Text<{
  fontSize: number;
  fontFamily: string;
  color: string;
  center?: boolean;
}>(({ fontSize, fontFamily, color, center }) => ({
  fontSize,
  fontFamily,
  color,
  textAlign: center ? "center" : undefined,
}));
