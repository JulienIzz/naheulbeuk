import styled from "@emotion/native";
import { i18n } from "@lingui/core";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "expo-router";
import { Linking } from "react-native";

import { Button } from "#design-system/components/Button";
import { DebugInfos } from "#modules/setup/components/DebugInfos.component";
import { BaseScreen } from "#shared/components/BaseScreen";

const PRIVACY_BASE_URL = "http://naheulbeuk-privacy.izzillo.fr";
const privacyUrl =
  i18n.locale === "fr"
    ? `${PRIVACY_BASE_URL}/index.html`
    : `${PRIVACY_BASE_URL}/privacy-en.html`;

export const SetupScreen = () => {
  const { t } = useLingui();

  return (
    <BaseScreen title={t`Réglages`} withBackButton>
      <SetupScreenContent />
    </BaseScreen>
  );
};

const SetupScreenContent = () => {
  const { t } = useLingui();
  const router = useRouter();

  return (
    <Container>
      <ContentContainer>
        <Button onPress={() => router.push("/credits")} label={t`Crédits`} />
        <Button
          onPress={() => void Linking.openURL(privacyUrl)}
          label={t`Confidentialité`}
        />
      </ContentContainer>
      <DebugInfos />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "space-between",
  padding: theme.spacing.xl,
  gap: theme.spacing.xxl,
}));

const ContentContainer = styled.View(({ theme }) => ({
  gap: theme.spacing.l,
}));
