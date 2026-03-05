import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import {
  Image,
  type ImageSourcePropType,
  type PressableProps,
} from "react-native";

import { WoodenPressable } from "#design-system/components/TexturedComponents";
import { Typography } from "#design-system/typography/Typography";
import { FlexView } from "#shared/components/GenericComponents";

type Props = {
  label: string;
  onPress: () => void;
  imageSource: ImageSourcePropType;
  disabled?: boolean;
} & Omit<PressableProps, "children">;

export const ImageButton = ({
  label,
  imageSource,
  disabled = false,
  ...props
}: Props) => {
  const theme = useTheme();

  const textColor = disabled ? theme.colors.disabled : theme.colors.primary;

  return (
    <Container disabled={disabled} accessibilityRole="button" {...props}>
      <ImageContainer>
        <Cover source={imageSource} resizeMode="cover" />
      </ImageContainer>
      <LabelContainer>
        <Typography variant="P1" bold center text={label} color={textColor} />
      </LabelContainer>
    </Container>
  );
};

const Container = styled(WoodenPressable)<{
  disabled: boolean;
}>(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing.m,
  height: 80,
  borderRadius: theme.borderRadius.m,
  paddingVertical: theme.spacing.m,
  paddingHorizontal: theme.spacing.m,
}));

const ImageContainer = styled(FlexView)(({ theme }) => ({
  overflow: "hidden",
  borderRadius: theme.borderRadius.s,
}));

const Cover = styled(Image)({
  width: "100%",
  height: "100%",
});

const LabelContainer = styled.View({
  width: 100,
  justifyContent: "center",
  alignItems: "center",
});
