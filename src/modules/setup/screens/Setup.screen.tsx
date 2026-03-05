import styled from "@emotion/native";
import { useLingui } from "@lingui/react/macro";

import { Button } from "#design-system/components/Button";
import { BaseScreen } from "#shared/components/BaseScreen";

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

  return (
    <Container>
      <ContentContainer>
        <Button onPress={() => {}} label={t`Crédits`} />
        <Button onPress={() => {}} label={t`Confidentialité`} />
      </ContentContainer>
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
