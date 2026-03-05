import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import type { ReactNode } from "react";
import type { PressableProps } from "react-native";

import { WoodenPressable } from "#design-system/components/TexturedComponents";
import type { AppTheme } from "#design-system/theme/theme";
import { Typography } from "#design-system/typography/Typography";

type Variant = "primary" | "secondary";

type Props = {
  label: string;
  variant?: Variant;
  onPress: () => void;
  left?: ReactNode;
  right?: ReactNode;
  disabled?: boolean;
} & Omit<PressableProps, "children">;

const textColorKeys: Record<Variant, keyof AppTheme["colors"]> = {
  primary: "primary",
  secondary: "secondary",
};

export const Button = ({
  label,
  variant = "primary",
  left,
  right,
  disabled = false,
  ...props
}: Props) => {
  const theme = useTheme();

  const textColor = disabled
    ? theme.colors.disabled
    : theme.colors[textColorKeys[variant]];

  return (
    <Container disabled={disabled} accessibilityRole="button" {...props}>
      {left}
      <Typography variant="P1" bold text={label} color={textColor} />
      {right}
    </Container>
  );
};

const Container = styled(WoodenPressable)<{
  disabled: boolean;
}>(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  gap: theme.spacing.m,
  borderRadius: theme.borderRadius.m,
  paddingVertical: theme.spacing.l,
  paddingHorizontal: theme.spacing.xl,
}));
