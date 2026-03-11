import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useLingui } from "@lingui/react/macro";

import { Typography } from "#design-system/typography/Typography";
import { BaseScreen } from "#shared/components/BaseScreen";

export const CreditsScreen = () => {
  const { t } = useLingui();

  return (
    <BaseScreen title={t`Crédits`} withBackButton>
      <CreditsScreenContent />
    </BaseScreen>
  );
};

const CreditsScreenContent = () => {
  const { t } = useLingui();
  const theme = useTheme();

  return (
    <Container>
      <Section>
        <Typography
          variant="H2"
          text={t`Propriété intellectuelle`}
          color={theme.colors.secondary}
        />
        <Typography
          variant="P1"
          text={t`Le Donjon de Naheulbeuk est une création originale de Pen of Chaos / John Lang. Tous les droits relatifs à cet univers lui appartiennent.`}
          color={theme.colors.secondary}
        />
      </Section>

      <Section>
        <Typography
          variant="H2"
          text={t`Développement`}
          color={theme.colors.secondary}
        />
        <Typography
          variant="P1"
          text="Julien IZZILLO"
          color={theme.colors.secondary}
        />
      </Section>
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flex: 1,
  padding: theme.spacing.xl,
  gap: theme.spacing.xxl,
}));

const Section = styled.View(({ theme }) => ({
  gap: theme.spacing.m,
}));
