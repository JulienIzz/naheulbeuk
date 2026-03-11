import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLingui } from "@lingui/react/macro";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ActivityIndicator } from "react-native";

import { Button } from "#design-system/components/Button";
import { Typography } from "#design-system/typography/Typography";

type Props = {
  children: ReactNode;
  loadingFallback?: ReactNode;
  FallbackComponent?: (_props: FallbackProps) => ReactNode;
};

export const QueryErrorBoundary = ({
  children,
  loadingFallback = <DefaultLoadingFallback />,
  FallbackComponent = DefaultErrorFallback,
}: Props) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
        <Suspense fallback={loadingFallback}>{children}</Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

const DefaultErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const theme = useTheme();
  const { t } = useLingui();

  return (
    <Container>
      <ContentContainer>
        <MaterialIcons
          name="error-outline"
          size={theme.icons.l}
          color={theme.colors.wood}
        />
        <Typography
          variant="H2"
          text={t`Une erreur est survenue`}
          color={theme.colors.wood}
          center
        />
        <Typography
          variant="P2"
          text={t`Vérifiez votre connexion et réessayez`}
          color={theme.colors.wood}
          center
        />
      </ContentContainer>
      <Button label={t`Réessayer`} onPress={resetErrorBoundary} />
    </Container>
  );
};

const DefaultLoadingFallback = () => (
  <Container>
    <ActivityIndicator />
  </Container>
);

const Container = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xxxl,
  padding: theme.spacing.xxxl,
}));

const ContentContainer = styled.View(({ theme }) => ({
  alignItems: "center",
  gap: theme.spacing.l,
}));
