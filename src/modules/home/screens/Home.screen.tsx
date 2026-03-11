import styled from "@emotion/native";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "expo-router";

import season1 from "#assets/images/s1.jpg";
import season2 from "#assets/images/s2.jpg";
import season3 from "#assets/images/s3.jpg";
import { Button } from "#design-system/components/Button";
import { ImageButton } from "#design-system/components/ImageButton";
import { PaperBackground } from "#design-system/components/TexturedComponents";
import { Header } from "#modules/home/components/Header";
import { FlexView, Row } from "#shared/components/GenericComponents";

const HOME_WALLET_RADIUS = 24;

export const HomeScreen = () => {
  const router = useRouter();
  const { t } = useLingui();

  return (
    <ScreenContainer>
      <Header
        containerStyle={{
          marginBottom: -HOME_WALLET_RADIUS,
          paddingBottom: HOME_WALLET_RADIUS,
        }}
      />

      <Container>
        <PaperBackground />
        <StyledScrollView>
          <ContentContainer>
            <ImageButton
              onPress={() => router.push(`/tracks/season/1`)}
              imageSource={season1}
              label={t`Saison 1`}
            />
            <ImageButton
              onPress={() => router.push(`/tracks/season/2`)}
              imageSource={season2}
              label={t`Saison 2`}
            />
            <ImageButton
              onPress={() => router.push(`/tracks/season/3`)}
              imageSource={season3}
              label={t`Saison 3`}
            />
            <ButtonRow>
              <FlexView>
                <Button
                  onPress={() => router.push("/tracks/bonus")}
                  label={t`Bonus`}
                />
              </FlexView>
              <FlexView>
                <Button
                  onPress={() => router.push("/tracks/songs")}
                  label={t`Chansons`}
                />
              </FlexView>
            </ButtonRow>
            <Button
              onPress={() => router.push("/soundboard")}
              label={t`Soundboard`}
            />
          </ContentContainer>
        </StyledScrollView>
      </Container>
    </ScreenContainer>
  );
};

const ScreenContainer = styled.View({
  flex: 1,
});

const Container = styled.View({
  flex: 1,
  overflow: "hidden",
  borderTopLeftRadius: HOME_WALLET_RADIUS,
  borderTopRightRadius: HOME_WALLET_RADIUS,
});

const StyledScrollView = styled.ScrollView({
  flex: 1,
});

const ContentContainer = styled.View(({ theme }) => ({
  gap: theme.spacing.l,
  padding: HOME_WALLET_RADIUS,
  paddingBottom: theme.spacing.xxxl,
}));

const ButtonRow = styled(Row)(({ theme }) => ({
  gap: theme.spacing.l,
}));
