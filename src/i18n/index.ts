/* eslint-disable import/no-named-as-default-member -- calls on the default i18next instance */
import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { isLanguage, resources, type Language } from "./locales";

export * from "./hooks";
export * from "./locales";

// Device language when it is one we ship, English otherwise
export const deviceLanguage = (): Language => {
  const code = getLocales()[0]?.languageCode;
  return isLanguage(code) ? code : "en";
};

// Intl locale for dates: keeps the Malaysian region for both languages
export const dateLocale = (language?: Language): string =>
  `${language ?? i18n.language}-MY`;

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
