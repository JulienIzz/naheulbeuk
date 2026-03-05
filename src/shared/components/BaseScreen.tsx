import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "expo-router";
import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconButton } from "#design-system/components/IconButton";
import { PaperBackground } from "#design-system/components/TexturedComponents";
import { Typography } from "#design-system/typography/Typography";
import { FlexView } from "#shared/components/GenericComponents";
import { QueryErrorBoundary } from "#shared/components/QueryErrorBoundary";

export const BaseScreen = ({
  title,
  withBackButton = false,
  children,
}: {
  title?: string;
  withBackButton?: boolean;
  children: ReactNode;
}) => {
  const { top } = useSafeAreaInsets();

  return (
    <FlexView style={{ paddingTop: top }}>
      <PaperBackground />
      {title && <Title title={title} withBackButton={withBackButton} />}
      <FlexView>
        <QueryErrorBoundary>{children}</QueryErrorBoundary>
      </FlexView>
    </FlexView>
  );
};

const Title = ({
  title,
  withBackButton,
}: {
  title: string;
  withBackButton: boolean;
}) => {
  const router = useRouter();
  const { t } = useLingui();
  const theme = useTheme();

  return (
    <Container>
      {withBackButton && (
        <IconButton
          onPress={() => router.back()}
          icon={<MaterialIcons name="arrow-back" size={24} />}
          accessibilityLabel={t`Retour`}
        />
      )}
      <Typography
        color={theme.colors.secondary}
        variant="H1"
        text={title}
        center
      />
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing.xl,
  gap: theme.spacing.l,
}));
