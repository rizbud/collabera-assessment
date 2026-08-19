import { useTranslation } from "react-i18next";

import type { Language } from "../locales";

export const useI18n = () => {
  const { t, i18n: i18nInstance } = useTranslation();

  const changeLanguage = (lang: Language) => {
    i18nInstance.changeLanguage(lang);
  };

  const getCurrentLanguage = (): Language => {
    return i18nInstance.language as Language;
  };

  return {
    t,
    changeLanguage,
    currentLanguage: getCurrentLanguage(),
  };
};
