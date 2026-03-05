import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { useLingui } from "@lingui/react/macro";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Pressable } from "react-native";
import { ActivityIndicator } from "react-native";

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
  <ErrorBoundary FallbackComponent={FallbackComponent}>
    <Suspense fallback={loadingFallback}>{children}</Suspense>
  </ErrorBoundary>
);

const DefaultErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const theme = useTheme();
  const { t } = useLingui();

  return (
    <Container>
      <Typography variant="P1" text={t`Une erreur est survenue`} />
      <Pressable onPress={resetErrorBoundary}>
        <Typography
          variant="P1"
          text={t`Réessayer`}
          bold
          color={theme.colors.secondary}
        />
      </Pressable>
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
  gap: theme.spacing.xl,
}));
