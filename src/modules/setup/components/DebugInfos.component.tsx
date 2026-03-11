import styled from "@emotion/native";
import { useLingui } from "@lingui/react/macro";
import * as Application from "expo-application";

export const DebugInfos = () => {
  const { t } = useLingui();

  const version = Application.nativeApplicationVersion ?? "?";
  const build = Application.nativeBuildVersion;

  const versionLabel = build
    ? t`Version ${version} (${build})`
    : t`Version ${version}`;

  return <VersionText>{versionLabel}</VersionText>;
};

const VersionText = styled.Text(({ theme }) => ({
  fontSize: theme.fontSizes.s,
  fontFamily: theme.fonts.regular,
  color: theme.colors.wood,
  textAlign: "center" as const,
}));
