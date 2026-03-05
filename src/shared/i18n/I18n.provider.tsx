import { i18n } from "@lingui/core";
import { I18nProvider as LinguiI18nProvider } from "@lingui/react";
import { getLocales } from "expo-localization";
import type { ReactNode } from "react";

import enMessages from "#shared/i18n/locales/en/messages";
import frMessages from "#shared/i18n/locales/fr/messages";

export const fallbackLanguageTag = "fr";
const AVAILABLE_LANGUAGES = ["fr", "en"];
const bestAvailableLanguageConfig = getLocales().find(
  (locale) =>
    locale.languageCode && AVAILABLE_LANGUAGES.includes(locale.languageCode),
);
const bestAvailableLanguageTag = bestAvailableLanguageConfig
  ? bestAvailableLanguageConfig.languageCode
  : fallbackLanguageTag;

i18n.load({ fr: frMessages.messages, en: enMessages.messages });
i18n.activate(bestAvailableLanguageTag || fallbackLanguageTag);

type I18nProviderProps = {
  children: ReactNode;
};

export const I18nProvider = ({ children }: I18nProviderProps) => {
  return <LinguiI18nProvider i18n={i18n}>{children}</LinguiI18nProvider>;
};
