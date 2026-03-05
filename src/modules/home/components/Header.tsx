import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "expo-router";
import {
  Linking,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import header from "#assets/images/header.jpg";
import logo from "#assets/images/logo.png";
import { Button } from "#design-system/components/Button";
import { Spacer } from "#shared/components/GenericComponents";

const LOGO_ASPECT_RATIO = 256 / 800;

export const Header = ({ containerStyle }: { containerStyle?: ViewStyle }) => {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLingui();
  const { top } = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={containerStyle}>
      <BackgroundImage source={header} />
      <BlackOverlay />
      <Spacer height={top + theme.spacing.m} />
      <Logo source={logo} screenWidth={width} />
      <ButtonContainer>
        <Button
          onPress={() =>
            void Linking.openURL("http://www.penofchaos.com/warham/donjon.htm")
          }
          label={t`Site Officiel`}
        />
        <Button onPress={() => router.push("/setup")} label={t`Réglages`} />
      </ButtonContainer>
    </View>
  );
};

const BackgroundImage = styled.ImageBackground({
  ...StyleSheet.absoluteFill,
});

const ButtonContainer = styled.View(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  padding: theme.spacing.xl,
  gap: theme.spacing.xxl,
}));

const Logo = styled.Image<{ screenWidth: number }>(({ screenWidth }) => ({
  width: screenWidth,
  height: screenWidth * LOGO_ASPECT_RATIO,
  resizeMode: "contain",
}));

const BlackOverlay = styled.View({
  ...StyleSheet.absoluteFill,
  backgroundColor: "rgba(0,0,0,0.5)",
});
